<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "closeSheet"]);

const closeSheet = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <teleport to="body">
    <div class="sheet-area" v-if="modelValue">
      <div class="sheet-head">
        <button class="close-btn" @click="closeSheet">
          <span class="is_blind">닫기</span>
        </button>
      </div>
      <div class="sheet-body">
        <slot name="contents"></slot>
      </div>
      <div class="sheet-foot">
        <button class="confirm-btn" @click="closeSheet">확인</button>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.sheet-area {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 3px 3px 3px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px 15px 0 0;
}
.sheet-head {
  padding: 20px;
  .close-btn {
    position: relative;
    width: 20px;
    height: 20px;
    background: transparent;
    border: 0;
    margin-left: auto;
    margin-right: 0;
    display: block;
    &::after,
    &::before {
      content: "";
      display: block;
      width: 24px;
      height: 1px;
      position: absolute;
      top: 50%;
      left: 50%;
      background: #000;
    }
    &::after {
      transform: translate(-50%, -50%) rotate(-135deg);
    }
    &::before {
      transform: translate(-50%, -50%) rotate(135deg);
    }
  }
}
.sheet-body {
  padding: 50px 20px 0;
}
.sheet-foot {
  padding: 20px;
  .confirm-btn {
    background: royalblue;
    color: #fff;
    width: 100%;
    height: 60px;
    border-radius: 10px;
  }
}
</style>
