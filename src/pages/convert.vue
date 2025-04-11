<script setup>
import {watch, computed, ref} from "vue";
import {useCurrencyStore} from "@/stores/currencyStore.js";
import {useSelectDropdown} from "@/composables/useSelectDropdown.js";
import Select from "@/components/Select.vue";

const store = useCurrencyStore()


// первый дропдаун
const { selected: selectedFrom, isDropdownOpen: isDropdownOpenFrom, toggleDropdown: toggleDropdownFrom } = useSelectDropdown(store.currencyFrom, false);

// второй дропдаун
const { selected: selectedTo, isDropdownOpen: isDropdownOpenTo, toggleDropdown: toggleDropdownTo } = useSelectDropdown(store.currencyTo, false);

const setCurrencyFrom = (currency) => {
  store.setCurrencyFrom(currency);
};

const setCurrencyTo = (currency) => {
  store.setCurrencyTo(currency);
};

</script>

<template>
		<div class="converter">
				<div class="converter__row">
						<input
										v-model="store.amountFrom"

										type="number"
										class="converter__input"
										placeholder="0.00" />

						<Select
										v-model="store.currencyFrom"
										:isOpen="isDropdownOpenFrom"
										@update:currencyValue="setCurrencyFrom"
										@update:modelValue="setCurrencyFrom"
										@update:isOpen="toggleDropdownFrom"
						/>
				</div>
				<div class="converter__row">
						<input
										v-model="store.amountTo"
										@input="store.setAmountTo"
										type="number"
										class="converter__input"
										placeholder="0.00" />

						<Select
										v-model="store.currencyTo"
										:isOpen="isDropdownOpenTo"
										@update:currencyValue="setCurrencyTo"
										@update:modelValue="setCurrencyTo"
										@update:isOpen="toggleDropdownTo"
						/>
				</div>
				<div class="converter__error">
						Введите корректное число
				</div>
		</div>
</template>


















