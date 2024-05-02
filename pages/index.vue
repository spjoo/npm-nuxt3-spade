<template>
	<div class="container">
		<div ref="boxRef" class="range_box">
			<input v-model="sliderValue" type="range" @input="updateSlider" />
			<div ref="tipRef" class="tooltip" :style="{ left: inputValue }">
				<p>{{ sliderValue }}%</p>
				<span class="arrow" :style="{ left: arrowValue ? arrowValue : '50%' }"></span>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
	setup() {
		const sliderValue = ref(0);
		const boxRef = ref(0);
		const boxWidth = ref(0);
		const tipRef = ref(0);
		const tipWidth = ref(0);

		function updateSlider(event) {
			sliderValue.value = event.target.value;
		}
		function measureMaxWidth() {
			if (boxRef.value) {
				boxWidth.value = boxRef.value.offsetWidth;
			}
			if (tipRef.value) {
				tipWidth.value = tipRef.value.offsetWidth;
			}
		}
		onMounted(measureMaxWidth);
		// 퍼센트
		const inputValue = computed(() => {
			const valueWidth = (sliderValue.value / 100) * boxWidth.value;
			const tipHalf = tipWidth.value / 2;
			const result =
				valueWidth > boxWidth.value - tipHalf
					? boxWidth.value
					: `${valueWidth - tipHalf <= 0 ? 0 : valueWidth - tipHalf}px`;
			return result;
		});
		// 화살표
		const arrowValue = computed(() => {
			const valueWidth = (sliderValue.value / 100) * boxWidth.value;
			const tipHalf = tipWidth.value / 2;
			let result = null;
			if (valueWidth - tipHalf <= 0) {
				console.log('왼쪽끝');
				result = valueWidth - tipHalf < -6 ? 'calc(50% - 6px)' : `calc(50% - ${valueWidth - tipHalf})`;
			} else if (valueWidth > boxWidth.value - tipHalf) {
				console.log('오른쪽끝');
				result =
					boxWidth.value - tipHalf - valueWidth < -6
						? 'calc(50% + 6px)'
						: `calc(50% + ${boxWidth.value - tipHalf - valueWidth})`;
			}
			return result;
		});

		return {
			sliderValue,
			updateSlider,
			inputValue,
			arrowValue,
			boxRef,
			boxWidth,
			tipRef,
			tipWidth,
		};
	},
};
</script>

<style scoped>
.container {
	width: 100%;
	padding: 20px 0;
}
.range_box {
	position: relative;
	width: 500px;
	padding-top: 50px;
	margin: 0 auto;
}
input[type='range'] {
	display: block;
	width: 100%;
	height: 15px;
	overflow: hidden;
	-webkit-appearance: none;
	background-color: #dfdfdf;
	border-radius: 10px;
}

input[type='range']::-webkit-slider-runnable-track {
	height: 10px;
	color: #097cff;
	margin-top: -1px;
	-webkit-appearance: none;
}

input[type='range']::-webkit-slider-thumb {
	width: 0;
	height: 10px;
	cursor: ew-resize;
	background: #097cff;
	box-shadow: -500px 0 0 500px #097cff;
	-webkit-appearance: none;
}
.tooltip {
	position: absolute;
	top: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 17px;
	background: #333;
	color: #fff;
	border-radius: 5px;
}
.arrow {
	display: block;
	position: absolute;
	top: 17px;
	left: 50%;
	transform: translateX(-50%);
	border-top: 5px solid #333;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-bottom: 0px solid transparent;
}
.tooltip p {
	font-size: 11px;
}
</style>
