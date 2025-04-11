<script setup>
import {useCurrencyStore} from "@/stores/currencyStore.js";
import Select from "@/components/Select.vue";

const store = useCurrencyStore()

</script>


<template>
		<header class="header">
				<div class="container">
						<nav class="header__nav">
								<RouterLink to="/" class="header__link">Главная</RouterLink>
								<RouterLink to="/convert" class="header__link">Конвертация</RouterLink>
						</nav>
						<div class="header__select-wrap">
								<Select
												v-model="store.baseCurrency"
								/>
						</div>
				</div>

		</header>
</template>


