<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
	<button @click="open = true">모달 열기</button>
</template>

<style scoped>
.modal {
	position: fixed;
	z-index: 999;
	top: 20%;
	left: 50%;
	width: 300px;
	margin-left: -150px;
}
</style>
