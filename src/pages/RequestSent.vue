<template>
  <div class="mainPage">
    <!-- Заголовок страницы -->
    <div class="headerText">
      <p>Заявка отправлена</p>
    </div>

    <!-- Контент -->
    <div class="container-fluid d-flex flex-column align-items-center pt-4 pb-5">
      <!-- Иконка успешной операции -->
      <img
        src="/static/figures/success.svg"
        alt="success icon"
        class="successIcon mb-4"
      />

      <!-- Текст подтверждения -->
      <p class="text text-center mb-0">
        Спасибо! Ваша заявка на регистрацию успешно отправлена.<br />
        После проверки администратором мы сообщим об итогах
      </p>

      <!-- Кнопка перехода к авторизации -->
      <button class="registrateBtn roundedBtn mt-5" @click="goToAuth">
        На экран авторизации
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestSent',
  methods: {
    goToAuth () {
      this.$router.push('/auth')
    }
  }
}
</script>

<style scoped>
/* Адаптивная иконка */
.successIcon {
  width: 120px;
  height: 120px;
}
@media (max-width: 600px) {
  .successIcon {
    width: 80px;
    height: 80px;
  }
}

/* Подкласс для более округлой кнопки + цвета портала */
.roundedBtn {
  /* используем те же цвета, что и везде в проекте */
  background-color: #0055BB !important;
  color: #FFFFFF !important;

  /* более «пилл»-формат */
  border-radius: 20px !important;
  padding: 0.75rem 2rem !important;

  /* чуть более сбалансированный размер шрифта */
  font-size: 1rem !important;
  font-weight: 500 !important;

  /* плавная анимация при наведении */
  transition: background-color 0.2s ease-in-out;
}
.roundedBtn:hover {
  background-color: #004799 !important;
}
</style>
