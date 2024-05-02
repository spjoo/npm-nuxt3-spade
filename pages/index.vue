<script setup>
import { ref, onMounted, computed } from "vue";

const NumBtn = ref([1000, 5000, 10000, 20000, 50000, 70000, 100000]);
const progressNum = ref(0);
const maxNum = ref(100000);
const positionX = ref(0);
const width = ref(0);
const X = ref("");
const pocketMsg = ref(null);
onMounted(() => {
  pocketMsg.value = document.querySelector(".pocket-msg");
});
function increment(item) {
  progressNum.value = item;
  positionX.value = (item / maxNum.value) * 100;
  width.value = pocketMsg.value.clientWidth / 2;
  X.value = `calc(${positionX.value}% - ${width.value}px)`;
  console.log(positionX.value);
}
const leftPosition = computed(() => {
  return positionX.value;
});
</script>

<template>
  <div class="box">
    <h2>야근땜에 대충 풀었어요... 죄송합니다...</h2>
    <div class="btn-wrap">
      <button v-for="(item, i) in NumBtn" :key="i" @click="increment(item)">
        {{ item }}
      </button>
    </div>
    <div class="progress-wrap">
      <span
        class="pocket-msg"
        :class="{ start: leftPosition < 10, end: leftPosition > 90 }"
        :style="{
          left:
            leftPosition < 10
              ? '0'
              : leftPosition > 90
              ? 'calc(100% - 90px)'
              : X,
        }"
        >{{ progressNum }}</span
      >
      <progress :value="progressNum" :max="maxNum"></progress>
    </div>
  </div>
</template>
<style scoped>
.box {
  margin: 0 auto;
  max-width: 500px;
  border: 1px solid #000;
  padding: 30px;
}
.btn-wrap {
  display: flex;
  gap: 10px;
  margin-bottom: 50px;
}
.btn-wrap button {
  border: 1px solid #444;
  border-radius: 50px;
  padding: 5px 10px;
  background: #fff;
}
.progress-wrap {
  position: relative;
}
.pocket-msg {
  padding: 0 5px;
  line-height: 1.5;
  min-width: 80px;
  text-align: center;
  background: royalblue;
  color: #fff;
  display: inline-block;
  border-radius: 50px;
  position: absolute;
  top: -30px;
}
.pocket-msg::after {
  content: "";
  display: block;
  position: absolute;
  left: calc(50% - 5px);
  bottom: -10px;
  width: 0;
  height: 0;
  border-top: 7px solid royalblue;
  border-right: 7px solid transparent;
  border-left: 7px solid transparent;
  transform: translateY(-50%);
}
.pocket-msg.start::after {
  left: auto;
  right: calc(100% - 30px);
}
.pocket-msg.end::after {
  left: calc(100% - 30px);
}
progress {
  appearance: none;
  border-radius: 50px;
  height: 50px;
  width: 500px;
  overflow: hidden;
}
progress::-webkit-progress-bar {
  background: #ddd;
  border-radius: 50px;
}

progress::-webkit-progress-value {
  background: dodgerblue;
  border-radius: 50px;
}
</style>
