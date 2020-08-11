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
            <BreadcrumbItem>月度报表</BreadcrumbItem>
            <BreadcrumbItem>月度入库报表</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Row>
              日期范围
              <DatePicker type="month" placeholder="Select month" style="width: 200px" @on-change="h"></DatePicker>
              <Button type="success" @click="find">查询</Button>
            </Row>
            <Table border :columns="columns1" :data="list" style="margin-top:20px">
            </Table>
            <Table border :columns="columns12" :data="listClassify" style="margin-top:20px">
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
          title: "采购单编号",
          key: "poId"
        },
        {
          title: "产品名称",
          key: "name"
        },
        {
          title: "入库时间",
          key: "stockTime"
        },
        {
          title: "供应商名称",
          key: "productCode"
        },
        {
          title: "采购产品总价",
          key: "productTotal"
        },
        {
          title: "库存数量",
          key: "stockNum"
        },
      ],
      columns1:[
        {
          title: "入库单据数",
          key: "total"
        },
        {
          title: "产品总数量",
          key: "totalNum"
        },
        {
          title: "产品总金额",
          key: "productTotal"
        },
      ],
      list:[{
        total:'',
        totalNum:'',
        productTotal:''
      }],
      i: "",
      datav: ""
    };
  },
  components: { topPage, leftNav },
  methods: {
    h(month) {
      this.datav = month;
    },
    find() {
      Axios.get(
        "/api/main/report/instock/main?" +
          Qs.stringify({
            page: this.i,
            time: this.datav,
          })
      ).then(resp => {
        console.log(resp);
        this.listClassify = resp.data.details.list;
        this.list[0].total = resp.data.total
        this.list[0].productTotal = resp.data.productTotal
        this.list[0].totalNum = resp.data.totalNum
      });
    },
    pIndexChange(i) {
      this.i = i;
      Axios.get("/api/main/report/instock/main?" +
          Qs.stringify({
            page: this.i,
            time: this.datav,
          })).then(resp => {
        this.listClassify = resp.data.details.list;
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