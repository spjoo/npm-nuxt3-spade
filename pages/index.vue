<script setup>
import Modal from "../components/util/Modal.vue";
import { ref, inject } from "vue";
const MAX_VALUE = 100000;
const BTNS_VALUE = [{ b_val: 0 }, { b_val: 1000 }, { b_val: 5000 }, { b_val: 10000 }, { b_val: 50000 }, { b_val: 90000 }, { b_val: 95000 }, { b_val: MAX_VALUE }];

const btnValue = ref(0); // button value
const toolBox = ref(null); // ToolBox ref
const progressWrap = ref(null); // progress ref
const pointer = ref(null); // pointer ref
const open = ref(false);

// inject
const { modalState, updateModal } = inject("modalState");

/**
 *
 * @param {*} value get number value
 * transform number Add comma
 */
const comma = (value) => new Intl.NumberFormat("ko", { currency: "KRW" }).format(value);

/**
 *
 * @param {*} event get units
 */
const unitFormat = (e) => {
  const numberUnits = ["", "", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  const tenUnits = ["", "십", "백", "천", "만"];
  const thousandUnits = ["", "만", "억", "조", "경", "해"];
  // 배열로 변환
  function chunkAtEnd(value, n) {
    const result = [];
    for (let end = value.length; end > 0; end -= n) {
      result.push(value.substring(Math.max(0, end - n), end));
    }
    return result;
  }
  return chunkAtEnd(String(e), 4)
    .reduce((acc, item, index) => {
      if (!Number(item)) {
        return acc;
      }
      let numberUnit = "";
      const zeroNum = item.padStart(4, "0"); //4자리로 치환
      for (let i = 0; i < tenUnits.length; i++) {
        const number = Number(zeroNum[i]);
        if (number) {
          const unit = tenUnits[3 - i];
          numberUnit += `${unit && number === 1 ? "" : numberUnits[number]}${unit}`;
        }
      }
      const thousandUnit = thousandUnits[index] ?? "";
      return `${numberUnit + thousandUnit} ${acc}`;
    }, "")
    .trim();
};
/**
 *
 * @param {*} e get button value
 */
const onClickBtn = (event) => (btnValue.value = event.b_val);

/**
 * transform value to % in progress value
 */
const progressVal = () => (btnValue.value / MAX_VALUE) * 100;

/**
 * set position 'toolbox' And 'toolbox pointer'
 */
const toolPosX = () => {
  const GUIDE_VALUE = 6;
  // const GUIDE_VALUE = 1;
  let ProWid = progressWrap?.value?.clientWidth; //dynamic progress-wrap width value
  let Tool = toolBox?.value; // tool-box ref
  let ToolWid = Tool?.clientWidth; // dynamic tool-box width value
  let Pointer = pointer?.value; // pointer ref
  let PointerWid = Pointer?.clientWidth; //dynamic pointer width value
  let proVal = progressVal(); // dynamic progress value
  let posX = ProWid * (proVal / 100); // dynamic progress value x

  if (posX < ToolWid / 2) {
    // 1 - detect left side
    Tool.style.transform = `translateX(0px)`;
    if (posX < PointerWid / 2 + GUIDE_VALUE) {
      Pointer.style.transform = `translateX(${GUIDE_VALUE}px)`;
    } else {
      Pointer.style.transform = `translateX(${posX - PointerWid / 2}px)`;
    }
  } else if (ProWid < posX + ToolWid / 2) {
    // 2 - detect right side
    Tool.style.transform = `translateX(${ProWid - ToolWid}px)`;
    if (ProWid < posX + PointerWid) {
      Pointer.style.transform = `translateX(${ProWid - PointerWid - GUIDE_VALUE}px)`;
    } else {
      Pointer.style.transform = `translateX(${posX - PointerWid / 2}px)`;
    }
  } else {
    // 3 - detect Normal
    Tool.style.transform = `translateX(${posX - ToolWid / 2}px)`;
    Pointer.style.transform = `translateX(${posX - PointerWid / 2}px)`;
  }
};

onMounted(() => {
  window.addEventListener("resize", toolPosX);
  toolPosX();

  setTimeout(() => {
    updateLocation();
  }, 2000);
});
onBeforeUnmount(() => window.removeEventListener("resize", toolPosX));
onUpdated(() => toolPosX());
</script>

<template>
  <div class="container">
    <h2>{{ modalState }}</h2>
    <button @click="updateModal('on')">zz</button>
    <button @click="updateModal('off')">zz</button>
    <h1 style="text-align: center">Tool Tip</h1>
    <button @click="open = true">Open Modal</button>

    <div class="button-wrap">
      <h3>buttons</h3>
      <button class="button" @click="onClickBtn(btn)" v-for="(btn, idx) in BTNS_VALUE" type="button" :key="idx">{{ btn.b_val !== 0 ? unitFormat(btn.b_val) + "원" : "0원" }}</button>
    </div>
    <div class="progress-wrap">
      <div class="progress-inner">
        <span ref="toolBox" class="tool-box">{{ comma(btnValue) + "원" }}</span>
        <div ref="pointer" class="pointer"></div>
        <progress ref="progressWrap" class="progress" :value="progressVal()" max="100"></progress>
      </div>
    </div>
  </div>

  <Modal />
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  padding: 0;
  margin: 0;
  border: 3px solid red;
  padding: 0 30px;
}
.progress {
  width: 100%;
  transition: 0.3s;
}
.button-wrap {
  margin-block: 20px;
}
.button {
  padding: 0 10px;
  margin: 0 10px 10px 0;
}
.button:last-of-type {
  margin: 0;
}
.tool-box {
  display: inline-block;
  /* border: 1px solid orange; */
  background: blue;
  padding: 0 16px;
  transform: translateX(0);
  transition: 0.3s;
}
.pointer {
  display: block;
  background: none;
  width: 10px;
  height: 10px;
  position: relative;
  transition: 0.3s;
}
.pointer::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  top: 0;
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
  border-left: 10px solid skyblue;
  transform: rotateZ(90deg);
}
</style>
