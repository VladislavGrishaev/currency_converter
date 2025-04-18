import {defineStore} from "pinia";

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    baseCurrency: 'USD',
    supportedCurrencies: ['RUB', 'USD', 'EUR'],
    rates: {},
    errorMessage: '',
    amountFrom: '1',
    amountTo: '',
    currencyFrom: 'USD',
    currencyTo: 'RUB',
    lastEdited: 'from',
    headerCurrency: 'RUB',
    isRatesLoaded: false
  }),
  actions: {

    /** получение курса валют по API **/
    async fetchRates() {
      this.error = null

      try {
        const response = await fetch('https://status.neuralgeneration.com/api/currency')
        this.rates = await response.json()

        this.convert()
        this.isRatesLoaded = true

        if (!this.rates) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

      }
      catch (e) {
        console.error('Ошибка загрузки курсов валют:', e)
        this.error = e instanceof Error ? e.message : 'Unknown error'
      }
    },

    /** установка валюты "из" **/
    setCurrencyFrom(currency) {
      this.currencyFrom = currency
      this.convert();
    },

    /** установка валюты "в" **/
    setCurrencyTo(currency) {
      this.currencyTo = currency
      this.convert();
    },

    /** установка валюты в шапке **/
    setHeaderCurrency(currency) {
      this.headerCurrency = currency
      this.fetchRates();
    },

    /** сумма "из" и флаг редактирования **/
    setAmountFrom(value) {
      this.amountFrom = typeof value === 'object' && value.target ? value.target.value : value
      this.amountFrom = this.formValidation(this.amountFrom);

      this.lastEdited = 'from'

      this.amountFrom === '' ? this.amountTo = '' : false

      this.convert()
    },

    /** сумма "в" и флаг редактирования **/
    setAmountTo(value) {
      this.amountTo = typeof value === 'object' && value.target ? value.target.value : value
      this.amountTo = this.formValidation(this.amountTo);
      this.lastEdited = 'to'
      this.convert()
    },

    /** валидация: является ли числом и конечным числовым значением **/
    validateAmount(value) {
      const num = parseFloat(value)
      return !isNaN(num) && isFinite(num)
    },

    /** конвертация валюты **/
    convert() {
      const from = parseFloat(this.amountFrom)
      const to = parseFloat(this.amountTo)
      const rate = this.getRate(this.currencyFrom, this.currencyTo)
      const reverseRate = this.getRate(this.currencyTo, this.currencyFrom)

      if (this.lastEdited === 'from' && this.validateAmount(this.amountFrom)) {
        this.amountTo = (from * rate).toFixed(2)
      }

      if (this.lastEdited === 'to' && this.validateAmount(this.amountTo)) {
        this.amountFrom = (to * reverseRate).toFixed(2)
      }

      if (!rate) return console.error('Курс не найден')
    },

    /** валидация полей **/
    formValidation(value) {

      // преобразуем запятую в точку и удаляем все лишние символы
      let str = value.toString()
        .replace(',', '.')
        .replace(/[^\d.]/g, '');

      // если точка уже есть, не разрешаем добавлять новую
      if ((str.match(/\./g) || []).length > 1) {

        // удаляем последнюю точку, если их больше одной
        return str.slice(0, str.lastIndexOf('.'));
      }
      // ограничиваем количество знаков после точки до двух
      str = str.replace(/^(\d*\.\d{0,2})\d*$/, '$1');

      // если после обработки пусто или символы не являются числом, показываем ошибку
      if (str === '' || isNaN(parseFloat(str))) {
        this.errorMessage = 'Пожалуйста, введите корректное число';
        return '';
      }

      // Проверяем, что ввели только цифры или точку (если есть)
      if (/[^0-9.]/.test(value)) {
        this.errorMessage = 'Можно вводить только цифры или цифры и точку'; // Сообщение об ошибке
        return value.replace(/[^0-9.]/g, '');
      }

      this.errorMessage = '';
      return str;
    }

  },

  getters: {
    getRate: (state)=> (from, to) => {
      if (from === to) return 1

      const  key = `${from.toLowerCase()}-${to.toLowerCase()}`
      return state.rates[key] ?? null
    },
    currentCurrency: (state) => state.headerCurrency,

    convertedAmount: (state) => (amount, from, to) => {
      if (from === to) return parseFloat(amount).toFixed(2);

      const rate = state.rates[`${from.toLowerCase()}-${to.toLowerCase()}`];
      const num = parseFloat(amount);
      if (!rate || isNaN(num)) return '';
      return (num * rate).toFixed(2);
    },

    getHeaderRates: (state) => {
      const target = state.headerCurrency;
      const result = {};

      state.supportedCurrencies.forEach((currency) => {
        if (currency !== target) {
          const key = `${currency.toLowerCase()}-${target.toLowerCase()}`;
          const rate = state.rates[key];
          if (rate) {
            result[currency] = (1 * rate).toFixed(2);
          }
        }
      });

      return result;
    }
  }

})