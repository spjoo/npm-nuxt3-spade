<script setup>
const shape = reactive({
  // path: "M 10,10 L 490,10 L 490,490 L 10,490 Z",
  path: `M 0,0 L 500,0 L500,300, L0,500 Z`,
});

const responsiveRef = ref(null);
const objTest = ref({});
onMounted(() => {
  nextTick(() => {
    calc();
    console.log("objTest", objTest.value);
  });

  window.addEventListener("resize", call());
});
const call = () => {
  console.log("ss");
};
const calc = () => {
  console.log("responsiveRef", responsiveRef);
  let width = responsiveRef?.value?.offsetWidth;
  let height = responsiveRef?.value?.offsetHeight;
  console.log("width", width);
  console.log("height", height);
  return (objTest.value = { width: width, height: height });
};
</script>

<template>
  <div class="wrap">
    <p>ticket</p>

    <section class="svg-wrap">
      <div class="left" ref="responsiveRef">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg">
          <g style="filter: drop-shadow(-20px 15px 2px black)">
            <path :d="`M 0,0 L ${objTest?.width},0 L ${objTest?.width},${objTest?.height} L 0,${objTest?.height} Z`" fill="black" stroke-width="2" />
          </g>
          <defs>
            <clipPath id="clip_shape">
              <path d="`M 0,0 L 500,0 L500,300, L0,500 Z`" />
            </clipPath>
          </defs>
          <!-- <image href="/img/sss.jpg" width="100%" style="clip-path: url(#clip_shape)" /> -->
        </svg>
        <div class="img_box">이미지영역</div>
      </div>
      <div class="right">2</div>
    </section>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}
body {
  border: 20px solid green;
}
p {
  margin: 0;
}
.wrap {
  background: blue;
}

.svg {
  flex: 1;
  width: 100%;
  height: 100%;
  border: 5px solid red;
}
.left {
  position: relative;
  flex: 1;
  background: orange;
}

.right {
  flex: 1;
  background: green;
}
.img_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 100px;
  background: powderblue;
}
.svg-wrap {
  display: flex;
  width: 100%;
  height: 300px;
  border: 1px solid black;
}
</style>
