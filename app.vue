<script setup>
import { ref, provide } from "vue";

const modalState = ref(false);
const updateModal = (onOffState) => {
  if (onOffState === "on") modalState.value = true;
  if (onOffState === "off") modalState.value = false;
};
provide("modalState", {
  modalState,
  updateModal,
});
</script>
<template>
  <div class="container">
    <NuxtPage />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
html,
body,
#__nuxt,
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
