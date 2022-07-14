<template>
  <tr
      v-for="item in searchCurrencies"
      :item="item"
      class="currencies__item"
  >
    <td class="currencies__item-name" >
      <img :src="item.image" class="currencies__item-logo">
<!--      <label class="currencies__item-title" style="vertical-align: middle">{{item?.name}}</label>-->
      {{item?.name}}
    </td>
    <td
        class="currencies__item-price"
    >
      {{item.current_price.toLocaleString('en')}} $
    </td>
<!-- в запросе к API при смене количества дней меняется название переменой 14d 30d 1d нужно менять эту переменую  price_change_percentage_14d_in_currency   -->
    <td
        :class="item.price_change_percentage_1h_in_currency > 0 ? 'green-txt' : 'red-txt'"
        class="currencies__item-change"
    >
      {{item.price_change_percentage_1h_in_currency.toFixed('2')}} %
    </td>
    <td
        :class="item.price_change_percentage_24h_in_currency > 0 ? 'green-txt' : 'red-txt'"
        class="currencies__item-change"
    >
      {{item.price_change_percentage_24h_in_currency.toFixed('2')}} %
    </td>
    <td
        :class="item.price_change_percentage_7d_in_currency > 0 ? 'green-txt' : 'red-txt'"
        class="currencies__item-change"
    >
      {{item.price_change_percentage_7d_in_currency.toFixed('2')}} %
    </td>
    <td
        class="currencies__item-volume"
    >{{item.total_volume.toLocaleString('en')}} $
    </td>
    <td
        class="currencies__item-graph"
    >
      <myChart
          :priceChange="item.priceChange"
      ></myChart>
    </td>
  </tr>
</template>

<script>
import myChart from "@/components/profile/myChart";

export default {
  components: {myChart },

  props: {
    searchCurrencies: {
      type: Object,
      default: () => {}
    },
    selectedPeriodChart: {
      type: String,
      default: ''
    },
  },
  mounted() {
    console.log(this.searchCurrencies)
    debugger
  },
}
</script>

<style lang="scss" scoped>
  .currencies__item {
    line-height: 42px;

    &-name {
      text-align: left;
      padding-left: 22px;
      width: 180px;
    }

    &-logo {
      width: 32px;
      height: 32px;
      margin-right: 10px;
      vertical-align: middle;
    }

    &-title {
      vertical-align: center;
    }
  }

</style>
