import {defineStore} from "pinia";

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    baseCurrency: 'RUB',
    supportedCurrencies: ['RUB', 'USD', 'EUR'],
    rates: {},
    error: null
  }),
  actions: {
    async fetchRates() {
      this.error = null

      try {
        const response = await fetch('https://status.neuralgeneration.com/api/currency')
        this.rates = await response.json()
        if (!this.rates) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

      }
      catch (e) {
        console.error('Ошибка загрузки курсов валют:', e)
        this.error = e instanceof Error ? e.message : 'Unknown error'
      }
    },

    setBaseCurrency(currency) {
      this.baseCurrency = currency
    }
  },

  getters: {
    getRate: (state)=> (from, to) => {
      if (from === to) return 1

      const  key = `${from.toLowerCase()}-${to.toLowerCase()}`
      return state.rates[key] ?? null
    }
  }

})