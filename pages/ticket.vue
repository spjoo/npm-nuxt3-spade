<template>
  <div class="ticket-wrap">
    <div
      v-for="(item, i) in ticketLists"
      :key="`item${i}`"
      class="ticket"
      ref="tickets"
      :class="[item.align === 'horizontal' ? 'horizontal' : 'vertical']"
      :style="{
        clipPath:
          item.align === 'horizontal'
            ? getClipPath(i, getType(item.type), item.align)
            : getClipPath(i, getType(item.type), item.align),
      }"
    >
      <div ref="infoAreas" class="info-area">
        <div class="img"></div>
        <p>{{ item.text }}</p>
      </div>
      <div ref="btnAreas" class="btn-area">
        <button
          ref="downBtn"
          class="down-btn"
          @click="clickTicket(item)"
          :class="{ completion: item.completion }"
        >
          {{ item.completion ? "완료" : "다운로드" }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const ticketLists = ref([
  {
    text: "50% 할인",
    completion: false,
    type: "round",
    align: "horizontal",
  },
  {
    text: "50% 할인",
    completion: false,
    type: "corner",
    align: "horizontal",
  },
  {
    text: "50% 할인",
    completion: false,
    type: "round",
    align: "vertical",
  },
  {
    text: "50% 할인",
    completion: false,
    type: "corner",
    align: "vertical",
  },
]);
const downBtn = ref(null);
const btnAreas = ref([]);
const infoAreas = ref([]);
const infoWidth = ref([]);
const infoHeight = ref([]);
const clickTicket = (item) => {
  item.completion = true;
};
const getClipPath = (i, type, align) => {
  return align === "horizontal"
    ? `path(
    "M 0 0 L ${infoWidth.value[i] - 5} 0 ${type} ${infoWidth.value[i] - 5} 0 ${infoWidth.value[i]} 10 ${infoWidth.value[i] + 5} 0 L ${infoWidth.value[i] + 80} 0 L ${infoWidth.value[i] + 80} ${infoHeight.value[i]} L ${infoWidth.value[i] + 5} ${infoHeight.value[i]} ${type} ${infoWidth.value[i] + 5} ${infoHeight.value[i]} ${infoWidth.value[i]} ${infoHeight.value[i] - 10} ${infoWidth.value[i] - 5} ${infoHeight.value[i]} L 0 ${infoHeight.value[i]} Z"
  )`
    : `path(
    "M 0 0 L ${infoWidth.value[i]} 0 L ${infoWidth.value[i]} ${infoHeight.value[i] - 5} ${type} ${infoWidth.value[i]} ${infoHeight.value[i] - 5} ${infoWidth.value[i] - 10} ${infoHeight.value[i]} ${infoWidth.value[i]} ${infoHeight.value[i] + 5} L ${infoWidth.value[i]} ${infoHeight.value[i] + 150} L 0 ${infoHeight.value[i] + 150} L 0 ${infoHeight.value[i] + 5} ${type} 0 ${infoHeight.value[i] + 5} 10 ${infoHeight.value[i]} 0 ${infoHeight.value[i] - 5} Z"
  )`;
};
const updateSize = () => {
  infoWidth.value = infoAreas.value.map((infoArea) =>
    infoArea ? infoArea.clientWidth : 0
  );
  infoHeight.value = infoAreas.value.map((infoArea, index) =>
    infoArea ? infoArea.clientHeight : 0
  );
};
const getType = (type) => {
  switch (type) {
    case "round":
      return "C";
    default:
      return "L";
  }
};
onMounted(() => {
  updateSize();
  window.addEventListener("resize", updateSize);
});
watchEffect(() => {
  updateSize();
});
</script>
<style scope>
.ticket-wrap {
  margin: 0 20px;
  filter: drop-shadow(0px 0px 2px black);
}
.ticket {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 20px;
  border: 1px solid black;
  .info-area {
    box-sizing: border-box;
    p {
      font-size: 18px;
    }
  }
  .btn-area {
    position: relative;
    box-sizing: border-box;
    .button {
      background: skyblue;
      border: 1px solid blue;
      font-size: 15px;
      color: blue;
      &.completion {
        pointer-events: none;
        border-color: gray;
        background: lightgray;
        color: gray;
      }
    }
  }
}
.horizontal {
  width: 100%;
  height: 200px;
  .info-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 80px);
    padding: 6px;
    background: beige;
  }
  .btn-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80px;
    padding: 6px;
    background: rgb(214, 244, 78);
    &::after {
      display: block;
      content: "";
      position: absolute;
      top: 0;
      left: -1px;
      width: 2px;
      height: 100%;
      border-left: 2px dashed #000;
    }
  }
}
.vertical {
  width: 100%;
  flex-direction: column;
  .info-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 300px;
    padding: 6px;
    background: beige;
  }
  .btn-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 150px;
    padding: 6px;
    background: rgb(214, 244, 78);
    &::after {
      display: block;
      content: "";
      position: absolute;
      top: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      border-top: 2px dashed #000;
    }
  }
}
</style>
