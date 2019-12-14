<template>
  <div class="h-full flex flex-col justify-center items-center">
    <div
      v-if="alert"
      class="w-full max-w-xs bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4"
      role="alert"
    >
      <p class="font-bold">Error</p>
      <p>{{ alert }}</p>
    </div>
    <div class="w-full max-w-xs">
      <form v-on:submit.prevent="signUp" class="bg-white shadow-md rounded px-6 pt-6 pb-8">
        <h1 class="text-2xl font-bold pb-3">Sign Up</h1>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            required
            placeholder="Email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            required
            placeholder="***************"
          />
        </div>
        <div class="flex items-center justify-between">
          <a
            href="login"
            class="inline-block text-blue-500 font-semibold py-2 px-2 focus:text-blue-700"
          >Login</a>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component
export default class SignUp extends Vue {
  @Model() private email = '';
  @Model() private password = '';
  private alert = '';

  private async signUp() {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password);
      this.$router.push('/');
    } catch (e) {
      this.alert = e.message;
    }
  }
}
</script>
