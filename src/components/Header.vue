<script setup>
import { useCurrencyStore } from "@/stores/currencyStore.js";
import Select from "@/components/Select.vue";
import { RouterLink } from "vue-router";
import { useSelectDropdown } from "@/composables/useSelectDropdown.js";

const store = useCurrencyStore();
const { isDropdownOpen: isDropdownOpenHeader, toggleDropdown: toggleDropdownHeader } = useSelectDropdown(store.headerCurrency, false);

const setHeaderCurrency = (currency) => {
  store.setHeaderCurrency(currency);
};
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
												v-model="store.headerCurrency"
												:isOpen="isDropdownOpenHeader"
												@update:currencyValue="setHeaderCurrency"
												@update:modelValue="setHeaderCurrency"
												@update:isOpen="toggleDropdownHeader"
								/>
						</div>
				</div>
		</header>
</template>