<template>
  <div id="app">
    <!-- <headers/> -->
    <div style="margin:20px;border:1px solid #E4E7ED;padding:20px">
    <router-view/>
    </div>
  </div>
</template>

<script>
// import header from "@/components/header";

export default {
  name: "App",
  // props: {
  //   source: String
  // },
  components: {
    // headers: header
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
