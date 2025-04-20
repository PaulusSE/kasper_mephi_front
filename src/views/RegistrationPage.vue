<template>
  <div class="registration-page">
    <h2>Регистрация</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label>Email</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input v-model="form.password" type="password" required minlength="6" />
      </div>
      <div>
        <label>Тип пользователя</label>
        <select v-model="form.user_type">
          <option value="student">Студент</option>
          <option value="supervisor">Руководитель</option>
        </select>
      </div>

      <!-- динамические поля -->
      <div v-if="isStudent">
        <div><label>ФИО</label><input v-model="payload.full_name" required /></div>
        <div><label>Specialization ID</label><input v-model.number="payload.specialization_id" type="number" required /></div>
        <div><label>Actual Semester</label><input v-model.number="payload.actual_semester" type="number" required /></div>
        <div><label>Number of Years</label><input v-model.number="payload.number_of_years" type="number" required /></div>
        <div><label>Start Date</label><input v-model="payload.start_date" type="date" required /></div>
        <div><label>Group Number</label><input v-model.number="payload.group_number" type="number" required /></div>
        <div><label>Supervisor ID</label><input v-model="payload.supervisor_id" type="text" required /></div>
        <div><label>Phone</label><input v-model="payload.phone" type="tel" required /></div>
        <div><label>Category</label><input v-model="payload.category" required /></div>
      </div>
      <div v-else>
        <div><label>ФИО</label><input v-model="payload.full_name" required /></div>
        <div><label>Department ID</label><input v-model.number="payload.department_id" type="number" required /></div>
        <div><label>Phone</label><input v-model="payload.phone" type="tel" required /></div>
      </div>

      <button type="submit" :disabled="!canSubmit">Отправить заявку</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RegistrationPage',
  data() {
    return {
      form: { email: '', password: '', user_type: 'student' },
      payload: {},
      canSubmit: true
    }
  },
  computed: {
    isStudent() {
      return this.form.user_type === 'student'
    }
  },
  methods: {
    async onSubmit() {
      if (!this.canSubmit) return
      this.canSubmit = false
      try {
        await axios.post('/registration/request', {
          ...this.form,
          payload: this.payload
        })
        this.$store.dispatch('notify', { type: 'success', text: 'Заявка принята' })
        this.$router.push('/')
      } catch (e) {
        this.$store.dispatch('notify', { type: 'error', text: e.response?.data?.error || 'Ошибка' })
      } finally {
        setTimeout(() => (this.canSubmit = true), 30000)
      }
    }
  }
}
</script>

<style scoped>
.registration-page {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.registration-page div {
  margin-bottom: 0.75rem;
}
.registration-page label {
  display: block;
  margin-bottom: 0.25rem;
}
.registration-page input,
.registration-page select {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.registration-page button {
  padding: 0.75rem 1.5rem;
}
</style>