<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <div class="navbar__logo" @click="$router.push('/')">
        <img src="@/asset/icon-logo.png">
      </div>
      <div class="navbar__links" v-if="isAuth">
        <a @click="$router.push('/')" class="navbar__link">Конвертер</a>
        <a class="navbar__link" @click="$router.push('/lk')">Портфель</a>
        <a class="navbar__link" @click="setIsAuth('false')">Выйти</a>
      </div>
      <div class="navbar__links" v-else>
        <ModalWindow v-if="isShowModalForm" :setIsShowModalForm="setIsShowModalForm">
          <AuthForm :setIsShowModalForm="setIsShowModalForm"></AuthForm>
        </ModalWindow>
        <a class="navbar__link" @click="setIsShowModalForm('true')" >Войти</a>
        <a class="navbar__link" @click="setIsShowModalForm('false')">Регистрация</a>
      </div>
    </div>
  </nav>
</template>
<script>
import ModalWindow from "@/components/UI/ModalWindow";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import AuthForm from "@/components/authForm";

export default {
  components: {AuthForm, ModalWindow},
  methods: {
    ...mapMutations({
      setIsAuth: 'authModule/setIsAuth',
      setIsShowModalForm: 'authModule/setIsShowModalForm',
    }),
  },
  computed: {
    ...mapState({
      isAuth: state => state.authModule.isAuth,
      isShowModalForm: state => state.authModule.isShowModalForm,
    })
  },
}
</script>

<style lang="scss" scoped>
  .navbar {
    &__inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__logo img {
      width: 250px;
    }

    &__links {
      position: relative;
    }

    &__link {
      display: inline-block;
      margin-right: 40px;
      padding: 20px 0;
      font-size: 20px;

      &:hover {
        color: #0032c1;
        cursor: pointer;
        box-shadow: inset 0 -3px 0 -1px #0032c1;
      }
    }


    &__link:last-child {
      margin-right: 0;
    }
  }
</style>