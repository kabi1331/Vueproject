<template>
  <div>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo">
        <img src="../../static/images/logo.png" />
      </div>
      <div class="layout-nav">
        <div class="topright">
          <div class="user">
            <span class="in">{{user}}</span>
            <span class="out">
              系统时间:
              <Time :time="time" type="datetime" />
            </span>
          </div>
        </div>
      </div>
    </Menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: "",
      user: '',
    };
  },
  methods: {
    getTime() {
      this.time = new Date().getTime()
    }
  },
  mounted() {
    let that = this;
    that.getTime();
    setInterval(function() {
      that.getTime();
    }, 1000);
    this.user = localStorage.getItem('name')
  }
};
</script>
<style>
.layout-logo {
  width: 100px;
  height: 30px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
#head {
  height: 100px;
}

.topright {
  height: 88px;
  float: right;
}

.user {
  height: 60px;
  background-color: #2d8cf0;
  clear: both;
  margin-top: 20px;
  float: right;
  margin-right: 12px;
  border-radius: 30px;
  white-space: nowrap;
  position: relative;
}

.user .in {
  display: inline-block;
  background: url(../../static/images/user.png) no-repeat 15px 10px;
  line-height: 30px;
  font-size: 14px;
  color: #b8ceda;
  padding-left: 35px;
}

.user .out {
  display: inline-block;
  background: url(../../static/images/time.png) no-repeat 0px 20px;
  color: #fff;
  padding-left: 22px;
  font-size: 14px;
  margin-right: 13px;
  background-size: 24px 24px;
}
</style>