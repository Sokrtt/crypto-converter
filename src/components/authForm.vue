<template>
  <form class="modal-form" @submit.prevent>

    <div class="modal-form__inner">
      <span class="modal-form__exit-icon" @click="setIsShowModalForm('false')">x</span>
      <input
          v-model="user"
          type="text"
          class="modal-form___login"
      >
      <input
          v-model="password"
          type="password"
          class="modal-form___pass"
      >
      <button
          class="modal-form__btn-submit"
      >
        Создать
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props:{
    setIsShowModalForm: {
      type: Function
    }
  },
}
</script>

<style lang="scss" scoped>
.modal-form {
  position: relative;

  &__overlay {
     position: fixed;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     z-index: 1;
     background-color: rgba(0, 0, 0, 0.5);
   }

  &__inner {
     position: absolute;
     top: 70px;
     right: 0;
     z-index: 2;
     padding: 25px;
     color: #212529;
     text-align: left;
     background-color: #fff;
     border: 1px solid rgba(0, 0, 0, .15);
     border-radius: 8px;
     transition: all 0.5s ease;
   }

  &__exit-icon {
     position: absolute;
     top: 4px;
     right: 8px;
     color: #000;
     font-family: "Roboto", sans-serif;
     font-size: 18px;
     font-weight: 500;
     cursor: pointer;
   }
  }
</style>