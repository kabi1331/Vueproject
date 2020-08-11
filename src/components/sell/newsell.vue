<template>
  <div>
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
              <BreadcrumbItem>销售管理</BreadcrumbItem>
              <BreadcrumbItem>添加销售单</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
              <div id="poDiv" class="rightinfo">
                <form action="#" id="pomainForm">
                  <div class="tools">
                    <ul class="toolbar">
                      <li @click="addItem">
                        <img src="../../../static/images/t01.png" />增加明细
                      </li>
                      <li @click="savePomain">
                        <img src="../../../static/images/t07.png" />保存
                      </li>
                    </ul>
                  </div>
                  <table class="tablelist">
                    <tr>
                      <td>销售单编号</td>
                      <td>
                        <input type="text" class="poinput" v-model="soId" />
                        <span>*</span>
                      </td>
                      <td>创建时间</td>
                      <td>
                        <input type="text" class="poinput" v-model="createTime" />
                        <span>*</span>
                      </td>
                      <td>客户编号</td>
                      <td>
                        <Select v-model="model1" style="width:120px">
                          <Option
                            v-for="item in arr2"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                        <span>*</span>
                      </td>
                    </tr>
                    <tr>
                      <td>创建用户</td>
                      <td>
                        <input type="text" class="poinput" value="admin" v-model="account" />
                        <span>*</span>
                      </td>
                      <td>附加费用</td>
                      <td>
                        <input type="text" class="poinput" v-model="tipFee" />
                        <span>*</span>
                      </td>
                      <td>产品总价</td>
                      <td>
                        <input type="text" class="poinput" v-model="productTotal" />
                        <span>*</span>
                      </td>
                    </tr>
                    <tr>
                      <td>付款方式</td>
                      <td>
                        <select class="poinput" v-model="payType">
                          <option value="1">货到付款</option>
                          <option value="2">款到发货</option>
                          <option value="3">预付款到发货</option>
                        </select>
                        <span>*</span>
                      </td>
                      <td>最低预付款金额</td>
                      <td>
                        <input type="text" class="poinput" v-model="prePayFee" />
                        <span>*</span>
                      </td>
                      <td>备注</td>
                      <td>
                        <input type="text" class="poinput" v-model="remark" />
                      </td>
                    </tr>
                    <tr>
                      <td>销售单状态</td>
                      <td>
                        <select class="poinput" v-model="status">
                          <option value="1">新增</option>
                          <option value="2">已发货</option>
                          <option value="3">已收款</option>
                          <option value="4">已了结</option>
                          <option value="5">已预付</option>
                        </select>
                        <span>*</span>
                      </td>
                      <td>销售总价</td>
                      <td>
                        <input type="text" class="poinput" v-model="soTotal" />
                      </td>
                    </tr>
                  </table>
                  <Table border :columns="columns12" :data="data6">
                    <template slot-scope="{ row , index}" slot="id">
                      <strong>{{ index+1 }}</strong>
                    </template>
                    <template slot="productCode" slot-scope="{ row , index}">
                      <Input placeholder="Enter something..." v-model="arr[index].productCode" />
                    </template>
                    <template slot="unitPrice" slot-scope="{ row , index}">
                      <Input placeholder="Enter something..." v-model="arr[index].unitPrice" />
                    </template>
                    <template slot="num" slot-scope="{ row , index}">
                      <Input placeholder="Enter something..." v-model="arr[index].num" />
                    </template>
                    <template slot="unitName" slot-scope="{ row , index}">
                      <Input placeholder="Enter something..." v-model="arr[index].unitName" />
                    </template>
                    <template slot="itemPrice" slot-scope="{ row , index}">
                      <Input
                        placeholder="Enter something..."
                        :value="arr[index].itemPrice=arr[index].num*arr[index].unitPrice"
                      />
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                      <Button type="error" size="small" @click="remove(index)">Delete</Button>
                    </template>
                  </Table>
                </form>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>
