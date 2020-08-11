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
            <BreadcrumbItem>首页</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <div class="welinfo">
              <img src="../../../static/images/sun.png" alt="天气" />
              <span>Admin早上好，欢迎使用信息管理系统</span>
            </div>

            <div class="welinfo">
              <img src="../../../static/images/time.png" alt="时间" />
              <span>
                您登录的时间：<Time :time="time" type="datetime" />
              </span>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import topPage from "../top";
import leftNav from "../leftnav";
export default {
  components: { topPage, leftNav },
  data() {
      return {
          time:new Date().getTime()
      }
  },
};
</script>
<style lang="">
.layout {
  border: 1px solid #d7dde4;
  height: 1035px;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
#side {
  height: 930px;
}
.welinfo {
  height: 32px;
  line-height: 32px;
  padding-bottom: 8px;
}

.welinfo img {
  float: left;
}

.welinfo span {
  padding-left: 8px;
}

.welinfo a {
  padding-left: 15px;
  color: #3186c8;
}

.welinfo a:hover {
  color: #f60;
}
</style>