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
            <BreadcrumbItem>仓库管理</BreadcrumbItem>
            <BreadcrumbItem>库存盘点</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Table border :columns="columns12" :data="listClassify">
              <template slot-scope="{ row , index}" slot="id">
                <strong>{{ index+1 }}</strong>
              </template>
              <template slot="changeNum">
                <Input placeholder="Enter something..." style="width:150px" v-model="changeNum" />
              </template>
              <template slot="type">
                <Select v-model="model1" style="width:100px;">
                <Option
                  v-for="item in typeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
                </Select>
              </template>
              <template slot="description">
                <Input placeholder="Enter something..." style="width:150px" v-model="description" />
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small" @click="checkstock(index)">盘点</Button>
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
import Qs from "qs";
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
          title: "数量",
          key: "num"
        },
        {
          title: "变化数量",
          slot: "changeNum"
        },
        {
          title: "变化类型",
          slot: "type"
        },
        {
          title: "变化原因",
          slot: "description"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      typeList: [
        {
          label: "损耗",
          value: "损耗"
        },
        {
          label: "盘余",
          value: "盘余"
        },
      ],
      i: "",
      changeNum: "",
      description:'',
      model1:''
    };
  },
  components: { topPage, leftNav },
  mounted() {
    Axios.get("/api/main/stock/query?page=" + this.i).then(resp => {
      this.listClassify = resp.data.list;
      console.log(resp.data.list);
    });
  },
  methods: {
    pIndexChange(i) {
      this.i = i;
      Axios.get("/api/main/stock/query?page=" + this.i).then(resp => {
        this.listClassify = resp.data.list;
      });
    },
    checkstock(index) {
        Axios.get("/api/main/stock/checkstock?" + Qs.stringify({productCode:this.listClassify[index].productCode,originNum:this.listClassify[index].num,num:this.changeNum,type:this.model1,description:this.description})).then(resp => {
            console.log(resp);
        })
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