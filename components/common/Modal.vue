<script setup>
import { ref, inject } from "vue";

// inject
const { modalState, updateModal } = inject("modalState");
const modalRef = ref(null);

const test = ref(false);
const onClickModal = (e) => {
  if (e.target === modalRef?.value) updateModal("off");
};
</script>
<template>
  <Teleport to="body" v-if="modalState">
    <div class="teleport-container" ref="modalRef" @click="onClickModal">
      <div class="inner" :class="modalState && 'on'">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
<style>
.teleport-container {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.inner {
  width: 100%;
  height: 200px;
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(100%);
}
.inner.on {
  transform: translateY(0%);
}
</style>
