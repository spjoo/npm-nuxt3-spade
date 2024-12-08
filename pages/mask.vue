<script setup></script>
<template>
  <div class="shapes-box">
    <div class="heart"><img src="@/assets/images/cat.jpg" alt="" /></div>
    <div class="clover"><img src="@/assets/images/cat.jpg" alt="" /></div>
    <div class="spade"><img src="@/assets/images/cat.jpg" alt="" /></div>
    <div class="diamond"><img src="@/assets/images/cat.jpg" alt="" /></div>
    <div class="other1"><img src="@/assets/images/cat.jpg" alt="" /></div>
    <div class="other2"><img src="@/assets/images/cat.jpg" alt="" /></div>
  </div>
</template>
<style scoped>
button {
  margin: 10px;
}
.shapes-box > div {
  margin: 20px;
  filter: drop-shadow(0 0 10px hsl(349, 100%, 62%));
}
.shapes-box > div img {
  width: 150px;
  aspect-ratio: 1;
  object-fit: cover;
}
.heart img {
  -webkit-mask-box-image: radial-gradient(#000 69%, #0000 70%) 84.5%/50%;
  clip-path: polygon(-42% 0, 50% 91%, 142% 0);
}

.clover img {
  -webkit-mask-box-image: radial-gradient(#000 69%, #0000 70%) 84.5%/50%;
}

.spade img {
  -webkit-mask-box-image: radial-gradient(#000 69%, #0000 70%) 84.5% / 50%;
  clip-path: polygon(50% 9%, 100% 59%, 100% 100%, 0% 100%, 0 59%);
}
.diamond img {
  clip-path: polygon(25% 0%, 75% 0%, 100% 35%, 50% 100%, 0 35%);
}
.other1 img {
  clip-path: polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%);
}
.other2 img {
  mask-image: radial-gradient(circle at left top, transparent 10%, black 10%),
    radial-gradient(circle at right bottom, black 10%, transparent 10%);
  mask-composite: exclude, add;
}
</style>
