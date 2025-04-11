<script setup>
import {ref, watch} from "vue";
import {useCurrencyStore} from "@/stores/currencyStore.js";
import {useClickOutside} from "@/directives/clickOutside.js";

const props = defineProps({
  modelValue: String,
		isOpen: Boolean,
		index: Number
})

const store = useCurrencyStore()
const emit = defineEmits(['update:currencyValue', 'update:isOpen'])

const selectedValue = ref(props.modelValue)

const isDropdownOpen = ref(false)


watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal
})

watch(()=> props.isOpen, (newVal) => {
		isDropdownOpen.value = newVal
})

function selectOption(option) {
		selectedValue.value = option
		emit('update:currencyValue', option)
		isDropdownOpen.value = false
}

// переключение дропдауна валют
function toggleDropdown() {
		isDropdownOpen.value = !isDropdownOpen.value
		emit('update:isOpen', isDropdownOpen.value)
}

const dropdownRef = ref(null)

// если дропдаун открыт и произошел клик вне, закрываем его
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








