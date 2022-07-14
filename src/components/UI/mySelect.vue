<template>
  <select v-model="modelValue" @change="changeOption">
    <option
        v-for="option in options"
        :key="option"
        :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
