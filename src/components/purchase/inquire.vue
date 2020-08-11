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
            <BreadcrumbItem>采购管理</BreadcrumbItem>
            <BreadcrumbItem>采购单查询</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Row>
              采购单编号
              <Input placeholder="Enter something..." style="width:100px" v-model="poId" />日期范围
              <DatePicker
                type="daterange"
                :start-date="new Date(2020, 7, 1)"
                format="yyyy-MM-dd"
                placement="bottom-end"
                placeholder="Select date"
                @on-change="h"
              ></DatePicker>处理状态
              <Select v-model="model1" style="width:100px;" id="se">
                <Option
                  v-for="item in typeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>查询
              <Button type="success" @click="find">Success</Button>
            </Row>
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
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "供应商名称",
          key: "venderCode"
        },
        {
          title: "创建用户",
          key: "account"
        },
        {
          title: "附加费用",
          key: "tipFee"
        },
        {
          title: "采购产品总价",
          key: "productTotal"
        },
        {
          title: "采购总价格",
          key: "poTotal"
        },
        {
          title: "付款方式",
          key: "payType"
        },
        {
          title: "最低预付金额",
          key: "prePayFee"
        },
        {
          title: "处理状态",
          key: "status"
        }
      ],
      typeList: [
        {
          label: "新增",
          value: "1"
        },
        {
          label: "已发货",
          value: "2"
        },
        {
          label: "已付款",
          value: "3"
        },
        {
          label: "已了结",
          value: "4"
        },
        {
          label: "已预付",
          value: "5"
        }
      ],
      model1: "",
      i: "",
      poId: "",
      datav: ""
    };
  },
  components: { topPage, leftNav },
  mounted() {
    Axios.get("/api//main/purchase/pomain/query").then(resp => {
      this.listClassify = resp.data.list;
    });
  },
  watch: {
    model1() {
      Axios.get("/api/main/purchase/pomain/query?status=" + this.model1).then(
        resp => {
          this.listClassify = resp.data.list;
          console.log(resp.data);
        }
      );
    }
  },
  methods: {
    h(daterange) {
      this.datav = daterange;
    },
    find() {
      Axios.get(
        "/api/main/purchase/pomain/query?"+
        Qs.stringify({
          'poId': this.poId,
          'startDate': this.datav[0],
          'endDate': this.datav[1]
        })
      ).then(resp => {
        this.listClassify = resp.data.list;
      });
    },
    pIndexChange(i) {
      this.i = i;
      Axios.get("/api/main/purchase/pomain/query?page=" + this.i).then(resp => {
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