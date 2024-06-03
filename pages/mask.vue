<script setup>
const shapeTypes = ref([
  "heart",
  "clover",
  "spade",
  "diamond",
  "other1",
  "other2",
]);
</script>
<template>
  <button type="button" v-for="(item, i) in shapeTypes" :key="i">
    {{ item }}
  </button>
  <div class="shapes-box">
    <div class="heart"></div>
    <div class="clover"></div>
    <div class="spade"></div>
    <div class="diamond"></div>
    <div class="other1"></div>
    <div class="other2"></div>
  </div>
</template>
<style scoped>
button {
  margin: 10px;
}
.shapes-box > div {
  margin: 20px;
  background: url(@/assets/images/cat.jpg) no-repeat center center/cover;
}
.heart {
  width: 150px;
  height: 150px;
  border-image: radial-gradient(transparent 69%, #fff 70%) 84.5% fill/100%;
  clip-path: polygon(0 0, 100% 0, 100% 41%, 50% 91%, 0 41%);
}
.clover {
  width: 150px;
  height: 150px;
  border-image: radial-gradient(transparent 69%, #fff 70%) 84.5% fill/100%;
}
.spade {
  width: 150px;
  height: 150px;
  border-image: radial-gradient(transparent 69%, #fff 70%) 84.5% fill/100%;
  clip-path: polygon(0 100%, 100% 100%, 100% 59%, 50% 9%, 0 59%);
}
.diamond {
  width: 150px;
  height: 150px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 35%, 50% 100%, 0 35%);
}
.other1 {
  width: 150px;
  height: 150px;
  clip-path: polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%);
}
.other2 {
  width: 150px;
  height: 150px;
}
</style>
