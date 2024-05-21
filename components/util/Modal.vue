<script setup>
import { ref, inject } from "vue";

// inject
const { modalState, updateModal } = inject("modalState");
</script>
<template v-if="modalState">
  <div class="teleport-container">
    <Teleport to="body" v-if="modalState">
      <p>ss??</p>
      <button @click="updateModal('off')">Close</button>
    </Teleport>
  </div>
</template>
<style></style>
