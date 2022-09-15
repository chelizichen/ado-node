<template>
<div>
  <div>Vue App {{state.msg}}</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
</div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from 'vue'
onMounted(()=>{
  console.log("123")
})
const state =reactive({
  msg:"hello world vue"
})
</script>

<style>

</style>