<script>
import topPage from "../top";
import leftNav from "../leftnav";
import dayjs from "dayjs";
import Axios from "axios";
import Qs from "qs";
export default {
  components: { topPage, leftNav },
  data() {
    return {
      columns12: [
        {
          title: "序号",
          slot: "id"
        },
        {
          title: "产品编号",
          slot: "productCode"
        },
        {
          title: "产品单价",
          slot: "unitPrice"
        },
        {
          title: "产品数量",
          slot: "num"
        },
        {
          title: "数量单位",
          slot: "unitName"
        },
        {
          title: "明细总价",
          slot: "itemPrice"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      data6: [],
      soId: "",
      customerCode: "",
      account: "",
      createTime: "",
      tipFee: 0,
      payType: "",
      prePayFee: "",
      status: "",
      remark: "",
      arr: [],
      arr1:[],
      arr2:[],
      model1:''
    };
  },
  mounted() {
      let nowDay = new Date().getTime()
      this.createTime = dayjs(nowDay).format('YYYY-MM-DD hh:mm:ss'),
      Axios.get('/api/main/sell/customer/show?page=' +2).then(resp =>{
        this.arr1 = resp.data.list
        console.log(this.arr1);
        
        for (let i = 0; i < this.arr1.length; i++) {
          this.arr2.push({value:this.arr1[i].customerCode,label:this.arr1[i].customerCode})
        }
        console.log(this.arr2);
      })
  },
  computed: {
    productTotal() {
      let sum = 0;
      for (let i = 0; i < this.arr.length; i++) {
        sum += this.arr[i].num * this.arr[i].unitPrice;
      }
      return sum;
    },
    soTotal() {
      let sum = 0;
      sum = parseInt(this.productTotal) + parseInt(this.tipFee);
      return sum;
    }
  },
  methods: {
    addItem() {
      this.data6.push({
        id: 1,
        productCode: this.productCode,
        unitPrice: this.unitPrice,
        num: this.num,
        unitName: this.unitName
      });
      this.arr.push({
        productCode: "",
        unitPrice: "",
        num: "",
        unitName: ""
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
      this.arr.splice(index, 1);
    },
    savePomain() {
      let data = {
        soId: this.soId,
        customerCode: this.model1,
        account: this.account,
        createTime: this.createTime,
        tipFee: this.tipFee,
        productTotal: this.productTotal,
        soTotal: this.soTotal,
        payType: this.payType,
        prePayFee: this.prePayFee,
        status: this.status,
        remark: this.remark,
        soitems: this.arr
      };
      Axios({
        url: "/api/main/sell/somain/add",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data:JSON.stringify(data)
      }).then(res =>{
          console.log(res);
      });
      this.$router.push("/addsell");
    }
  }
};
</script>
<style lang="">
.tablelist {
  border: solid 1px #cbcbcb;
  width: 100%;
  clear: both;
}

.tablelist th {
  background: url(../../../static/images/th.gif) repeat-x;
  height: 34px;
  line-height: 34px;
  border-bottom: solid 1px #b6cad2;
  text-indent: 11px;
  text-align: left;
}

.tablelist td {
  height: 35px;
  line-height: 35px;
  text-indent: 11px;
  border-right: dotted 1px #c7c7c7;
}

.tablelink {
  color: #056dae;
}

.tablelist tbody tr.odd {
  background: #f5f8fa;
}

.tablelist tbody tr:hover {
  background: #e5ebee;
}

.tablelist .poinput {
  border: solid 1px #a7b5bc;
  height: 22px;
  line-height: 22px;
  text-indent: 2px;
}

.tablelist .point {
  position: relative;
  top: 6px;
  cursor: pointer;
}

.tablelist span {
  color: #f00;
  font-size: 14px;
  font-weight: bold;
}
.tools {
  clear: both;
  height: 35px;
  margin-bottom: 8px;
}

.toolbar {
  float: left;
}

.toolbar li {
  background: url(../../../static/images/toolbg.gif) repeat-x;
  line-height: 33px;
  height: 33px;
  border: solid 1px #d3dbde;
  float: left;
  padding-right: 10px;
  margin-right: 5px;
  border-radius: 3px;
  cursor: pointer;
}

.toolbar li img {
  float: left;
  margin-left: 10px;
  margin-right: 5px;
  margin-top: 5px;
}
</style>