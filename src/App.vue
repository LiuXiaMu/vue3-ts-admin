<template>
  <div id="app">
    <router-view />

  </div>
</template>
<script setup lang="ts">
// 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
const baseSize: number = 12;
const scale: number = document.documentElement.clientWidth / 375;
// 设置页面根节点字体大小
let fontSize: number = baseSize * Math.min(scale, 2);
document.documentElement.style.fontSize = fontSize + "px";
// 解决手机系统设置字体大小后,qq内置浏览器rem排版错乱问题
// getComputedStyle能获取被系统放大后的字体
let computed: any = window
  .getComputedStyle(document.getElementsByTagName("html")[0])
let computedFontSize: any = computed["font-size"].replace(/px/gi, "");
let multiple = fontSize / computedFontSize;
document.documentElement.style.fontSize = fontSize * multiple + "px";


</script>
<style>
@import url(../public/reset.css);

body {
  font-size: 100%;
}

#app {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
