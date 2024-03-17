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
            {{pair["student"]["fullName"]}}
          </div>
          <div class="col-6 mainText">
            <select class="form-select blockStyles mainText m-0 p-0" :disabled="stateOfButton" v-model="pair.teacherFullName" @input="inputEvent">
              <option v-for="teacher in arrayOfTeacher" class="mainText">{{pair["supervisor"]["full_name"]}}</option> >
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
import axios from "axios";

export default {
  name: "student-teacher",
  props : ["stateOfAdminPage"],
  components : {
    "headerOfAdmin": headerOfAdmin,
  },
  data() {
    return {
      arrayOfPairsStudentTeacherCopy: [],
      arrayOfPairsStudentTeacher : [],
      arrayOfTeacher : [],
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
    async savePairs(){
      this.stateOfButton = !this.stateOfButton
      if (this.arrayOfPairsStudentTeacherCopy === this.arrayOfPairsStudentTeacher)
        return

      var pairs = new Array()

      for (var i = 0; i < this.arrayOfPairsStudentTeacher.length; i++){
        var teacherFullName = this.arrayOfPairsStudentTeacher[i]["supervisor"]["full_name"]
        for (var j = 0; j < this.arrayOfTeacher.length; j++){
          if (this.arrayOfTeacher[j]["full_name"] === teacherFullName){
            this.arrayOfPairsStudentTeacher[i]["supervisor"]["supervisor_id"] = this.arrayOfTeacher[j]["supervisor_id"]
            break
          }
        }
        pairs.push({
          "student_id": this.arrayOfPairsStudentTeacher[i]["student"]["student_id"],
          "supervisor_id" : this.arrayOfPairsStudentTeacher[i]["supervisor"]["supervisor_id"]
        })
      }

      try {
        const response = await axios.post(this.IP + "/administrator/student/change/" + localStorage.getItem("access_token"),
            pairs
        )
        console.log(response)
      }
      catch (e) {
        this.showWrongAnswerString = true;
      }


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
    },
    async getAspsAndTeachers() {
      try {
        const response = await axios.get(this.IP +"/administrator/pairs/" + localStorage.getItem("access_token"),
        )

        this.data = response.data

        for (var i = 0; i < this.data.length; i++){
          this.arrayOfTeacher.push(this.data["supervisor"])
        }

        this.arrayOfPairsStudentTeacher = this.data
      }
      catch (e) {
        this.showWrongAnswerString = true;
      }
    }
  },
  beforeMount() {
    if (store.getters.getType !== "admin"){
      this.$router.push('/wrongAccess')
    }
    this.getAspsAndTeachers()
  }
}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}


@media (min-width: 800px) {
  .mainPage {
    width: 50%;

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
    width: 100%;
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
    width: 90%;
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
    font-weight: 400;
    font-size:1.2rem !important;
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
    margin-right: 5%;
    background-color: white;
  }
}

@media (max-width: 800px) {
  .mainPage {
    width: 80%;

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
    width: 95%;
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
    font-size:0.9rem !important;
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
    margin-right: 2.5%;
    background-color: white;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .mainPage {
    width: 90%;

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
    width: 95%;
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
    font-size:0.8rem !important;
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
    margin-right: 2.5%;
    background-color: white;
    font-size: 0.6rem;
  }
}


</style>