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
            <BreadcrumbItem>库存查询</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            产品编号:
            <Input placeholder="Enter something..." style="width:150px" v-model="productCode" />产品名称:
            <Input placeholder="Enter something..." style="width:150px" v-model="name" />库存数量最小值:
            <Input placeholder="Enter something..." style="width:150px" v-model="min" />库存数量最大值:
            <Input placeholder="Enter something..." style="width:150px" v-model="max" />
            <Button type="success" @click="find">查询</Button>
            <Table border :columns="columns12" :data="listClassify">
              <template slot-scope="{ row , index}" slot="id">
                <strong>{{ index+1 }}</strong>
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
        }
      ],
      i: "",
      productCode: "",
      name: "",
      max: "",
      min: ""
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
    find() {
      Axios.get(
        "/api/main/stock/query?" +
          Qs.stringify({
            productCode: this.productCode,
            name: this.name,
            min: this.min,
            max: this.max
          })
      ).then(resp => {
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