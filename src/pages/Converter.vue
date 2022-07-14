<template>
  <section class="converter">
    <h1>Converter Currency</h1>
    <div v-if="isFetchingPage">
      Идет загрузка...
    </div>
    <div v-else class="converter__inner">
      <div class="converter__main">
        <div class="converter__left">
          <div class="converter__left__currency">
            <input
                v-model="this.inputCountLeft"
                @keydown.enter="getPriceCurrencyVsCurrency"
                type="text"
                class="converter__left__currency-input"
            >
            <mySelect
                v-model="selectedCurrenciesLeft"
                :options="currenciesLeftSelect"
                class="converter__left__currency-select"
            >
            </mySelect>
          </div>
          <div v-if="this.changeCurrency" class="converter__left__change">
            <span class="converter__left__change-txt">
              Change 24h:
              <input
                  v-model="this.changeCurrency"
                  :class="this.changeCurrency > 0 ? 'green-txt' : 'red-txt'"
                  contenteditable="true"
                  disabled
              >
              <label :class="this.changeCurrency > 0 ? 'green-txt' : 'red-txt'">%</label>
            </span>
          </div>
        </div>
        <div class="converter__middle">
        </div>
        <div class="converter__right">
          <div class="converter__right__price">
            <input
                v-model="this.selectedRate"
                type="text"
                class="converter__right__price-input"
                disabled
           >
            <mySelect
                v-model="selectedCurrenciesRight"
                :options="currenciesRightSelect"
                class="converter__right__price-select"
            >
            </mySelect>
          </div>
          <div v-if="this.volumeCurrency" class="converter__left__volume ">
             <span class="converter__left__volume-txt">
               Volume: $
               <input
                 v-model="this.volumeCurrency"
                 contenteditable="true"
                 disabled
               >B</span>
          </div>
        </div>
      </div>
<!--      <div class="converter__additional">-->
<!--        <div class="converter__chart">-->
<!--          Вывести диаграму относительно BTC k USD-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </section>
</template>

<script>
import axios from "axios";
import MySelect from "@/components/UI/mySelect";

export default {
  components: {MySelect},
  data() {
    return {
      currenciesLeftSelect: [],
      currenciesRightSelect: ['USD'],
      selectedCurrenciesLeft: 'Bitcoin',
      selectedCurrenciesRight: 'USD',
      inputCountLeft: '1',
      inputPriceRight: '',
      selectedRate: '',
      changeCurrency: '',
      volumeCurrency: '',
      isFetchingPage: false,
      isAuth: false,
      users: {
        login: 'user',
        password: '123'
      },
    }
  },
  methods: {
    async getCurrenciesOptionsSelect() {
      try {
        this.isFetchingPage = true;
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`);
        await this.getPriceCurrencyVsCurrency();
        for (const item of response.data) {
          this.currenciesLeftSelect.push(item.name);
          this.currenciesRightSelect.push(item.symbol.toUpperCase());
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.isFetchingPage = false;
      }
    },
    async getPriceCurrencyVsCurrency() {
      try {
        const change24h = this.selectedCurrenciesRight.toLowerCase() + '_24h_change';
        const vol24h = this.selectedCurrenciesRight.toLowerCase() + '_24h_vol';
        const curCurrency = this.selectedCurrenciesLeft.toLowerCase();
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${curCurrency}&vs_currencies=${this.selectedCurrenciesRight}&include_24hr_vol=true&include_24hr_change=true`);
        let price = this.inputCountLeft * response.data[curCurrency][this.selectedCurrenciesRight.toLowerCase()];
        this.changeCurrency = response.data[curCurrency][change24h].toFixed('2');
        debugger
        this.volumeCurrency  = Math.ceil(response.data[curCurrency][vol24h]).toLocaleString('en');
        this.selectedRate = (
            Number.isInteger(price)
            ? price
            : price?.toFixed(2)
        ).toLocaleString('en');
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getCurrenciesOptionsSelect();
  },
  watch: {
    isAuth(newValue) {
      console.log(newValue);
    },
    inputCountLeft() {
      this.getPriceCurrencyVsCurrency();
    },
    selectedCurrenciesLeft() {
      this.getPriceCurrencyVsCurrency();
    },
    selectedCurrenciesRight() {
      this.getPriceCurrencyVsCurrency();
    },
    selectedRate(newValue){
      console.log(newValue)
    }
  },
}
</script>

<style lang="scss" scoped>

input:disabled {
  background-color: transparent;
  border: none;
  outline: none;
}

.green-txt {
  color: #48c774;
}

.red-txt {
  color: #ff0000;
}

.converter {
  color: #fff;

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    margin: 0 auto;
    padding: 40px 80px;
    border-radius: 8px;
    background-color: #383a59;
  }

  &__main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__additional {
    margin-top: 40px;
  }

  &__left, &__right {

    &__currency, &__price {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border: 2px solid #ccb6b6;
      border-radius: 8px;
      overflow: hidden;

      &-input {
        width: 110px;
        background-color: transparent;
        border: none;
        text-align: center;
        color: #fff;

        &:focus-visible {
          outline: 0;
          outline-offset: 0;
        }
      }



      &-select {
        padding: 6px;
        background-color: antiquewhite;
        border: none;
        outline: none;
      }
    }

    &__change,
    &__volume  {
      margin-top: 14px;
      text-align: center;
    }

    &__volume,
    &__volume-txt input {
      color: #ffdd57;
    }

    &__change-txt input,
    &__volume-txt input {
      font-size: 16px;
      width: 30px;
      text-align: left;
    }
  }

  &__middle:before {
    content: "";
    background-image: url('../asset/icon_equals.png');
    padding: 15px 30px 0;
    background-repeat: no-repeat;
    background-position: top;
  }

  &__currencies {
    display: flex;
    align-items: center;
  }

  &__currency {

    &__logo {
      width: 50px;
      height: 50px;
    }
  }

}

</style>
