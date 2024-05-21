<script setup>
const props = defineProps(["open"]);
console.log(props.open.open);
</script>
<template>
  <Teleport to="body">
    <div v-if="props.open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="props.open.open = false">Close</button>
    </div>
  </Teleport>
</template>
<style></style>
