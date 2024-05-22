<template>
	<div class="container">
		<div class="btn">
			<button @click="handleClick(0)">0원</button>
			<button @click="handleClick(1000)">1,000원</button>
			<button @click="handleClick(5000)">5,000원</button>
			<button @click="handleClick(10000)">10,000원</button>
			<button @click="handleClick(50000)">50,000원</button>
			<button @click="handleClick(90000)">90,000원</button>
			<button @click="handleClick(95000)">95,000원</button>
			<button @click="handleClick(100000)">100,000원</button>
		</div>
		<ProgressbarModal v-if="showModal" :price="price" @close="showModal = false" />
	</div>
</template>

<script>
import { ref } from 'vue';
import ProgressbarModal from '~/components/bottomSheet/ProgressbarModal.vue';

export default {
	components: {
		ProgressbarModal,
	},
	setup() {
		const showModal = ref(false);
		const price = ref(0);

		const handleClick = value => {
			price.value = value;
			showModal.value = true;
		};

		return {
			showModal,
			price,
			handleClick,
		};
	},
};
</script>

<style scoped>
.container {
	width: 100%;
	padding: 20px 0;
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
