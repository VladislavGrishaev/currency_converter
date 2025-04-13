<script setup>
import {useCurrencyStore} from "@/stores/currencyStore.js";
import {onMounted} from "vue";

const store = useCurrencyStore();

onMounted(()=> {Object.keys(store.rates).length === 0 ? store.fetchRates() : null})

</script>

<template>
		<div
						v-if="store.rates && store.getRate('USD', 'RUB') && store.getRate('EUR', 'RUB')"
						class="currency-rate">

				<div class="currency-rate__item">
						<span class="currency-rate__currency">1 USD</span>
						<span class="currency-rate__value">= {{ store.getRate('USD', 'RUB').toFixed(2) }} RUB</span>
				</div>

				<div class="currency-rate__item">
						<span class="currency-rate__currency">1 EUR</span>
						<span>= {{ store.getRate('EUR', 'RUB').toFixed(2) }} RUB</span>
				</div>
		</div>
</template>