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
            <BreadcrumbItem>仓管登记</BreadcrumbItem>
            <BreadcrumbItem>入库登记</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Table border :columns="columns12" :data="listClassify" style="margin-top:20px">
              <template slot-scope="{ row , index}" slot="id">
                <strong>{{ index+1 }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" @click="stock(index)">可入库</Button>
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
          title: "入库状态",
          slot: "action"
        }
      ],
      i: "",
      poId: "",
      payType:""
    };
  },
  components: { topPage, leftNav },
  mounted() {
    Axios.get("/api/main/purchase/pomain/show?type=" + 2).then(resp => {
      this.listClassify = resp.data.list;
    });
  },
  methods: {
    pIndexChange(i) {
      this.i = i;
      Axios.get("/api/main/purchase/pomain/show?page=" + this.i).then(resp => {
        this.listClassify = resp.data.list;
      });
    },
    stock(index){
        Axios.post('/api/main/stock/instock?'+Qs.stringify({poId:this.listClassify[index].poId,payType:this.listClassify[index].payType})).then(resp => {
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