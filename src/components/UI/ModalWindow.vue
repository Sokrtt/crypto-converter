<template>
  <div class="modal-form" >
    <div class="modal-form__overlay" @click="setIsShowModalForm('false')"></div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    setIsShowModalForm: {
      type: Function
    }
  },
  methods: {

  },
  mounted() {
    console.log('modalForm mounted');
  }
}
</script>

<style lang="scss" scoped>
  .modal-form {
    &__overlay {
      background-color: rgba(0,0,0, .3);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>