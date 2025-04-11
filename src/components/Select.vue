<script setup>
import { computed, ref } from "vue";
import { useCurrencyStore } from "@/stores/currencyStore.js";
import { useClickOutside } from "@/directives/clickOutside.js";

const props = defineProps({
  modelValue: String,
  isOpen: Boolean,
  index: Number,
});

const store = useCurrencyStore();
const emit = defineEmits(['update:currencyValue', 'update:isOpen', 'update:modelValue']);

// меняем выбранную валюту
const selectedValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:currencyValue', val);
    // emit('update:modelValue', val);
  }
});

// открытый дропдаун
const isDropdownOpen = ref(props.isOpen);

// Выбор валюты и закрытие дропдауна
function selectOption(option) {
  selectedValue.value = option;
  isDropdownOpen.value = false;
}

// Переключение состояния дропдауна
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const dropdownRef = ref(null);

// Закрыть дропдаун при клике вне
useClickOutside(dropdownRef, () => {
  if (isDropdownOpen.value) {
    isDropdownOpen.value = false;
  }
});
</script>


<template>
		<div
					ref="dropdownRef"
						@click="toggleDropdown"
						:class="{'active-dropdown': isDropdownOpen}"
						class="select"
		>
				<div class="select__selected">
						<span class="select__value">{{ selectedValue }}</span>
						<span class="select__arrow">▼</span>
				</div>
				<ul
								v-show="isDropdownOpen"
								class="select__dropdown">
						<li
										v-for="option in store.supportedCurrencies"
										:key="option"
										@click.stop="selectOption(option)"
										class="select__option">
								{{ option }}
						</li>

				</ul>
		</div>
</template>








