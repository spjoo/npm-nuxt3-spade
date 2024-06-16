[6월 1주차 과제]

1. 위 네가지 모양의 티켓을 만든다.
2. 티켓의 상단 부분에는 로고와 티켓에 관련된 텍스트를 기재한다
   ex) 50% 할인

3. 1번과 3번
   a. 티켓의 하단 부분에 버튼을 배치한다.

- 버튼은 토글 기능을 통해 다운로드<->완료로 변환 가능하게 한다.
- 해당 영역은 가로가 가변적이며 최소 80px을 가진다.
  b. 전체 가로는 가변적이며, 세로는 고정 400px이다.

4. 2번과 4번
   a. 티켓의 하단 부분에 티켓 번호/유효기간 등의 텍스트를 기재한다.

- 해당 영역은 세로가 가변적이며 최소 80px을 가진다.
  b. 가로는 가변적이며, 세로는 상단 고정 400px이다.

5. 중간 점선(절취선)과 그림자까지 구현한다.

- 과제 기한: 06.14(금) 출근 전까지
- 브렌치명: 이름/ticket

<script setup>
const shape = reactive({
  heart: {
    path: "M 200,350 C -200,90 200,-100 200,150 C  200,-100 600,90 200,350 Z",
  },
  diamond: {
    path: "M 30,200 L 200,100 L 370,200 L 200,300 Z",
  },
  spade: {
    path: "M 150,400 L 250,400 L 200,300 Z M 200,300 C 200,300 500,400 200,50 Z M 200,300 C 200,300 -100,400 200,50 Z",
  },
  clover: {
    path: "M 150,400 L 250,400 L 200,200 Z M 120 250 m -50, 0 a 50,50 0 1,0 150,0 a 50,50 0 1,0 -150,0 Z M 220 250 m -50, 0 a 50,50 0 1,0 150,0 a 50,50 0 1,0 -150,0 Z M 170 160 m -50, 0 a 50,50 0 1,0 150,0 a 50,50 0 1,0 -150,0",
  },
  customShape1: {
    path: "M 50,50 L 250, 50 S 240,100 300, 90 L 300 300 L 100,300 S 100,240 50,280 L 50 280 Z ",
  },
  customShape2: {
    path: "M 50,50 L 250, 50 L 300,90 L 300 300 L 100,300  L 50 280 Z ",
  },
});

const currentShape = ref("customShape2");

const changeShapeHandler = (keyValue) => (currentShape.value = keyValue);
</script>

<template>
  <!-- 하트, 클로버, 스페이드, 다이아몬드 + 이미지의 두 모양의 버튼을 만든다. -->
  <section class="svg-wrap">
    <svg xmlns="http://www.w3.org/2000/svg">
      <!-- 클리핑 모양 표시 border -->
      <g style="filter: drop-shadow(-20px 15px 2px black)">
        <path :d="shape[currentShape].path" fill="black" stroke-width="2" />
      </g>
      <defs>
        <clipPath id="clip_shape">
          <!-- 클리핑 -->
          <path :d="shape[currentShape].path" />
        </clipPath>
      </defs>
      <!-- 클리핑을 적용할 이미지 -->
      <image href="/img/sss.jpg" width="100%" style="clip-path: url(#clip_shape)" />
      <p>test</p>
    </svg>
  </section>

  <section class="buttons-wrap">
    <button v-for="(item, index) in shape" :key="index" type="button" @click="changeShapeHandler(index)">{{ index }}</button>
  </section>
</template>

<style scoped>
svg {
  border: 1px solid blue;
}
.svg-wrap {
  width: 200px;
  height: 500px;
  border: 1px solid red;
}
</style>
