<template>
  <div class="navbar-container">
    <el-menu class="navbar" mode="horizontal">
      <hamburger :is-active="sidebarOpened" :toggle-click="toggleSideBar" />
      <breadcrumb />
      <div class="right-menu">
        <i class="el-icon-s-custom" @click="drawer = true"></i>
        <i class="el-icon-switch-button" @click="handleLogout"></i>
      </div>
    </el-menu>

    <el-drawer
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      :size="500"
      :show-close="false"
      :visible.sync="drawer"
      :with-header="false"
    >
      <div class="drawer-content">
        <el-descriptions title="个人信息" :column="1" border size="medium">
          <el-descriptions-item label="姓名">{{
            userInfo.name
          }}</el-descriptions-item>
          <el-descriptions-item label="角色"
            ><el-tag size="small">{{
              userInfo.role
            }}</el-tag></el-descriptions-item
          >
          <el-descriptions-item label="组织">{{
            userInfo.team
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            userInfo.phone
          }}</el-descriptions-item>
          <el-descriptions-item label="操作">
            <el-button @click="handleChangePassword" type="text" size="small">修改密码</el-button>
            <el-button @click="handleResetPassword" type="text" size="small">重置密码</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div></div>
    </el-drawer>
    <password
      :visible.sync="passwordVisible"
      :is-reset="isResetPassword">
    </password>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import Password from '@/components/Password'
import Hamburger from '@/components/Hamburger'
export default {
  name: "Navbar",
  components: {
    Breadcrumb,
    Password,
    Hamburger
  },
  data() {
    return {
      drawer: false,
      userInfo: {
        name: "1",
        role: "dfd",
        team: "dfd",
        phone: "1234567890",
        password: "dfd",
      },
      loading: false,
      passwordVisible: false,
      isResetPassword: false
    };
  },
  computed: {
    sidebarOpened() {
      return this.$store.getters["sidebarOpened"];
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('sidebar/toggleSideBar')
    },
    async handleLogout() {
      this.$confirm("确定要退出登录吗？", "提示", {
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$store.dispatch("user/logout");
            this.$router.push("/login");
          } catch (error) {
            console.error("Logout failed:", error);
          }
        })
        .catch(() => {});
    },
    handleChangePassword() {
      this.isResetPassword = false
      this.passwordVisible = true
    },
    handleResetPassword() {
      this.isResetPassword = true
      this.passwordVisible = true
    }
  },
};
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  height: 50px;
  line-height: 50px;
}
.drawer-content {
  padding: 10px 40px;
}
[class^="el-icon-"] {
  font-size: 22px;
  margin-left: 20px;
  cursor: pointer;
}
</style>
