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
            <BreadcrumbItem>月度收支报表</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Row>
              日期范围
              <DatePicker
                type="month"
                placeholder="Select month"
                style="width: 200px"
                @on-change="h"
              ></DatePicker>
              <Button type="success" @click="find">查询</Button>
            </Row>
            <Table border :columns="columns1" :data="list" style="margin-top:20px"></Table>
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
      columns1: [
        {
          title: "收款次数",
          key: "payCount"
        },
        {
          title: "收款总金额",
          key: "payPrice"
        },
        {
          title: "付款次数",
          key: "receCount"
        },
        {
          title: "付款总金额",
          key: "recePrice"
        }
      ],
      list: [
        {
          payCount: "",
          payPrice: "",
          receCount: "",
          recePrice: ""
        }
      ],
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
        "/api/main/report/payment/main?" +
          Qs.stringify({
            page: this.i,
            time: this.datav
          })
      ).then(resp => {
        this.list[0].payCount = resp.data.payCount;
        this.list[0].payPrice = resp.data.payPrice;
        this.list[0].receCount = resp.data.receCount;
        this.list[0].recePrice = resp.data.recePrice;
      });
    },
    pIndexChange(i) {
      this.i = i;
      Axios.get(
        "/api/main/report/payment/main?" +
          Qs.stringify({
            page: this.i,
            time: this.datav
          })
      ).then(resp => {
        this.list[0].payCount = resp.data.payCount;
        this.list[0].payPrice = resp.data.payPrice;
        this.list[0].receCount = resp.data.receCount;
        this.list[0].recePrice = resp.data.recePrice;
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