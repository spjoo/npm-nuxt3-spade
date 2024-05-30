<template>
  <!-- 하트, 클로버, 스페이드, 다이아몬드 + 이미지의 두 모양의 버튼을 만든다. -->
  <section class="svg-wrap">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <!-- 클리핑 모양 표시 border -->
      <g style="filter: drop-shadow(-10px 9px 2px black)">
        <path
          d="M 200,20
               L 250,140
               L 390,140
               L 270,220
               L 310,350
               L 200,270
               L 90,350
               L 130,220
               L 10,140
               L 150,140 Z"
          fill="none"
          stroke="red"
          stroke-width="3"
        />
      </g>
      <defs>
        <clipPath id="clip_shape">
          <!-- 클리핑 -->
          <path
            d="M 200,20
                 L 250,140
                 L 390,140
                 L 270,220
                 L 310,350
                 L 200,270
                 L 90,350
                 L 130,220
                 L 10,140
                 L 150,140 Z"
          />
        </clipPath>
      </defs>
      <!-- 클리핑을 적용할 이미지 -->
      <image href="/img/sss.jpg" width="100%" style="clip-path: url(#clip_shape)" />
    </svg>
    <path
      d="M 50,10 
           A 40,40 0 0,1 90,50 
           A 40,40 0 0,1 50,90 
           A 40,40 0 0,1 10,50 
           A 40,40 0 0,1 50,10 
           Z"
      fill="red"
    />
  </section>

  <section class="buttons-wrap">
    <button type="button">별</button>
  </section>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
svg {
  width: 200px;
  height: 200px;
}
</style>
