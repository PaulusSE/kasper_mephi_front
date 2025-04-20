<template>
  <!-- плавное появление / исчезновение -->
  <transition name="slide-fade">
    <div class="toast" :class="{ success: resultOfSending, error: !resultOfSending }">
      <img :src="resultOfSending ? successIcon : errorIcon" class="icon" />
      <p>
        {{ resultOfSending
            ? 'Заявка на регистрацию успешно отправлена' + '\n' + 'Ожидайте подтверждения администратором'
            : 'Ошибка при отправке, попробуйте ещё раз' }}
      </p>
    </div>
  </transition>
</template>

<script>
import successIcon from "@/static/figures/success.svg";   // галочка
import errorIcon   from "@/static/figures/error.svg";     // крестик

export default {
  name: "SendingFilesNotification",
  props: {
    resultOfSending: {   // true – успех, false – ошибка
      type: Boolean,
      required: true
    }
  },
  data() {               // экспортируем иконки в шаблон
    return { successIcon, errorIcon };
  }
};
</script>

<style scoped>
.toast{
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 240px;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,.15);
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Raleway", sans-serif;
  color:#fff;
  z-index: 9999;
}
.success{ background:#28a745; }
.error  { background:#dc3545; }
.icon{ width:24px;height:24px }

.slide-fade-enter-active,
.slide-fade-leave-active{ transition: all .3s ease; }
.slide-fade-enter-from,
.slide-fade-leave-to    { opacity:0; transform: translateX(20px); }
</style>
