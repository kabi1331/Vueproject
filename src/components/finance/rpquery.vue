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
            <BreadcrumbItem>财务收支</BreadcrumbItem>
            <BreadcrumbItem>收支查询</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Row>
              日期范围
              <DatePicker
                type="daterange"
                :start-date="new Date(2020, 6, 1)"
                format="yyyy-MM-dd"
                placement="bottom-end"
                placeholder="Select date"
                @on-change="h"
              ></DatePicker>收支类型
              <Select v-model="model1" style="width:100px;" id="se" @on-change="rp">
                <Option
                  v-for="item in typeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Button type="success" @click="find">查询</Button>
            </Row>
            <Table border :columns="columns12" :data="listClassify" style="margin-top:20px">
              <template slot-scope="{ row , index}" slot="id">
                <strong @click="message(row,index)">{{ index+1 }}</strong>
              </template>
            </Table>
            <template>
              <Page :total="100" @on-change="pIndexChange" id="page" />
            </template>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <Modal v-model="model" title="单据详情" width="600">
      <Icon type="md-print" size="24" style="float:right" @click="prin"/>
      <Table border :columns="columns" :data="arr">
        <template slot-scope="{ row , index}" slot="id">
          <strong>{{ index+1 }}</strong>
        </template>
      </Table>
    </Modal>
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
          title: "订单编号",
          key: "ordercode"
        },
        {
          title: "用户",
          key: "account"
        },
        {
          title: "付款时间",
          key: "payTime"
        },
        {
          title: "总计",
          key: "payPrice"
        },
        {
          title: "付款方式",
          key: "payType"
        }
      ],
      columns: [
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
          key: "productName"
        },
        {
          title: "总数",
          key: "num"
        },
        {
          title: "单位",
          key: "unitName"
        },
        {
          title: "单价",
          key: "unitPrice"
        },
        {
          title: "总价",
          key: "itemPrice"
        }
      ],
      typeList: [
        {
          label: "收入",
          value: "收入"
        },
        {
          label: "支出",
          value: "支出"
        }
      ],
      model1: "",
      i: "",
      datav: "",
      choose: "",
      arr: [],
      model: false
    };
  },
  components: { topPage, leftNav },
  watch: {
    model1() {
      Axios.get("/api/main/finance/query?type=" + this.model1).then(resp => {
        this.listClassify = resp.data.list;
      });
    }
  },
  methods: {
    prin(){
      window.print();
    },
    message(row, index) {
      if (this.choose == "支出") {
        Axios.get(
          "/api/main/purchase/pomain/queryItem?poId=" + row.ordercode
        ).then(resp => {
          this.arr = resp.data;
          this.model = true;
        });
      } else {
        Axios.get("/api/main/sell/somain/queryItem?soId=" + row.ordercode).then(
          resp => {
            this.arr = resp.data;
            this.model = true;
          }
        );
      }
    },
    rp(value) {
      this.choose = value;
    },
    h(daterange) {
      this.datav = daterange;
    },
    find() {
      Axios.get(
        "/api/main/finance/query?" +
          Qs.stringify({
            type: this.model1,
            startDate: this.datav[0],
            endDate: this.datav[1]
          })
      ).then(resp => {
        this.listClassify = resp.data.list;
      });
    },
    pIndexChange(i) {
      this.i = i;
      Axios.get(
        "/api/main/finance/query?" +
          Qs.stringify({ type: this.model1, page: this.i })
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