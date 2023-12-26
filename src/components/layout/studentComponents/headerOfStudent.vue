<template>
  <link href="../../../../static/css/authorization.css" rel="stylesheet">
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <div class="btnBox">
    <div class="d-flex myContainer">
      <nav>
        <router-link to="#">
          <button class="btn " :class="{btn_active: stateOfStudentPage === 1, btn_disactive: stateOfStudentPage !==1}" @click="$emit('btnDissertationClicked')">Диссертация
          </button>
        </router-link>
      </nav>


      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfStudentPage === 2, btn_disactive: stateOfStudentPage !==2}" @click="$emit('btnScientificWorkClicked')"><nobr>Научная работа</nobr>
          </button>
        </router-link>
      </nav>

      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfStudentPage === 3, btn_disactive: stateOfStudentPage !==3}" @click="$emit('btnTeachingLoadClicked')"><nobr>Педагогическая нагрузка</nobr>
          </button>
        </router-link>
      </nav>

    </div>
  </div>

</template>

<script>
export default {
  name: "headerOfStudent",
  props: ["stateOfStudentPage"],
  data() {
    return {
    }
  },
}
</script>

<style scoped>

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.myContainer {
  width: 60%;
  padding-top: 0.7rem;
  padding-bottom: 1rem;
}

.btn_active {
  font-family: "Raleway", sans-serif !important;
  font-weight: 500 !important;
  font-size: 1.05rem !important;
  border: solid 0.12em #0055BB !important;
  border-radius: 11px !important;
  color: #0055BB !important;


}

.btn_disactive {
  font-family: "Raleway", sans-serif !important;
  font-weight: 500 !important;
  font-size: 1.05rem !important;
  border: solid 0.10em #7C7F86 !important;
  border-radius: 11px !important;
  color: #7C7F86 !important;

}

nav {
  margin-right: 0.6rem;
}

.btnBox {
  width: 95%;
  margin:auto;


}

</style>