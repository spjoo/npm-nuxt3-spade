<!-- 
  1. clip path 방법
  2. svg https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMorphology
  3. ?
 -->
<template>
  <h1>mask</h1>
  <div class="poligon">
    <img class="" src="/img/sss.jpg" alt="" />
  </div>
</template>

<script setup>
console.log("1");
</script>

<style scoped>
h1 {
  font-size: 10px;
}

div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.image-container {
  width: 300px;
  height: 300px;
  position: relative;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  border: 15px solid transparent; /* 원하는 경계선 색상과 두께 */
}

.heart-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: inherit; /* 부모의 clip-path를 상속 */
}

.poligon {
  display: inline-block;
  position: relative;
  width: 150px;
  height: 150px;
  background: red;
  box-sizing: border-box;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  filter: drop-shadow(0 0 5px #000);
}
.poligon img {
  position: absolute;
  top: 2px; /* equal to border thickness */
  left: 2px; /* equal to border thickness */
  width: 146px; /* container height - (border thickness * 2) */
  height: 146px; /* container height - (border thickness * 2) */
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  filter: drop-shadow(0 0 5px #000);
}
</style>
