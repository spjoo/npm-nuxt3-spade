<script setup>
import { ref, computed } from 'vue';
import PriceBottomSheet from '~/components/page/bottomsheet/PriceBottomSheet.vue';

const priceList = [0, 1000, 2000, 5000, 9000, 10000];
const currentPrice = ref(priceList[0]);
const price = ref(null);
const isShow = ref(false);
const setPrice = val => {
	currentPrice.value = val;
	isShow.value = true;
};
const maxPrice = computed(() => {
	return priceList[priceList.length - 1];
});
const handleInputPrice = () => {
	const setNum = Number(price.value);
	if (isNaN(setNum)) {
		alert('숫자를 입력해주세요.');
		price.value = null;
		return false;
	}
	setPrice(setNum);
};
</script>

<template>
	<main>
		<section class="control_wrap">
			<ul class="price_area">
				<li v-for="(price, i) in priceList" :key="i">
					<button @click="setPrice(price)">{{ price.toLocaleString() }}</button>
				</li>
			</ul>
			<form @submit.prevent="handleInputPrice">
				<input v-model="price" />
				<button>금액 적용</button>
			</form>
		</section>
		<PriceBottomSheet v-if="isShow" v-model="isShow" :current-price="currentPrice" :max-price="maxPrice" />
	</main>
</template>

<style scoped lang="scss">
.control_wrap {
	padding: 2rem;
}
.price_area {
	display: flex;
	flex-wrap: wrap;
	gap: 0.8rem;
	margin-bottom: 0.8rem;
	list-style: none;
	button {
		min-width: 100px;
		padding: 4px 8px;
		color: #555;
		border: 1px solid #ccc;
		background: #f0f0f0;
	}
}
</style>
