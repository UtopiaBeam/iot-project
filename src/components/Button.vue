<template>
  <button
    v-if="isLocked"
    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
    @click="toggle"
  >Unlock</button>
  <button
    v-else
    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
    @click="toggle"
  >Lock</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop(String) private id!: string;
  @Prop(Boolean) private isLocked!: boolean;
  @Prop(Number) private index!: number;

  private toggle() {
    this.isLocked = !this.isLocked;
    this.$emit('toggled', this.id, this.isLocked, this.index);
  }
}
</script>
