<script setup>
import {onMounted} from "vue";
import {useCurrencyStore} from "@/stores/currencyStore.js";
import {useSelectDropdown} from "@/composables/useSelectDropdown.js";
import Select from "@/components/Select.vue";

const store = useCurrencyStore()


// первый дропдаун
const {
  selected: selectedFrom,
  isDropdownOpen: isDropdownOpenFrom,
  toggleDropdown: toggleDropdownFrom
} = useSelectDropdown(store.currencyFrom, false);

// второй дропдаун
const {
  selected: selectedTo,
  isDropdownOpen: isDropdownOpenTo,
  toggleDropdown: toggleDropdownTo
} = useSelectDropdown(store.currencyTo, false);

const setCurrencyFrom = (currency) => {
  store.setCurrencyFrom(currency);
};

const setCurrencyTo = (currency) => {
  store.setCurrencyTo(currency);
};

onMounted(() => store.fetchRates())


</script>

<template>
	<div>
			<div class="converter">
					<div
									v-if="!store.isRatesLoaded"
									class="loader">
							Загрузка курсов...
					</div>

					<form
									v-else
									class="converter__form">
							<div class="converter__row">
									<input
													v-model="store.amountFrom"
													@input="store.setAmountFrom"
													type="text"
													class="converter__input"
													placeholder="0.00"/>
									<Select
													v-model="store.currencyFrom"
													:isOpen="isDropdownOpenFrom"
													@update:modelValue="setCurrencyFrom"
													@update:isOpen="toggleDropdownFrom"
									/>
							</div>
							<div class="converter__row">
									<input
													v-model="store.amountTo"
													@input="store.setAmountTo"
													type="text"
													class="converter__input"
													placeholder="0.00"/>

									<Select
													v-model="store.currencyTo"
													:isOpen="isDropdownOpenTo"
													@update:modelValue="setCurrencyTo"
													@update:isOpen="toggleDropdownTo"
									/>
							</div>
							<div
											v-if="store.errorMessage"
											class="error-message">
									{{ store.errorMessage }}
							</div>
					</form>
			</div>
	</div>

</template>



















