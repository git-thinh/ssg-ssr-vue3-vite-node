<template>
  <h1>Test</h1>
  <hr>
  <Runtime :name="'iotTest'" />
  <hr>
  <component v-for="c in coms" :is="c"></component>
</template>

<script setup>
  import {
    defineAsyncComponent
  } from 'vue'
  import Runtime from '@/runtime'

  function loadTest(file) {
    return defineAsyncComponent(() => import(`../Test/${file}.vue`))
  }
  const coms = [loadTest('Header'), loadTest('Test01'), loadTest('Test02')];
</script>

<style scoped>
  h1,
  a {
    color: green;
  }
</style>
