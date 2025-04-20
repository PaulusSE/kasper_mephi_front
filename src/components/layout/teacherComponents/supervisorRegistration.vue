<template>
<!-- уведомление -->
  <sending-files-notification
      v-if="stateOfSending"
      :result-of-sending="resultOfSending"/>
  <div class="mainPage">
    <div class="headerText"><p>Регистрация руководителя</p></div>

    <form @submit.prevent="submitSupervisor">
      <!-- Email -->
      <div class="container-fluid d-flex mb-3">
        <nav style="width:100%">
          <label class="text m-0">Email</label>
          <input
            v-model="email"
            type="email"
            class="blockStyles"
            required
            @input="errorMessage = ''"
          />
        </nav>
      </div>
        <!-- Пароль -->
        <div class="container-fluid d-flex mb-3">
            <nav style="width:100%">
            <label class="text m-0">Пароль</label>
            <input
                v-model="password"
                type="password"
                :class="['blockStyles', {
                'invalid-input': password.length > 0 && password.length < 8
                }]"
                required
                @input="errorMessage = ''"
                placeholder="••••••••"
            />
            <!-- здесь подсказка -->
            <p :class="['hint', { 'invalid-text': password.length > 0 && password.length < 8 }]">
            Пароль должен быть минимум 8 символов
          </p>
            </nav>
        </div>

      <div class="container-fluid d-flex mb-3">
        <nav style="width:100%">
          <label class="text m-0">ФИО (полностью)</label>
          <input
            v-model="fullName"
            class="blockStyles"
            required
            @input="errorMessage = ''"
          />
        </nav>
      </div>

      <div class="container-fluid d-flex mb-3">
        <nav style="width:100%">
          <label class="text m-0">Телефон +7 (xxx) xxx-xx-xx</label>
          <input
            v-model="phone"
            class="blockStyles"
            required
            @input="errorMessage = ''"
          />
        </nav>
      </div>

      <div v-if="errorMessage" class="wrongData mb-3">{{ errorMessage }}</div>

      <div class="container-fluid d-flex">
        <nav style="width:100%; text-align:center; padding-top:1rem">
          <button class="registrateBtn" type="submit">
            Зарегистрировать
          </button>
        </nav>
      </div>
    </form>
  </div>
</template>

<script>
import axios             from 'axios';
import SendingToast      from '@/components/layout/notifications/studentNotifications/sendingRegNotification.vue';

export default {
  components:{ SendingToast },
  data(){
    return{
      email:'', password:'', fullName:'', phone:'',
      errorMessage:'',
      toastVisible:false,
      toastSuccess:false,
    };
  },
  methods:{
    showToast(ok){
      this.toastSuccess = ok;
      this.toastVisible = true;
      setTimeout(()=>{ this.toastVisible = false; }, 5000);
    },
    async submitSupervisor(){
      /* валидация – та же, опущено ради краткости */

      try{
        await axios.post(
          this.IP + '/authorize/registration/supervisor/' +
          localStorage.getItem('access_token'),
          { email:this.email, password:this.password,
            full_name:this.fullName, phone:this.phone });

        this.showToast(true);
        setTimeout(()=>this.$router.push('/request-sent'),2000);

      }catch(e){
        this.errorMessage = e.response?.data?.error ||
                            'Ошибка при регистрации, попробуйте ещё раз';
        this.showToast(false);
      }
    }
  }
};
</script>


<style scoped>
@media (min-width: 800px) {
  .mainPage {
    width: 70%;
    margin: 1.5% auto;
    padding-bottom: 1.5%;
    background: #fff;
    border-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
  }
  .headerText {
    font-family: "Raleway", serif;
    padding: 1rem;
    font-size: 1.3rem;
    font-weight: 400;
    text-align: center;
  }
}
@media (max-width: 800px) {
  .mainPage {
    width: 80%;
    margin: 1.5% auto;
    padding-bottom: 1.5%;
    background: #fff;
    border-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
  }
  .headerText {
    font-family: "Raleway", serif;
    padding: 1rem;
    font-size: 1.1rem;
    font-weight: 400;
    text-align: center;
  }
}
.text {
  font-size: 1rem;
}
.wrongData {
  color: red;
  font-family: "Raleway", sans-serif;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
}
.registrateBtn {
  background-color: #0055bb !important;
  color: white !important;
  border-color: #0055bb !important;
  height: 3.2rem !important;
  border-radius: 8px !important;
  font-weight: 300 !important;
  font-size: 1.3rem !important;
}
.blockStyles {
  width: 100%;
  height: 2.5rem;
  border-radius: 10px;
  border: 2px solid #7c7f86;
  padding: 0.375rem 0.75rem;
}
.invalid-input {
  border-right: 2px solid red;
}
.hint {
  color: #6c757d;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
.invalid-text {
  color: red;
}

</style>