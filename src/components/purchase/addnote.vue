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
            <BreadcrumbItem>新添采购单</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Button type="primary" icon="md-add" id="but" @click="gotoadd">添加</Button>
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
          label: "新增",
          value: "1"
        },
        {
          label: "可入库",
          value: "2"
        },
        {
          label: "可付款",
          value: "3"
        },
        {
          label: "可了结",
          value: "4"
        }
      ],
      model1: "",
      i: ""
    };
  },
  components: { topPage, leftNav },
  watch: {
    model1() {
      Axios.get("/api/main/purchase/pomain/show?type=" + this.model1).then(
        resp => {
          this.listClassify = resp.data.list;
          console.log(resp.data);
        }
      );
    }
  },
  methods: {
    changetest(index, row) {
      this.$router.push("/changenote/"+this.listClassify[index].poId);
    },
    remove(index) {
      Axios.post(
        "/api/main/purchase/pomain/delete?poId=" +
          this.listClassify[index].poId
      ).then(resp => {
        this.listClassify.splice(index, 1);
      });
    },
    gotoadd() {
      this.$router.push("/newnote");
    },
    pIndexChange(i) {
      this.i = i;
      Axios.get("/api/main/purchase/pomain/show?page=" + this.i).then(resp => {
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
#se {
  position: relative;
  top: -10px;
}
</style>