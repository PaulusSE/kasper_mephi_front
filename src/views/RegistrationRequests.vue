<template>
  <div class="requests-page">
    <h2>Заявки на регистрацию</h2>
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Тип</th>
          <th>Дата</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="req in requests" :key="req.id">
          <td>{{ req.email }}</td>
          <td>{{ req.user_type }}</td>
          <td>{{ new Date(req.created_at).toLocaleString() }}</td>
          <td>
            <button @click="approve(req.id)" :disabled="!canApprove(req)">Утвердить</button>
            <button @click="reject(req.id)">Отклонить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'RegistrationRequests',
  data() {
    return { requests: [] }
  },
  computed: {
    ...mapState({ user: state => state.user })
  },
  async mounted() {
    const res = await axios.get('/registration/requests?status=pending')
    this.requests = res.data
  },
  methods: {
    async approve(id) {
      await axios.post(`/registration/requests/${id}/approve`)
      this.requests = this.requests.filter(r => r.id !== id)
    },
    async reject(id) {
      await axios.post(`/registration/requests/${id}/reject`)
      this.requests = this.requests.filter(r => r.id !== id)
    },
    canApprove(req) {
      return !(this.user.role === 'supervisor' && req.user_type === 'supervisor')
    }
  }
}
</script>

<style scoped>
.requests-page {
  max-width: 800px;
  margin: 2rem auto;
}
.requests-page table {
  width: 100%;
  border-collapse: collapse;
}
.requests-page th,
.requests-page td {
  padding: 0.5rem;
  border: 1px solid #ddd;
  text-align: left;
}
.requests-page button {
  margin-right: 0.5rem;
}
</style>