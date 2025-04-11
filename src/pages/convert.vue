<script setup>
import {watch, computed, ref} from "vue";
import {useCurrencyStore} from "@/stores/currencyStore.js";
import Select from "@/components/Select.vue";

const store = useCurrencyStore()



// активный дропдаун
const activeDropdown = ref(null)

// установка активного дропдауна
function setActiveDropdown(index) {
  // если текущий дропдаун уже активен, то закрываем его, иначе открываем
  activeDropdown.value = activeDropdown.value === index ? null : index;
}



</script>

<template>
		<div class="converter">
				<div class="converter__row">
						<input
										v-model="store.amountFrom"
										type="text"
										class="converter__input"
										placeholder="0.00" />

						<Select
										v-model="store.currencyFrom"
										:isOpen="activeDropdown === 0"
										@update:currencyValue="setActiveDropdown(0)"
										@update:isOpen="setActiveDropdown(0)"
						/>
				</div>
				<div class="converter__row">
						<input
										v-model="store.amountTo"
										type="text"
										class="converter__input"
										placeholder="0.00" />

						<Select
										v-model="store.currencyTo"
										:isOpen="activeDropdown === 1"
										@update:currencyValue="setActiveDropdown(1)"
										@update:isOpen="setActiveDropdown(1)"
						/>
				</div>
				<div class="converter__error">
						Введите корректное число
				</div>
		</div>
</template>


















