<script setup>
import Modal from "../components/common/Modal.vue";
import { ref, inject, onMounted, onBeforeUnmount, onUpdated, nextTick } from "vue";
const MAX_VALUE = 100000;
const BTNS_VALUE = [{ b_val: 0 }, { b_val: 1000 }, { b_val: 5000 }, { b_val: 10000 }, { b_val: 50000 }, { b_val: 90000 }, { b_val: 95000 }, { b_val: MAX_VALUE }];

const btnValue = ref(0); // button value
const inputValue = ref(""); // input value
const toolBox = ref(null); // ToolBox ref
const progressWrap = ref(null); // progress ref
const pointer = ref(null); // pointer ref

// inject
const { modalState, updateModal } = inject("modalState");

// computed
/**
 * get MaxValue
 */
const getMaxValue = computed(() => {
  const max = BTNS_VALUE.reduce((a, b) => Math.max(a, b.b_val), -Infinity);
  return max;
});
/**
 * get progressVal
 */
const progressVal = computed(() => {
  if (btnValue.value > getMaxValue.value) {
    return 100;
  } else {
    return (btnValue.value / MAX_VALUE) * 100;
  }
});

/**
 *
 * @param {*} value get number value
 * transform number Add comma
 */
const comma = (value) => new Intl.NumberFormat("ko", { currency: "KRW" }).format(value);

/**
 *
 * @param {*} btnValue get units
 */
const unitFormat = (btnValue) => {
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
  return chunkAtEnd(String(btnValue), 4)
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
 * @param {*} event get button value
 */
const onClickBtn = (event) => {
  updateModal("on");
  btnValue.value = event.b_val;
  nextTick(() => toolPosX()); // DOM 업데이트 후 toolPosX 실행
};

/**
 * set position 'toolbox' And 'toolbox pointer'
 */
const toolPosX = () => {
  const GUIDE_VALUE = 6;
  const ProWid = progressWrap?.value?.clientWidth; //dynamic progress-wrap width value
  const Tool = toolBox?.value; // tool-box ref
  const ToolWid = Tool?.clientWidth; // dynamic tool-box width value
  const Pointer = pointer?.value; // pointer ref
  const PointerWid = Pointer?.clientWidth; //dynamic pointer width value
  const posX = ProWid * (progressVal.value / 100); // dynamic progress value x

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

/**
 * insert input value to btnValue
 */
const handlerInput = () => {
  btnValue.value = inputValue.value;
  updateModal("on"); // open modal
  nextTick(() => toolPosX()); // launch after DOM update
};

/**
 *
 * @param {*} event get input value
 * @desc  check input value in string
 */
const onValidInput = (event) => {
  const value = event.target.value;
  const regex = /^[0-9]*$/;

  if (!regex.test(value)) {
    event.target.value = value.slice(0, -1);
    inputValue.value = event.target.value;
  } else {
    inputValue.value = value;
  }
};

onMounted(() => window.addEventListener("resize", toolPosX));
onBeforeUnmount(() => window.removeEventListener("resize", toolPosX));
</script>

<template>
  <div class="container">
    <h1 style="text-align: center">Tool Tip</h1>
    <button @click="updateModal('on')">Open Modal</button>
    <div class="button-wrap">
      <h3>buttons</h3>
      <button class="button" v-for="(btn, idx) in BTNS_VALUE" type="button" :key="idx" @click="onClickBtn(btn)">{{ btn.b_val !== 0 ? unitFormat(btn.b_val) + "원" : "0원" }}</button>
    </div>

    <div class="input-wrap">
      <label for="number-input">인풋</label>
      <input id="number-input" type="text" v-model="inputValue" @input="onValidInput" /><br />
      <button type="button" @click="handlerInput">확인</button>
    </div>
  </div>

  <Modal>
    <div class="progress-wrap">
      <div class="progress-inner">
        <span ref="toolBox" class="tool-box">{{ comma(btnValue) + "원" }}</span>
        <div ref="pointer" class="pointer"></div>
        <progress ref="progressWrap" class="progress" :value="progressVal" max="100"></progress>
      </div>
      <div class="guide-text">
        <span>{{ comma(getMaxValue) }}</span>
      </div>
    </div>
    <button @click="updateModal('off')">Close</button>
  </Modal>
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
.guide-text {
  text-align: right;
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
