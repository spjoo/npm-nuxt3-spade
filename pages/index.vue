<script setup>
import { ref, watch } from "vue";
import BottomSheet from "../components/common/BottomSheet.vue";

const NumBtn = ref([0, 1000, 5000, 10000, 20000, 50000, 70000, 95000, 100000]);
const progressNum = ref(0);
const maxNum = ref(100000);
const positionX = ref(0);
const width = ref(0);
const progressWidth = ref(0);
const pocketMsgWidth = ref(0);
const X = ref("");
const pocketMsg = ref(null);
const progress = ref(null);
const isOpenSheet = ref(false);
const closeSheet = () => {
  isOpenSheet.value = false;
};

watch(isOpenSheet, async (newVal) => {
  if (newVal) {
    await nextTick();
    if (progress.value && pocketMsg.value) {
      progressWidth.value = progress.value.clientWidth;
      pocketMsgWidth.value = pocketMsg.value.clientWidth;
      width.value = pocketMsgWidth.value / 2;
      updatePositionX(progressNum.value);
    }
  }
});

function increment(item) {
  const parsedItem = parseFloat(item) || 0;
  progressNum.value = parsedItem;
  updatePositionX(parsedItem);
  limitCalculator();
}

function updatePositionX(item) {
  positionX.value = (item / maxNum.value) * 100;
  X.value = `calc(${positionX.value}% - ${width.value}px)`;
  console.log(positionX.value);
}

function limitCalculator() {
  if (
    progressWidth.value === 0 ||
    pocketMsgWidth.value === 0 ||
    !pocketMsg.value
  ) {
    // progressWidth, pocketMsgWidth, pocketMsg가 존재하지 않을 때 처리
    return;
  }

  const y = (progressNum.value / maxNum.value) * progressWidth.value; // 현재 게이지 width
  if (y < pocketMsgWidth.value) {
    pocketMsg.value.classList.add("start");
    pocketMsg.value.classList.remove("end");
    pocketMsg.value.style.left = "0";
    pocketMsg.value.style.right = "auto";
    console.log("적을때");
  } else if (y + pocketMsgWidth.value > progressWidth.value) {
    pocketMsg.value.classList.add("end");
    pocketMsg.value.classList.remove("start");
    pocketMsg.value.style.left = "auto";
    pocketMsg.value.style.right = "0";
    console.log("넘칠때");
  } else {
    pocketMsg.value.style.left = X.value;
    pocketMsg.value.style.right = "auto";
    pocketMsg.value.classList.remove("start");
    pocketMsg.value.classList.remove("end");
  }
}
</script>

<template>
  <div class="box">
    <div class="btn-wrap">
      <button v-for="(item, i) in NumBtn" :key="i" @click="increment(item)">
        {{ item }}
      </button>
    </div>
    <div class="input-wrap">
      <input type="text" @input="increment($event.target.value)" />
    </div>
    <button class="sheet-open-btn" @click="isOpenSheet = true">열기</button>
  </div>
  <BottomSheet v-model="isOpenSheet" @closeSheet="closeSheet">
    <template #contents>
      <div class="progress-wrap">
        <span ref="pocketMsg" class="pocket-msg">{{ progressNum }}</span>
        <progress ref="progress" :value="progressNum" :max="maxNum"></progress>
        <p class="price">{{ progressNum }}원</p>
      </div>
    </template>
  </BottomSheet>
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
  flex-wrap: wrap;
}
.btn-wrap button {
  border: 1px solid #444;
  border-radius: 50px;
  padding: 5px 10px;
  background: #fff;
}
input[type="text"] {
  border: 1px solid #333;
  padding: 10px;
  border-radius: 5px;
}
.sheet-open-btn {
  padding: 10px;
  background: #333;
  color: #fff;
  border-radius: 5px;
  margin-top: 10px;
}
.progress-wrap {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
}

.pocket-msg {
  padding: 0 10px;
  line-height: 1.5;
  min-width: 30px;
  text-align: center;
  background: royalblue;
  color: #fff;
  display: inline-block;
  border-radius: 50px;
  position: absolute;
  top: -30px;
  left: 0;
}
.pocket-msg::after {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 0;
  height: 0;
  border-top: 6px solid royalblue;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  transform: translateX(-50%);
}
.pocket-msg.start::after {
  left: 10px;
  transform: none;
}
.pocket-msg.end::after {
  left: auto;
  right: 10px;
  transform: none;
}
progress {
  appearance: none;
  border-radius: 50px;
  height: 50px;
  width: 100%;
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
.price {
  margin-top: 10px;
}
</style>
