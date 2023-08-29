<template>
  <div class="mainPage">
    <header-of-admin
    @btnStudentTeacherButtonClicked="$emit('btnStudentTeacherButtonClicked')"
    @btnAddUsersButtonClicked="$emit('btnAddUsersButtonClicked')"
    @btnEditUsersButtonClicked="$emit('btnEditUsersButtonClicked')"
    @btnReportButtonClicked="$emit('btnReportButtonClicked')"
    :state-of-admin-page = stateOfAdminPage
    ></header-of-admin>

    <div class="buttonBlock">

      <div v-if="stateOfButton">
        <button class="editBtn" @click="editPairs">Редактировать</button>
      </div>

      <div v-else>
        <button class="editBtn"  @click="savePairs">Сохранить</button>
        <button class="editBtn"  @click="cancelPairs">Отменить</button>
      </div>

    </div>


    <div class="myBox roundBlock p-0 pb-0">
      <div class="d-flex underline">
        <div class="rightLine col-6 mainText">
          Аспиранты
        </div>
        <div class="col-6 mainText">
          Научный руководитель
        </div>
      </div>

      <div v-for="(pair,index) in arrayOfPairsStudentTeacher" >
        <div class="d-flex" :class="{underline:index !== arrayOfPairsStudentTeacher.length - 1}">
          <div class="rightLine col-6 mainText">
            {{pair.studentFullName}}
          </div>
          <div class="col-6 mainText">
            <select class="form-select blockStyles mainText m-0 p-0" :disabled="stateOfButton" v-model="pair.teacherFullName" @input="inputEvent">
              <option v-for="teacher in arrayOfTeacher" class="mainText">{{teacher.teacherFullName}}</option> >
            </select>
          </div>
        </div>
      </div>

    </div>

  </div>


</template>

<script>
import headerOfAdmin from "@/components/layout/adminComponents/headerOfAdmin.vue";
import store from "@/store/index.js";

export default {
  name: "student-teacher",
  props : ["stateOfAdminPage"],
  components : {
    "headerOfAdmin": headerOfAdmin,
  },
  data() {
    return {
      arrayOfPairsStudentTeacherCopy: [],
      arrayOfPairsStudentTeacher : [
        {
          studentFullName: "Сафиуллин Ильяс Фанисович",
          teacherFullName: "Тихомирова Анна Николаевна",
          studentId:1,
          teacherId:2
        },
        {
          studentFullName: "Дима",
          teacherFullName: "Рословцев Владимир Владимирович",
          studentId:3,
          teacherId:4
        },
        {
          studentFullName: "Никита",
          teacherFullName: "Тихомирова Анна Николаевна",
          studentId:5,
          teacherId:6
        },
        {
          studentFullName: "Виктор П.",
          teacherFullName: "",
          studentId:6,
          teacherId:7
        },
      ],
      arrayOfTeacher : [
        {
          teacherFullName: "Тихомирова Анна Николаевна",
          teacherId:2
        },
        {
          teacherFullName: "Рословцев Владимир Владимирович",
          teacherId: 4
        },
        {
          teacherFullName: "Тихомирова Дарья",
          teacherId: 7
        },
      ],
      stateOfButton : true,
    }
  },
  methods : {
    inputEvent(){

    },
    editPairs(){
      this.stateOfButton = !this.stateOfButton
      this.makeCopy()
    },
    savePairs(){
      this.stateOfButton = !this.stateOfButton
      if (this.arrayOfPairsStudentTeacherCopy === this.arrayOfPairsStudentTeacher)
        return
      ///save Pairs

      this.makeCopy()
    },
    cancelPairs(){
      this.stateOfButton = !this.stateOfButton
      this.arrayOfPairsStudentTeacher.length = 0
      this.makeCopy(0)

    },
    makeCopy(reverse = 1) {
      if (reverse){
        for (var i = 0; i < this.arrayOfPairsStudentTeacher.length; i++) {
          this.arrayOfPairsStudentTeacherCopy[i] = Object.assign({}, this.arrayOfPairsStudentTeacher[i]);
        }
      }
      else {
        this.arrayOfPairsStudentTeacher.length = 0
        for (var i = 0; i < this.arrayOfPairsStudentTeacherCopy.length; i++) {
          this.arrayOfPairsStudentTeacher[i] = Object.assign({}, this.arrayOfPairsStudentTeacherCopy[i]);
        }
      }
    }
  },
  beforeMount() {
    if (store.getters.getType !== "admin"){
      this.$router.push('/wrongAccess')
    }
  }
}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}


.mainPage {
  width: 60%;

  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
  margin: 1.5% auto 1%;
  padding: 0 0 1.5%;
}


.buttonBlock {
  width: 80%;
  margin: auto;
  text-align: right;
  padding-bottom: 0.3em;
}

.roundBlock {
  border: solid 0.12em #DEDEDE;
  border-radius: 5px;
  width: 95%;
  margin:auto;
  margin-bottom: 2% !important;
  padding: 0 1% 1%;
}
.myBox {
  width: 80%;
  margin: auto;
}

.underline {
  border-bottom: solid 0.12em #DEDEDE;
  margin-left: 0;
}

.rightLine {
  border-right:  solid 0.12em #DEDEDE !important;
  font-size: 25px !important;
}

.mainText{
  color:#7C7F86;
  font-weight: 300;
  font-size:23px !important;
  text-align: center;
}

.blockStyles {
  border-radius: 0 !important;
  border-color: #7C7F86;
  border-width:0;
  padding-bottom: 0;
}




.editBtn {
  color:#0055BB;
  border: 0;
  margin-right: 1%;
  background-color: white;
}

</style>