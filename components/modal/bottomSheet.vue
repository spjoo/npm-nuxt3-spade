<script setup>
defineProps(['bottomSheetState']);
defineEmits(['bottomSheetState']);
</script>

<template>
	<teleport to="#main">
		<section></section>
	</teleport>
</template>

<style scoped>
/*바텀시트 스타일*/
section {
	position: fixed;
	inset: 0;
	width: 100%;
	height: 100dvh;
	z-index: 100;
}
.bottom_sheet_wrap {
	position: absolute;
	bottom: 0;
	width: 100%;
	max-height: 80%;
	min-height: 50%;
	border-radius: 2rem 2rem 0 0;
	background: #fff;
	z-index: 101;
}
.bottom_sheet_bar {
	padding: 1rem;
	position: relative;
}
.bottom_sheet_bar:before {
	content: '';
	width: 2rem;
	height: 0.2rem;
	background: #ccc;
	position: absolute;
	left: 50%;
	top: 50%;
	border-radius: 0.2rem;
	transform: translate(-50%, -50%);
}
.bottom_sheet_inner {
	padding: 2rem;
	max-height: 25rem;
	min-height: 11.5rem;
	overflow-y: auto;
}
.btn_area {
	padding: 1.5rem 2rem;
}
.btn_area button {
	width: 100%;
	border: none;
	font-size: 1rem;
	color: #333;
	padding: 1rem;
	border-radius: 0.5rem;
}
.dim {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 100;
}
/*프로그레스바 스타일*/
.progress_area {
	position: relative;
	margin-top: 50px;
}
.progress_area progress {
	width: 100%;
	height: 16px;
	appearance: none;
}
.progress_area progress::-webkit-progress-bar {
	overflow: hidden;
	background: #f0f0f0;
	border: 0 none;
	border-radius: 12px;
}
.progress_area progress::-webkit-progress-value {
	background: #43f15e;
	border-radius: 12px;
	transition: all 0.3s;
}
.progress_area .tooltip {
	display: flex;
	position: absolute;
	bottom: 100%;
	align-items: center;
	justify-content: center;
	margin-top: 0;
	margin-bottom: 10px;
	padding: 6px 8px;
	background: #000;
	border-radius: 4px;
	color: #fff;
	font-size: 13px;
	line-height: 1;
	white-space: nowrap;
	opacity: 0;
	transform: translateX(-50%);
}
.progress_area .tooltip.on {
	opacity: 1;
	transition: opacity 0.3s;
}
.progress_area .tooltip::before {
	display: block;
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: v-bind(-pointPos + 'px');
	transform: translateX(-50%);
	border-top: 6px solid #000;
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
}
.progress_area span {
	display: block;
	margin: 4px 0;
	color: #787878;
	font-size: 13px;
	text-align: right;
}
</style>
