<template>
  <div id="app" class="bg-gray-200 w-screen h-screen">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import '@/assets/css/tailwind.scss';
</style>
