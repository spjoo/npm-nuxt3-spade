<script setup>
defineProps({
	isBottomSheet: Boolean,
});
defineEmits(['bottomSheetState']);
</script>

<template>
	<Transition :duration="550" name="slide-fade">
		<div v-if="isBottomSheet" class="bottom_sheet">
			<div class="bottom_sheet_wrap">
				<div class="bottom_sheet_bar"></div>
				<div class="bottom_sheet_inner">
					<slot></slot>
				</div>
				<div class="btn_area">
					<button @click="$emit('bottomSheetState')">확인</button>
				</div>
			</div>
			<div class="dim" @click="$emit('bottomSheetState')"></div>
		</div>
	</Transition>
</template>

<style scoped>
/*바텀시트*/
.bottom_sheet {
	position: fixed;
	inset: 0;
	width: 100%;
	height: 100vh;
	z-index: 100;
}
.bottom_sheet_wrap {
	position: absolute;
	bottom: 0;
	width: 100%;
	max-height: 85vh;
	min-height: 50vh;
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
	max-height: calc(80vh - 10rem);
	min-height: calc(50vh - 12rem);
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
	cursor: pointer;
}
.dim {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 100;
}

/* 위에서 올라오는 동작 ON */
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.4s ease-in-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
	opacity: 0;
}
.slide-fade-enter-active .bottom_sheet_wrap,
.slide-fade-leave-active .bottom_sheet_wrap {
	transition: all 0.4s ease-in-out;
}
.slide-fade-enter-from .bottom_sheet_wrap,
.slide-fade-leave-to .bottom_sheet_wrap {
	transform: translateY(50%);
	opacity: 0;
}
</style>
