<template>
  <div v-if="isFetchingPageList">Загрузка ...</div>
  <div v-else>
    <div class="currencies__header">
      <div class="currencies__header__search">
        <input
            class="currencies__header__search-input"
            placeholder="Введите название"
            v-model="this.searchQuery"
            @keydown.enter="this.searchCurrency"
        >
      </div>
      <div class="currencies__header__period">
        <mySelect
          v-model="this.selectedPeriodChart"
          :options="this.selectOptionsPeriodChart"
          class="currencies__header__period-select"
        >

        </mySelect>
      </div>
    </div>

    <div class="currencies__list">
      <table>
        <thead class="currencies__thead">
          <tr>
            <th class="currencies__thead-name" @click="sortedPosts('name')">Название</th>
            <th class="currencies__thead-price" @click="sortedPosts('current_price')">Стоимость</th>
            <th class="currencies__thead-change">Изменение за 1 часа</th>
            <th class="currencies__thead-change">Изменение за 24 часа</th>
            <th class="currencies__thead-change">Изменение за 7 дней</th>
            <th class="currencies__thead-volume">Рыночная капитализация</th>
            <th class="currencies__thead-volume">Последние {{this.selectedPeriodChart}} дней</th>
          </tr>
        </thead>
        <tbody class="currencies__tbody">
          <CurrencyItemTable
              :searchCurrencies="searchCurrency()"
              :selectedPeriodChart="this.selectedPeriodChart"
          >
          </CurrencyItemTable>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import CurrencyItemTable from "@/components/currencyItemTable";
import mySelect from "@/components/UI/mySelect";

export default {
  components: {CurrencyItemTable, mySelect },
  data() {
    return {
      currencies: [],
      selectedPeriodChart: '7',
      selectOptionsPeriodChart: ['7', '14', '30', '60', '90'],
      searchQuery: '',
      isFetchingPageList: false,
    }
  },
  methods: {
    async getCurrenciesOptionsSelect(periodDay = 7) {
      try {
        this.isFetchingPageList = true;
        this.currencies = [];
        // const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&ethereum&sparkline=false&price_change_percentage=${periodDay}d`);
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&price_change_percentage=1h%2C24h%2C7d`);
        response.data.map(async (item, index) => {
          const response2 = await this.getPriceForChart(item.id, periodDay)
          item.priceChange = response2;
          this.currencies.push(item);
        })
      } catch (e) {
        console.error(e);
      } finally {
        this.isFetchingPageList = false;
      }
    },

    async getPriceForChart(coin, periodDay) {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${periodDay}&interval=daily`);
        return response.data.prices;
      } catch (e) {
        console.error(e);
      }
    },
    sortedPosts(sortedValue) {
      //   debugger
      //   const arr2 = this.currencies.sort((item1, item2) => {
      //     debugger
      //     return item1[sortedValue] - item2[sortedValue];
      //     // item1[sortedValue]?.localeCompare(item2[sortedValue])
      // })
      //
      // debugger
      // return arr2;
    },
    searchCurrency() {
      return this.currencies.filter(item => item.id.toLowerCase().includes(this.searchQuery.toLowerCase()))
    },
  },

  watch: {
    selectedPeriodChart(newValue) {
      debugger
      this.getCurrenciesOptionsSelect(newValue);
    },
  },

  computed: {
    // searchCurrency() {
    //   debugger
    //   return this.currencies.filter(item => item.id.toLowerCase().includes(this.searchQuery.toLowerCase()))
    // },
  },
  mounted() {
    debugger
    this.getCurrenciesOptionsSelect();
    // this.getPriceForChart();
  },
}
</script>

<style lang="scss" scoped>
  table {
    border-collapse: collapse;
    width: 100%;
    & th {
      padding: 14px;
    }
  }

  .currencies {

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__search {
        position: relative;
        margin: 14px;

        &-input {
          background: url("../asset/icon-search.png")  left 4px center no-repeat;
          background-size: 30px;
          padding-left: 44px;
          width: 350px;
          height: 40px;
          border: 1px solid #5b616e33;
          border-radius: 6px;

          &:focus-visible {
            outline: 1px solid #192A526B;
          }
        }
      }

      &__period {

        &-select {
          padding: 10px 5px;
          border: 1px solid #5b616e33;
          border-radius: 6px;

          &:focus-visible {
            outline: 1px solid #192A526B;
          }
        }
      }
    }

    &__list {

      & tr {
        border-bottom: 1px solid #5b616e33;
      }

      & tr:first-child {
        border-top: 1px solid #5b616e33;
      }

      & tr:last-child {
        border-bottom:none;
      }
    }

    &__thead {

      &-name,
      &-price {
        cursor: pointer;
      }
    }
  }




</style>
