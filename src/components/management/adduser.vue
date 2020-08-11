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
            <BreadcrumbItem>管理信息</BreadcrumbItem>
            <BreadcrumbItem>用户管理</BreadcrumbItem>
            <BreadcrumbItem>添加新用户</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <div class="formtitle">
              <span>基本信息</span>
            </div>

            <ul class="forminfo">
              <li>
                <label>
                  用户账号
                  <span>*</span>
                </label>
                <input name type="text" class="dfinput" v-model="account" />
                <span class="remind">标题不能超过30个字符</span>
              </li>
              <li>
                <label>
                  用户姓名
                  <span>*</span>
                </label>
                <input name type="text" class="dfinput" v-model="name" />
                <span class="remind">多个关键字用,隔开</span>
              </li>
              <li>
                <label>
                  用户密码
                  <span>*</span>
                </label>
                <input name type="password" class="dfinput" v-model="passWord" />
                <span class="remind">默认为用户账号</span>
              </li>
              <li>
                <label>
                  添加日期
                  <span>*</span>
                </label>
                <input name type="text" class="dfinput" v-model="createDate" readonly />
              </li>
              <li>
                <label>
                  锁定状态
                  <span>*</span>
                </label>
                <cite>
                  <input name="isTrue" type="radio" value="1" v-model="isClock"/>是&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    name="isTrue"
                    type="radio"
                    value="0"
                    v-model="isClock"
                  />否
                </cite>
              </li>
              <li>
                <label>
                  权限
                  <span>*</span>
                </label>
                <cite>
                  <input name type="checkbox"  v-model="checked" @change="changeAllChecked"/>管理员&nbsp;&nbsp;&nbsp;&nbsp;
                  <input name type="checkbox" :value=1 v-model="checkedNames"/>采购&nbsp;&nbsp;&nbsp;&nbsp;
                  <input name type="checkbox" :value=2 v-model="checkedNames"/>销售&nbsp;&nbsp;&nbsp;&nbsp;
                  <input name type="checkbox" :value=3 v-model="checkedNames"/>系统&nbsp;&nbsp;&nbsp;&nbsp;
                  <input name type="checkbox" :value=5 v-model="checkedNames"/>仓管&nbsp;&nbsp;&nbsp;&nbsp;
                  <input name type="checkbox" :value=4 v-model="checkedNames"/>财务&nbsp;&nbsp;&nbsp;&nbsp;
                  <input name type="checkbox" :value=6 v-model="checkedNames"/>业务&nbsp;&nbsp;&nbsp;&nbsp;
                </cite>
              </li>
              <li>
                <label>&nbsp;</label>
                <input name type="submit" class="btn" value="确认保存" @click="add"/>&nbsp;
                <input name type="button" class="cancel" value="取消" @click="back" />
              </li>
            </ul>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import topPage from "../top";
import leftNav from "../leftnav";
import dayjs from 'dayjs';
import Axios from 'axios';
import Qs from 'qs'
export default {
  components: { topPage, leftNav },
  data() {
    return {
      account: '',
      name: '',
      passWord: '',
      createDate: '',
      checkedNames: [],
      isClock:0,
      checkedArr: [1,2,3,4,5,6],
      checked: false,
    };
  },
  watch: {
		"checkedNames": function() {
			if (this.checkedNames.length == this.checkedArr.length) {
				this.checked = true
			} else {
				this.checked = false
			}
		}
	},
  mounted() {
      let nowDay = new Date().getTime()
      this.createDate = dayjs(nowDay).format('YYYY-MM-DD hh:mm:ss')
  },
  methods: {
    back() {
      this.$router.push("/usermanage");
    },
    add(){
        let data = {'account':this.account,'name':this.name,'passWord':this.passWord,'createDate':this.createDate,'modelcodes':this.checkedNames,'status':this.isClock}
        Axios.post('/api/main/system/user/add',Qs.stringify(data)).then(resp => {
            this.$router.push("/usermanage");
        })
    },
    changeAllChecked: function() {
			if (this.checked) {
				this.checkedNames = this.checkedArr
			} else {
				this.checkedNames = []
			}
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
.formbody,
.rightinfo,
.tabson {
  padding: 10px 18px;
}

.formtitle {
  border-bottom: solid 1px #d0dee5;
  line-height: 35px;
  position: relative;
  height: 35px;
  margin-bottom: 28px;
}

.formtitle span {
  font-weight: bold;
  font-size: 14px;
  border-bottom: solid 3px #66c9f3;
  float: left;
  position: absolute;
  z-index: 100;
  bottom: -1px;
  padding: 0 3px;
  height: 30px;
  line-height: 30px;
}

.forminfo {
  padding-left: 23px;
}

.forminfo li {
  margin-bottom: 13px;
  clear: both;
}

.forminfo li label {
  width: 86px;
  line-height: 34px;
  display: block;
  float: left;
}

.forminfo li .remind {
  color: #7f7f7f;
  padding-left: 20px;
  font-style: normal;
  font-weight: normal;
}

.forminfo li cite {
  display: block;
  padding-top: 10px;
}

.dfinput {
  width: 345px;
  height: 32px;
  line-height: 32px;
  border-top: solid 1px #a7b5bc;
  border-left: solid 1px #a7b5bc;
  border-right: solid 1px #ced9df;
  border-bottom: solid 1px #ced9df;
  background: url(../../../static/images/inputbg.gif) repeat-x;
  text-indent: 10px;
}

.textinput {
  border-top: solid 1px #a7b5bc;
  border-left: solid 1px #a7b5bc;
  border-right: solid 1px #ced9df;
  border-bottom: solid 1px #ced9df;
  background: url(../../../static/images/inputbg.gif) repeat-x;
  padding: 10px;
  width: 504px;
  height: 135px;
  line-height: 20px;
  overflow: hidden;
}

.btn {
  width: 137px;
  height: 35px;
  float: left;
  background: url(../../../static/images/btnbg.png) no-repeat;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}

/*tip*/
.tip {
  width: 485px;
  height: 260px;
  position: absolute;
  top: 10%;
  left: 30%;
  background: #fcfdfd;
  box-shadow: 1px 8px 10px 1px #9b9b9b;
  border-radius: 1px;
  display: none;
  z-index: 111111;
}

.tiptop {
  height: 40px;
  line-height: 40px;
  background: url(../../../static/images/tcbg.gif) repeat-x;
  cursor: pointer;
}

.tiptop span {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  float: left;
  text-indent: 20px;
}

.tiptop a {
  display: block;
  background: url(../../../static/images/close.png) no-repeat;
  width: 22px;
  height: 22px;
  float: right;
  margin-right: 7px;
  margin-top: 10px;
  cursor: pointer;
}

.tiptop a:hover {
  background: url(../../../static/images/close1.png) no-repeat;
}

.tipinfo {
  padding-top: 30px;
  margin-left: 65px;
  height: 95px;
}

.tipinfo span {
  width: 95px;
  height: 95px;
  float: left;
}

.tipright {
  float: left;
  padding-top: 15px;
  padding-left: 10px;
}

.tipright p {
  font-size: 14px;
  font-weight: bold;
  line-height: 35px;
}

.tipright cite {
  color: #858686;
}

.tipbtn {
  margin-top: 25px;
  margin-left: 125px;
}

.sure,
.cancel {
  width: 96px;
  height: 35px;
  line-height: 35px;
  color: #fff;
  background: url(../../../static/images/btnbg1.png) repeat-x;
  font-size: 14px;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
}

.cancel {
  background: url(../../../static/images/btnbg2.png) repeat-x;
  color: #000;
  font-weight: normal;
}
</style>