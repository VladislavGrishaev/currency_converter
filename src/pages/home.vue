<script setup>
import { useCurrencyStore } from '@/stores/currencyStore.js'

const store = useCurrencyStore()
</script>

<template>
		<div v-if="store.amountFrom && store.amountTo" class="currency-rate">

				<div class="currency-rate__item">
						<span class="currency-rate__currency">{{ store.amountFrom }} {{ store.currencyFrom }}</span>
						<span class="currency-rate__value">= {{ store.amountTo }} {{ store.currencyTo }}</span>
				</div>

				<div class="currency-rate__item">
						<span class="currency-rate__currency">{{ store.amountFrom }} EUR</span>
						<span class="currency-rate__value">
        = {{ store.convertedAmount(store.amountFrom, 'EUR', 'RUB') }} RUB
      </span>
				</div>
		</div>
</template>
