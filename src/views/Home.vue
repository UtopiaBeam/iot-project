<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <button
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click="logout"
    >Logout</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Component
export default class Home extends Vue {
  private database = firebase.database();
  private async logout() {
    await firebase.auth().signOut();
    this.$router.replace('login');
  }
}
</script>
