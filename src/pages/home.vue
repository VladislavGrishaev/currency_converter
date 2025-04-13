<script setup>
import { useCurrencyStore } from '@/stores/currencyStore.js';
import {onMounted} from "vue";

const store = useCurrencyStore();

const converted = (from) => store.convertedAmount(store.amountFrom, from, store.headerCurrency);

onMounted(() => {
  if (!store.isRatesLoaded) {
    store.fetchRates()
  }
})
</script>

<template>
		<div class="currency-rate">
				<div
								v-if="!store.isRatesLoaded"
								class="loader">
						Загрузка курсов...
				</div>

				<div v-else>
						<div class="currency-rate__item">
								<span class="currency-rate__currency">{{ store.amountFrom }} USD</span>
								<span class="currency-rate__value">= {{ converted('USD') }} {{ store.headerCurrency }}</span>
						</div>
						<div class="currency-rate__item">
								<span class="currency-rate__currency">{{ store.amountFrom }} EUR</span>
								<span class="currency-rate__value">= {{ converted('EUR') }} {{ store.headerCurrency }}</span>
						</div>
				</div>
		</div>
</template>
