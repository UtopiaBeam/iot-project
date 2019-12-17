<template>
  <div class="h-full flex flex-col justify-center items-center">
    <table class="table-fixed bg-white w-full max-w-lg my-4">
      <thead>
        <tr class="border">
          <th class="w-1/3 px-2 py-2">Name</th>
          <th class="w-1/3 px-2 py-2">Status</th>
          <th class="w-1/3 px-2 py-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(locker, index) of lockers" :key="index" class="border">
          <td class="w-1/3 px-2 py-2 text-center">{{ locker.name }}</td>
          <td class="w-1/3 px-2 py-2 text-center">{{ locker.isLocked ? 'Locked' : 'Unlocked' }}</td>
          <td class="w-1/3 px-2 py-2 text-center">
            <Button
              :id="locker.id"
              :isLocked="locker.isLocked"
              :index="index"
              v-on:toggled="toggle"
            />
          </td>
        </tr>
        <tr v-if="lockers.length === 0">
          <td colspan="3" class="w-full px-2 py-2 text-center text-gray-500 italic">No locker</td>
        </tr>
      </tbody>
    </table>
    <button
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click="logout"
    >Logout</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

interface Locker {
  id: string;
  name: string;
  isLocked: boolean;
  users: string[];
}

@Component({
  components: {
    Button,
  },
})
export default class Home extends Vue {
  private readonly db = firebase.firestore();
  private readonly loggerRef = this.db.collection('logger');
  private readonly lockerRef = this.db.collection('locker');
  private readonly user = firebase.auth().currentUser;
  private lockers: Locker[] = [];

  private async mounted() {
    const result = await this.lockerRef
      .where('users', 'array-contains', this.user!.uid)
      .get();
    result.forEach((doc) => {
      this.lockers.push({ id: doc.id, ...doc.data() } as Locker);
    });
  }

  private async toggle(id: string, isLocked: boolean, index: number) {
    await this.lockerRef.doc(id).update({ isLocked });
    await this.loggerRef.add({
      timestamps: Date.now(),
      user: this.user!.uid,
      action: isLocked ? 'lock' : 'unlock',
    });
    this.lockers[index].isLocked = isLocked;
  }

  private async logout() {
    await firebase.auth().signOut();
    this.$router.replace('login');
  }
}
</script>
