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
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
