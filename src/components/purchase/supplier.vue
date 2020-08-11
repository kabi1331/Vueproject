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
            <BreadcrumbItem>供应商管理</BreadcrumbItem>
            <BreadcrumbItem>供应商列表</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Button type="primary" icon="md-add" id="but" @click="gotoadd">添加</Button>
            <Table border :columns="columns12" :data="listClassify">
              <template slot-scope="{ row , index}" slot="id">
                <strong>{{ index+1 }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <i-button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="changetest(index,row)"
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
      listClassify: [],
      columns12: [
        {
          title: "序号",
          slot: "id"
        },
        {
          title: "供应商编号",
          key: "venderCode"
        },
        {
          title: "供应商名称",
          key: "name"
        },
        {
          title: "联系人",
          key: "contactor"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "邮政编码",
          key: "postCode"
        },
        {
          title: "电话",
          key: "tel"
        },
        {
          title: "传真",
          key: "fax"
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
    Axios.get("/api/main/purchase/vender/show?page=" + this.i).then(resp => {
      this.listClassify = resp.data.list;
      console.log(resp.data);
    });
  },
  methods: {
    changetest(index, row) {
      this.$Modal.confirm({
        title: "更改供应商信息",
        content: `<form id="f">供应商编号：<input type="text" value="${row.venderCode}" name="venderCode"><br>
        供应商名称：<input type="text" value="${row.name}" name="name"><br>
        供应商密码：<input type="text" value="${row.passWord}" name="passWord"><br>
        联系人：<input type="text" value="${row.contactor}" name="contactor"><br>
        注册日期：<input type="text" value="${row.createDate}" readonly name="createDate"><br>
        电话：<input type="text" value="${row.tel}" name="tel"><br>
        地址：<input type="text" value="${row.address}" name="address"><br>`,
        onCancel: () => {
          this.$Message.info("点击了取消");
        },
        onOk: () => {
          Axios.post(
            "/api/main/purchase/vender/update",
            $("#f").serialize()
          ).then(resp => {console.log(resp);
          }
              
          );
        }
      });
    },
    remove(index) {
      Axios.post(
        "/api/main/purchase/vender/delete?venderCode=" +
          this.listClassify[index].venderCode
      ).then(resp => {
        this.listClassify.splice(index, 1);
      });
    },
    gotoadd() {
      this.$router.push("/addsupplier");
    },
    pIndexChange(i) {
      this.i = i;
      Axios.get("/api/main/purchase/vender/show?page=" + this.i).then(resp => {
        this.listClassify = resp.data.list;
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