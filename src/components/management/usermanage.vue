<template>
  <div class="layout">
    <Layout>
      <Header id="head">
        <top-page></top-page>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" id="side">
          <left-nav></left-nav>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>管理信息</BreadcrumbItem>
            <BreadcrumbItem>用户管理</BreadcrumbItem>
            <BreadcrumbItem>用户列表</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Button type="primary" icon="md-add" id="but" @click="gotoadd">添加</Button>
            <Table border :columns="columns12" :data="listUser">
              <template slot-scope="{ row , index}" slot="id">
                <strong>{{ index+1 }}</strong>
              </template>
              <template slot-scope="{ row }" slot="account">
                <strong>{{ row.account }}</strong>
              </template>
              <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
              </template>
              <template slot-scope="{ row }" slot="status">
                <strong>{{ row.status ?'锁定':'不锁定'}}</strong>
              </template>
              <template slot-scope="{ row }" slot="createDate">
                <strong>{{ row.createDate }}</strong>
              </template>
              <template slot-scope="{ row }" slot="models">
                <strong v-for="(t,index) in row.models" :key="index">{{t.modelName}}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <i-button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="changetest(index)"
                >修改</i-button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
              </template>
            </Table>
            <template>
              <Page :total="100" @on-change="pIndexChange" id="page" />
            </template>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import topPage from "../top";
import leftNav from "../leftnav";
import Axios from "axios";
export default {
  data() {
    return {
      listUser: [],
      columns12: [
        {
          title: "序号",
          slot: "id"
        },
        {
          title: "用户账号",
          key: "account"
        },
        {
          title: "用户姓名",
          key: "name"
        },
        {
          title: "锁定状态",
          slot: "status"
        },
        {
          title: "添加日期",
          key: "createDate"
        },
        {
          title: "用户权限列表",
          slot: "models"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      i: ""
    };
  },
  components: { topPage, leftNav },
  mounted() {
    Axios.get("/api//main/system/user/show?page=" + this.i).then(resp => {
      this.listUser = resp.data.list;
    });
  },
  methods: {
    changetest(index) {
      this.$Modal.confirm({
        title: "更改用户信息",
        content: `<form id="f">用户账号：<input type="text" value="${this.listUser[index].account}" name="account" id="in1"><br>用户姓名：<input type="text" value="${this.listUser[index].name}" name="name" id="in2"><br>用户密码：<input type="text" value="${this.listUser[index].passWord}" name="passWord" id="in3"><br>添加日期：<input type="text" value="${this.listUser[index].createDate}" readonly name="createDate" id="in4"><br><input type="radio" value="1" name="status"/>是&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    value="0" name="status"
                  />否<br><input type="checkbox" value=3 name="modelcodes"/>管理员&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="checkbox" value=1 name="modelcodes"/>采购&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="checkbox" value=2 name="modelcodes"/>销售&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="checkbox" value=5 name="modelcodes"/>仓管&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="checkbox" value=4 name="modelcodes"/>财务</form>`,
        onCancel: () => {
          this.$Message.info("点击了取消");
        },
        onOk: () => {
            Axios.post('/api//main/system/user/update',$("#f").serialize()).then(resp => {
                console.log(resp);
            })
        }
      });
    },
    remove(index) {
      Axios.post(
        "/api/main/system/user/delete?account=" + this.listUser[index].account
      ).then(resp => {
        this.listUser.splice(index, 1);
      });
    },
    gotoadd() {
      this.$router.push("/adduser");
    },
    pIndexChange(i) {
      this.i = i;
      Axios.get("/api//main/system/user/show?page=" + this.i).then(resp => {
        this.listUser = resp.data.list;
      });
    }
  }
};
</script>
<style>
.layout {
  border: 1px solid #d7dde4;
  height: 1035px;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
#but {
  margin-bottom: 20px;
}
#page {
  margin-top: 50px;
  float: right;
}
</style>