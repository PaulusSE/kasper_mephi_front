<template>
  <div class="btnBox">
    <div class="d-flex myContainer">
      <nav>
        <router-link to="#">
          <button class="btn " :class="{btn_active: stateOfAdminPage === 1, btn_disactive: stateOfAdminPage !==1}" @click="$emit('btnStudentTeacherButtonClicked')"><p style="word-break: break-all;">Настройка пар</p>
          </button>
        </router-link>
      </nav>


      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfAdminPage === 2, btn_disactive: stateOfAdminPage !==2}" @click="$emit('btnAddUsersButtonClicked')"><p style="word-break: break-all;">Добавление</p>
          </button>
        </router-link>
      </nav>

      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfAdminPage === 3, btn_disactive: stateOfAdminPage !==3}" @click="$emit('btnEditUsersButtonClicked')"><p style="word-break: break-all;">Пользователи<br></p>
          </button>
        </router-link>
      </nav>

      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfAdminPage === 4, btn_disactive: stateOfAdminPage !==4}" @click="$emit('btnReportButtonClicked')"><p style="word-break: break-all;">Отчеты</p>
          </button>
        </router-link>
      </nav>

    </div>
  </div>



</template>

<script>
export default {
  name: "headerOfAdmin",
  props: ["stateOfAdminPage"],
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

@media (min-width: 1700px){
  .myContainer {

    padding-top: 0.5rem;
  }

  .btn_active {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 1.2rem !important;
    border: solid 0.12em #0055BB !important;
    border-radius: 11px !important;
    color: #0055BB !important;
    padding: 0.2rem !important;
  }

  .btn_disactive {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 1.2rem !important;
    border: solid 0.10em #7C7F86 !important;
    border-radius: 11px !important;
    color: #7C7F86 !important;
    padding: 0.2rem !important;

  }

  nav {
    margin-right: 0.6rem;


  }

  .btnBox {
    width: 95%;
    margin:auto;
    margin-bottom: 1rem;
  }
}

@media (max-width: 1700px){
  .myContainer {

    padding-top: 0.5rem;
  }

  .btn_active {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 1rem !important;
    border: solid 0.15em #0055BB !important;
    border-radius: 11px !important;
    color: #0055BB !important;
    padding: 0
  }

  .btn_disactive {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 1rem !important;
    border: solid 0.15em #7C7F86 !important;
    border-radius: 11px !important;
    color: #7C7F86 !important;
    padding: 0

  }

  nav {
    margin-right: 0.2rem;

  }

  .btnBox {
    margin-left: 2.5%;
    margin-bottom: 1rem;
  }
}

@media (pointer: coarse) {
  .myContainer {
    padding-top: 0.5rem;
  }
  .btn_active {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 0.5rem !important;
    border: solid 0.15em #0055BB !important;
    border-radius: 11px !important;
    color: #0055BB !important;
    padding: 0
  }

  .btn_disactive {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 0.5rem !important;
    border: solid 0.15em #7C7F86 !important;
    border-radius: 11px !important;
    color: #7C7F86 !important;
    padding: 0

  }

  nav {
    margin-right: 0.2rem;

  }

  .btnBox {
    margin-left: 2.5%;
    margin-bottom: 1rem;
  }
}


</style>