<template>
  <div style="margin-bottom:20px">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">任务列表</el-menu-item>
      <el-menu-item index="2">新增任务</el-menu-item>
      <el-menu-item index="3">镜像包库</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.$router.push("/");
      } else if (key == 2) {
        this.$router.push("/addjob");
      }else if (key == 3) {
        this.$router.push("/package");
      }
      console.log(key, keyPath);
    }
  }
};
</script>