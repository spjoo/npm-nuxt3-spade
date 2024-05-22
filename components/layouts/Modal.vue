<template>
	<teleport to="body">
		<div class="modal">
			<div class="blank" @click="$emit('close')"></div>
			<div class="modal-content">
				<slot></slot>
				<button @click="$emit('close')">Close</button>
			</div>
		</div>
	</teleport>
</template>

<script>
export default {};
</script>

<style scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-end;
}
.blank {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
	width: 100vw;
	padding: 50px 20px;
	background-color: white;
	padding: 20px;
	border-radius: 5px;
}
</style>
