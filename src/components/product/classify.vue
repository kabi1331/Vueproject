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
            <BreadcrumbItem>产品管理</BreadcrumbItem>
            <BreadcrumbItem>产品列表</BreadcrumbItem>
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
          title: "产品编号",
          key: "productCode"
        },
        {
          title: "产品名称",
          key: "name"
        },
        {
          title: "数量单位",
          key: "unitName"
        },
        {
          title: "添加日期",
          key: "createDate"
        },
        {
          title: "销售价",
          key: "price"
        },
        {
          title: "产品描述",
          key: "remark"
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
    Axios.get("/api/main/sell/product/show?page=" + this.i).then(resp => {
      this.listClassify = resp.data.list;
    });
  },
  methods: {
    changetest(index,row) {
      this.$Modal.confirm({
        title: "更改产品信息",
        content: `<form id="f">产品编号：<input type="text" value="${row.productCode}" name="productCode"><br>产品名称：<input type="text" value="${row.name}" name="name"><br>数量单位：<input type="text" value="${row.unitName}" name="unitName"><br>分类编号：<input type="text" value="${row.categoryId}" name="categoryId"><br>添加日期：<input type="text" value="${row.createDate}" readonly name="createDate"><br>销售价：<input type="text" value="${row.price}" name="price"><br>描述：<input type="text" value="${row.remark}" name="remark">`,
        onCancel: () => {
          this.$Message.info("点击了取消");
        },
        onOk: () => {
            Axios.post('/api/main/sell/product/update',$("#f").serialize()).then(resp =>{
              console.log(resp);
              
            })
        }
      });
    },
    remove(index) {
      Axios.post(
        "/api/main/system/user/delete?account=" + this.listClassify[index].account
      ).then(resp => {
        this.listClassify.splice(index, 1);
      });
    },
    gotoadd() {
      this.$router.push("/addclassify");
    },
    pIndexChange(i) {
      this.i = i;
      Axios.get("/api/main/sell/product/show?page=" + this.i).then(resp => {
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