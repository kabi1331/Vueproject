<template>
  <div>
    <div id="mainBody">
      <div id="cloud1" class="cloud"></div>
      <div id="cloud2" class="cloud"></div>
    </div>

    <div class="logintop">
      <span>欢迎登录后台管理界面平台</span>
      <ul>
        <li>
          <a href="#">帮助</a>
        </li>
        <li>
          <a href="#">关于</a>
        </li>
      </ul>
    </div>

    <div class="loginbody">
      <form action="index.html" method="post">
        <span class="systemlogo"></span>

        <div class="loginbox">
          <ul>
            <li>
              <input
                name="username"
                type="text"
                class="loginuser"
                placeholder="admin"
                v-model="username"
              />
            </li>
            <li>
              <input
                name="password"
                type="text"
                class="loginpwd"
                placeholder="密码"
                v-model="password"
              />
            </li>
            <li>
              <input name type="button" class="loginbtn" value="登录" @click="join"/>
              <label>
                <input name type="checkbox" value />记住密码
              </label>
              <label>
                <a href="#">忘记密码？</a>
              </label>
            </li>
          </ul>
        </div>
      </form>
    </div>

    <div class="loginbm">版权所有 2018 aowin.com</div>
  </div>
</template>
<script>
import Axios from 'axios'
import Qs from 'qs'
export default {
    data() {
        return {
            username:'',
            password:'',
        }
    },
    methods:{
        join(){
            let data = {'username':this.username,'password':this.password,'role':'member'}
            Axios.post('/api/sys/login',Qs.stringify(data)).then(resp => {
                if(resp.data.message === '登录成功'){
                    alert(resp.data.message);
                    this.$router.push('/homepage/'+this.username)
                    localStorage.clear()
                    localStorage.setItem('name',this.username)
                }
            })
        }
    },
  mounted() {
    $(".loginbox").css({
      position: "absolute",
      left: ($(window).width() - 692) / 2
    });
    $(window).resize(function() {
      $(".loginbox").css({
        position: "absolute",
        left: ($(window).width() - 692) / 2
      });
    });
  }
};
</script>
<style scoped>
#mainBody {
  background-color: #1c77ac;
  background-image: url(../../static/images/light.png);
  background-repeat: no-repeat;
  background-position: center top;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
}

.cloud {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: url(../../static/images/cloud.png) no-repeat;
  z-index: 1;
  opacity: 0.5;
}

#cloud2 {
  z-index: 2;
}

/*login*/
.logintop {
  height: 47px;
  position: absolute;
  top: 0;
  background: url(../../static/images/loginbg1.png) repeat-x;
  z-index: 100;
  width: 100%;
}

.logintop span {
  color: #fff;
  line-height: 47px;
  background: url(../../static/images/loginsj.png) no-repeat 21px 18px;
  text-indent: 44px;
  color: #afc5d2;
  float: left;
}

.logintop ul {
  float: right;
  padding-right: 30px;
}

.logintop ul li {
  float: left;
  margin-left: 20px;
  line-height: 47px;
}

.logintop ul li a {
  color: #afc5d2;
}

.logintop ul li a:hover {
  color: #fff;
}

.loginbody {
  background: url(../../static/images/loginbg3.png) no-repeat center center;
  width: 100%;
  height: 585px;
  overflow: hidden;
  position: absolute;
  top: 47px;
}

.systemlogo {
  background: url(../../static/images/loginlogo.png) no-repeat center;
  width: 100%;
  height: 71px;
  margin-top: 75px;
}

.loginbox {
  width: 692px;
  height: 336px;
  background: url(../../static/images/logininfo.png) no-repeat;
  margin-top: 30px;
}

.loginbox ul {
  margin-top: 88px;
  margin-left: 285px;
}

.loginbox ul li {
  margin-bottom: 25px;
}

.loginbox ul li label {
  color: #687f92;
  padding-left: 25px;
}

.loginbox ul li label a {
  color: #687f92;
}

.loginbox ul li label a:hover {
  color: #3d96c9;
}

.loginbox ul li label input {
  margin-right: 5px;
}

.loginuser {
  width: 299px;
  height: 48px;
  background: url(../../static/images/loginuser.png) no-repeat;
  border: none;
  line-height: 48px;
  padding-left: 44px;
  font-size: 14px;
  font-weight: bold;
}

.loginpwd {
  width: 299px;
  height: 48px;
  background: url(../../static/images/loginpassword.png) no-repeat;
  border: none;
  line-height: 48px;
  padding-left: 44px;
  font-size: 14px;
  color: #90a2bc;
}

.loginbtn {
  width: 111px;
  height: 35px;
  background: url(../../static/images/buttonbg.png) repeat-x;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  line-height: 35px;
}

.loginbm {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: url(../../static/images/loginbg2.png) repeat-x;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #0b3a58;
}

.loginbm a {
  font-weight: bold;
  color: #0b3a58;
}

.loginbm a:hover {
  color: #fff;
}
</style>