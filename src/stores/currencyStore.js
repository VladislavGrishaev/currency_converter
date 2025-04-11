import {defineStore} from "pinia";

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    baseCurrency: 'RUB',
    supportedCurrencies: ['RUB', 'USD', 'EUR'],
    rates: {},
    error: null,
    amountFrom: '',
    amountTo: '',
    currencyFrom: 'RUB',
    currencyTo: 'USD',
    lastEdited: 'from'
  }),
  actions: {

    /** получение курса валют по API **/
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

    /** базовая валюта **/
    setBaseCurrency(currency) {
      this.baseCurrency = currency
    },

    /** установка валюты "из" **/
    setCurrencyFrom(currency) {
      this.currencyFrom = currency
    },

    /** установка валюты "в" **/
    setCurrencyTo(currency) {
      this.currencyTo = currency
    },

    /** сумма "из" и флаг редактирования **/
    setAmountFrom(value) {
      this.amountFrom = value
      this.lastEdited = 'from'
    },

    /** сумма "в" и флаг редактирования **/
    setAmountTo(value) {
      this.amountTo = value
      this.lastEdited = 'to'
    },

    /** валидация формы **/
    validateAmount(value) {
      const num = parseFloat(value)
      return !isNaN(num) && isFinite(num)
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