<script setup>
import Select from "@/components/Select.vue";
</script>

<template>
		<div class="converter">
				<div class="converter__row">
						<input type="text" class="converter__input" placeholder="0.00" />
						<Select/>
				</div>
				<div class="converter__row">
						<input type="text" class="converter__input" placeholder="0.00" />
						<Select />
				</div>
				<div class="converter__error">
						Введите корректное число
				</div>
		</div>
</template>