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
            <BreadcrumbItem>采购单了结</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Select v-model="model1" style="width:100px;" id="se">
              <Option
                v-for="item in typeList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <Table border :columns="columns12" :data="listClassify">
              <template slot-scope="{ row , index}" slot="id">
                <strong>{{ index+1 }}</strong>
              </template>
              <template slot-scope="{ row , index}" slot="action">
                <Button type="success" size="small" @click="put(index)">
                    了结
                </Button>
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
          title: "操作",
          slot: "action"
        }
      ],
      typeList: [
        {
          label: "货到付款",
          value: "1"
        },
        {
          label: "款到发货",
          value: "2"
        },
        {
          label: "预付款到发货",
          value: "3"
        },
      ],
      model1: "",
      i: ""
    };
  },
  components: { topPage, leftNav },
  watch: {
    model1() {
      Axios.get("/api/main/purchase/pomain/show?" + Qs.stringify({type:4,payType:this.model1})).then(
        resp => {
          this.listClassify = resp.data.list;
          console.log(resp.data);
        }
      );
    }
  },
  methods: {
    pIndexChange(i) {
      this.i = i;
      Axios.get("/api/main/purchase/pomain/query?" + {page:this.i,payType:this.model1}).then(resp => {
        this.listClassify = resp.data.list;
      });
    },
    put(i) {
      Axios.post("/api/main/purchase/pomain/end?" + Qs.stringify({poId:this.listClassify[i].poId,payType:this.listClassify[i].payType})).then(resp => {
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
#se {
  position: relative;
  top: -10px;
}
</style>