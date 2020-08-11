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
            <BreadcrumbItem>收款登记</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Table border :columns="columns12" :data="listClassify" style="margin-top:20px">
              <template slot-scope="{ row , index}" slot="id">
                <strong>{{ index+1 }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" @click="stock(index)">
                    {{row.payType==3&&row.status==1?'收预付款':'收款'}}
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
          key: "soId"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "供应商名称",
          key: "customerCode"
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
          key: "soTotal"
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
          title: "销售单状态",
          key: "status"
        },
        {
          title: "出库状态",
          slot: "action"
        }
      ],
      i: "",
      soId: "",
      payType:"",
      type:'',
    };
  },
  components: { topPage, leftNav },
  mounted() {
    Axios.get("/api/main/sell/somain/show?type=" + 3).then(resp => {
      this.listClassify = resp.data.list;
      console.log(resp.data.list);
      
    });
  },
  methods: {
    pIndexChange(i) {
      this.i = i;
      Axios.get("/api/main/sell/somain/show?page=" + this.i).then(resp => {
        this.listClassify = resp.data.list;
      });
    },
    stock(index){
        if(this.listClassify[index].payType == 3&&this.listClassify[index].status==1){
            this.type = 2
        }else{
            this.type = 1
        }
        Axios.post('/api/main/finance/receipt?'+Qs.stringify({soId:this.listClassify[index].soId,type:this.type})).then(resp => {
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