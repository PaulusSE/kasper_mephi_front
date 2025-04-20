<template>
  <!-- Стили (можно вынести в index.html) -->
  <link href="../../../static/css/studentProfile.css" rel="stylesheet" />
  <link href="../../../static/css/bootstap.css" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"
  />

  <div class="registration-container">
    <!-- Кнопки-переключатели -->
    <div class="d-flex justify-content-center mb-4">
      <div class="btn-group" role="group">
        <button
          type="button"
          class="btn"
          :class="selectedType === 'student' ? 'btn-primary' : 'btn-outline-secondary'"
          @click="selectedType = 'student'"
        >
          Студент
        </button>
        <button
          type="button"
          class="btn"
          :class="selectedType === 'supervisor' ? 'btn-primary' : 'btn-outline-secondary'"
          @click="selectedType = 'supervisor'"
        >
          Научный руководитель
        </button>
      </div>
    </div>

    <!-- Динамическая форма -->
    <transition name="fade">
      <component :is="currentComponent" :key="selectedType" />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import studentRegistration from "@/components/layout/studentComponents/studentRegistration.vue";
import supervisorRegistration from "@/components/layout/teacherComponents/supervisorRegistration.vue";

export default {
  name: "registration",
  data() {
    return {
      selectedType: "student"
    };
  },
    // при создании компонента один раз заводим анонимный токен
  async created() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      const res = await axios.post(`${this.IP}/authorize/anonymous`);
      localStorage.setItem("access_token", res.data.token);
    }
  },
  computed: {
    currentComponent() {
      return this.selectedType === "student"
        ? studentRegistration
        : supervisorRegistration;
    }
  },
  components: {
    studentRegistration,
    supervisorRegistration
  }
};
</script>

<style scoped>
.registration-container {
  max-width: 80%;
  margin: 2rem auto;
  padding: 1rem;
}

/* Анимация для перехода */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>