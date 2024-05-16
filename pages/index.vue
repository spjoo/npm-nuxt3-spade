<template>
	<div class="container">
		<div ref="boxRef" class="range_box">
			<input v-model="sliderValue" type="range" readonly />
			<div ref="tipRef" class="tooltip" :style="{ left: inputValue }">
				<p>{{ commas(sliderValue * 1000) }}원</p>
				<span class="arrow" :style="{ left: arrowValue === null ? '50%' : arrowValue }"></span>
			</div>
		</div>
		<div class="btn">
			<button @click="updateValue(0)">0원</button>
			<button @click="updateValue(1000)">1,000원</button>
			<button @click="updateValue(2000)">2,000원</button>
			<button @click="updateValue(3000)">3,000원</button>
			<button @click="updateValue(5000)">5,000원</button>
			<button @click="updateValue(10000)">10,000원</button>
			<button @click="updateValue(50000)">50,000원</button>
			<button @click="updateValue(90000)">90,000원</button>
			<button @click="updateValue(95000)">95,000원</button>
			<button @click="updateValue(100000)">100,000원</button>
		</div>
	</div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';

export default {
	setup() {
		const maxAmount = 100000; // 최대 금액
		const sliderValue = ref(0); // input 값
		const boxRef = ref(null);
		const boxWidth = ref(0);
		const tipRef = ref(null);
		const tipWidth = ref(0);

		//숫자 3자리수 콤마 코드
		function commas(x) {
			try {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			} catch (e) {
				return '0';
			}
		}
		// 요소넓이 계산
		function measureMaxWidth() {
			nextTick(() => {
				if (boxRef.value) {
					boxWidth.value = boxRef.value.offsetWidth;
				}
				if (tipRef.value) {
					tipWidth.value = tipRef.value.offsetWidth;
				}
			});
		}
		// 금액 백분율 계산
		const sliderValuePercentage = e => {
			return (e / maxAmount) * 100;
		};
		// 금액변경 버튼
		function updateValue(value) {
			sliderValue.value = sliderValuePercentage(value);
			measureMaxWidth();
		}
		// 툴팁 이동값 계산
		const inputValue = computed(() => {
			const valueWidth = (sliderValue.value / 100) * boxWidth.value;
			const tipHalf = tipWidth.value / 2;
			const result =
				valueWidth > boxWidth.value - tipHalf
					? `${boxWidth.value - tipWidth.value}px`
					: `${valueWidth - tipHalf <= 0 ? 0 : valueWidth - tipHalf}px`;
			return result;
		});
		// 툴팁 화살표 이동값 계산
		const arrowValue = computed(() => {
			// 툴팁절반 tipHalf
			const valueWidth = (sliderValue.value / 100) * boxWidth.value;
			const tipHalf = tipWidth.value / 2;
			let result = null;
			// 요건의 6px + 화살표 넓이 6px = 12px
			if (valueWidth - tipHalf <= 0) {
				console.log('왼쪽끝');
				result =
					tipHalf - 12 < tipHalf - valueWidth
						? `calc(50% - ${Math.floor(tipHalf - 12)}px)`
						: `calc(50% - ${Math.floor(tipHalf - valueWidth)}px)`;
			} else if (valueWidth > boxWidth.value - tipHalf) {
				console.log('오른쪽끝');
				result =
					Math.abs(boxWidth.value - tipHalf - valueWidth) < tipHalf - 12
						? `calc(50% + ${Math.floor(Math.abs(boxWidth.value - tipHalf - valueWidth))}px)`
						: `calc(50% + ${Math.floor(tipHalf - 12)}px)`;
			} else {
				result = null;
			}
			return result;
		});

		onMounted(() => {
			measureMaxWidth();
			window.addEventListener('resize', measureMaxWidth);
		});

		onBeforeUnmount(() => {
			window.removeEventListener('resize', measureMaxWidth);
		});

		return {
			sliderValue,
			updateValue,
			commas,
			inputValue,
			arrowValue,
			boxRef,
			boxWidth,
			tipRef,
			tipWidth,
			sliderValuePercentage,
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
	width: 100%;
	padding-top: 50px;
	margin: 0 auto 20px;
}
input[type='range'] {
	display: block;
	width: 100%;
	height: 15px;
	margin: 0;
	overflow: hidden;
	background-color: #dfdfdf;
	border-radius: 10px;
	pointer-events: none;
	-webkit-appearance: none;
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
	box-shadow: -100vw 0 0 100vw #097cff;
	-webkit-appearance: none;
}
.tooltip {
	position: absolute;
	top: 22px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
}
.tooltip p {
	padding: 2px 16px;
	min-width: 18px;
	font-size: 13px;
	background: #333;
	color: #fff;
	border-radius: 5px;
	white-space: nowrap;
	margin: 0;
}
.arrow {
	display: block;
	position: absolute;
	top: 19px;
	left: 50%;
	transform: translateX(-50%);
	border-top: 6px solid #333;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-bottom: 0px solid transparent;
}
.btn {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}
.btn button {
	background: #efefef;
	border: 1px solid #dfdfdf;
	padding: 3px 10px;
	color: #4b4b4b;
	border-radius: 5px;
}
.btn button:active {
	background: #d5d5d5;
}
</style>
