<template>
	<uni-popup v-bind="$attrs" ref="popupRef" @maskClick="$emit('mask-click')">
		<slot></slot>
	</uni-popup>
</template>

<script setup>
	import { ref, watch } from 'vue';
	
	const props = defineProps({
		show: {
			type: Boolean,
			default: () => false
		},
		position: {
			type: String,
			default: () => 'center'
		}
	});
	const popupRef = ref(null);
	watch(
		() => props.show,
		value => {
			if (value) {
				popupRef.value.open(props.position);
			} else {
				popupRef.value.close();
			}
		}
	)
</script>

<style lang="scss" scoped>

</style>