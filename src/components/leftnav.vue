<template>
  <div>
    <Menu active-name="1-2" theme="light" width="auto" id="menu">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-paper-outline"></Icon>管理信息
        </template>
        <MenuItem name="1-1" @click.native="toHomepage">首页</MenuItem>
        <MenuItem name="1-2" @click.native="toUsermanage">用户管理</MenuItem>
        <MenuItem name="1-3" @click.native="toLogin">退出</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-paper-outline"></Icon>产品管理
        </template>
        <MenuItem name="2-1" @click.native="toclassify">产品分类列表</MenuItem>
        <MenuItem name="2-2" @click.native="toproduct">产品列表</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-paper-outline"></Icon>采购管理
        </template>
        <MenuItem name="3-1" @click.native='tosupplier'>供应链管理</MenuItem>
        <MenuItem name="3-2" @click.native='toaddnote'>新添采购单</MenuItem>
        <MenuItem name="3-3" @click.native='tofinishpu'>采购单了结</MenuItem>
        <MenuItem name="3-4" @click.native='toinquire'>采购单查询</MenuItem>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-paper-outline"></Icon>仓库管理
        </template>
        <MenuItem name="4-1" @click.native='toinstock'>入库登记</MenuItem>
        <MenuItem name="4-2" @click.native='tooutstock'>出库登记</MenuItem>
        <MenuItem name="4-3" @click.native='toquery'>库存查询</MenuItem>
        <MenuItem name="4-4" @click.native='tocheckstock'>库存盘点</MenuItem>
      </Submenu>
      <Submenu name="5">
        <template slot="title">
          <Icon type="ios-paper-outline"></Icon>销售管理
        </template>
        <MenuItem name="5-1" @click.native='touserman'>客户管理</MenuItem>
        <MenuItem name="5-2" @click.native='toaddsell'>新添销售单</MenuItem>
        <MenuItem name="5-3" @click.native='tofinishsell'>销售单了结</MenuItem>
        <MenuItem name="5-4" @click.native='toinqusell'>销售单查询</MenuItem>
      </Submenu>
      <Submenu name="6">
        <template slot="title">
          <Icon type="ios-paper-outline"></Icon>财务收支
        </template>
        <MenuItem name="6-1" @click.native='toreceipt'>收款登记</MenuItem>
        <MenuItem name="6-2" @click.native='topay'>付款登记</MenuItem>
        <MenuItem name="6-3" @click.native='torpquery'>收支查询</MenuItem>
      </Submenu>
      <Submenu name="7">
        <template slot="title">
          <Icon type="ios-paper-outline"></Icon>月度报表
        </template>
        <MenuItem name="7-1" @click.native='tompu'>月度采购报表</MenuItem>
        <MenuItem name="7-2" @click.native='tomsell'>月度销售报表</MenuItem>
        <MenuItem name="7-3" @click.native='tomout'>月度出库报表</MenuItem>
        <MenuItem name="7-4" @click.native='tomin'>月度入库报表</MenuItem>
        <MenuItem name="7-5" @click.native='tomsto'>月度库存报表</MenuItem>
        <MenuItem name="7-6" @click.native='tomps'>月度收支报表</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
export default {
    methods:{
        toLogin(){
            this.$router.push("/");
        },
        toUsermanage(){
            this.$router.push("/usermanage");
        },
        toHomepage(){
            this.$router.push("/homepage/"+localStorage.getItem('name'));
        },
        toclassify(){
            this.$router.push("/classify");
        },
        toproduct(){
            this.$router.push("/product");
        },
        tosupplier(){
            this.$router.push("/supplier");
        },
        toaddnote(){
            this.$router.push("/addnote");
        },
        tofinishpu(){
            this.$router.push("/finishpu");
        },
        toinquire(){
            this.$router.push("/inquire");
        },
        touserman(){
            this.$router.push("/userman");
        },
        toaddsell(){
            this.$router.push("/addsell");
        },
        toinqusell(){
            this.$router.push("/inqusell");
        },
        toinstock(){
            this.$router.push("/instock");
        },
        tooutstock(){
            this.$router.push("/outstock");
        },
        toquery(){
            this.$router.push("/query");
        },
        tocheckstock(){
            this.$router.push("/checkstock");
        },
        topay(){
            this.$router.push("/pay");
        },
        torpquery(){
            this.$router.push("/rpquery");
        },
        toreceipt(){
            this.$router.push("/receipt");
        },
        tofinishsell(){
            this.$router.push("/finishsell");
        },
        tomps(){
            this.$router.push("/mps");
        },
        tomsto(){
            this.$router.push("/msto");
        },
        tomin(){
            this.$router.push("/min");
        },
        tomout(){
            this.$router.push("/mout");
        },
        tomsell(){
            this.$router.push("/msell");
        },
        tompu(){
            this.$router.push("/mpu");
        }
    }
};
</script>
<style>
</style>