<template>
  <div class="dashboard-container">
    <!-- 仪表盘内容 -->
    <div class="dashboard-content">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="data-card">
            <div class="card-title">总用户数</div>
            <div class="card-value">1000</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data-card">
            <div class="card-title">今日订单数</div>
            <div class="card-value">150</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data-card">
            <div class="card-title">本月收入</div>
            <div class="card-value">¥50000</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data-card">
            <div class="card-title">总收入</div>
            <div class="card-value">¥500000</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 子路由内容 -->
    <!-- <div class="sub-page-container">
      <router-view />
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="less" scoped>
.dashboard-container {
  padding: 20px;

  .dashboard-content {
    margin-bottom: 20px;

    .data-card {
      background: #fff;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,21,41,.08);

      .card-title {
        color: #909399;
        font-size: 14px;
        margin-bottom: 10px;
      }

      .card-value {
        color: #303133;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }

  .sub-page-container {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
}
</style> 