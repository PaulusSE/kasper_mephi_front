<template>
  <link href="../../../../static/css/authorization.css" rel="stylesheet">
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <div class="mainPage">
    <header-of-student

        @btnDissertationClicked="$emit('btnDissertationClicked')"
        @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
        @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
        :state-of-student-page = stateOfStudentPage

    ></header-of-student>

    <div class="roundBlock pb-0" v-if="educationTime === 2">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText" style="text-align: left">Педагогическая нагрузка</p>
        <div v-if="!isTableEditing">
          <button @click="editTable" class="editBtn2">Редактировать</button>
        </div>

        <div v-else>
          <button @click="cancelChangeHighTable" class="editBtn2 pe-2">Отменить</button>
          <button @click="editTable" class="editBtn2">Сохранить</button>
        </div>

      </div>

      <div class=" py-3 pb-3">

        <div class="roundBlock p-0">
          <div class="d-flex justify-content-center underline" style="height: 3.5rem">
            <div class="col-4 textTableUp rightLine pt-2">
                № семестра
            </div>

            <div class="col-4  textTableUp rightLine pt-2">
              Кол-во аудит. часов
            </div>

            <div class="col-4  textTableUp pt-2">
              Иная педагогическая практика
            </div>
          </div>

          <div class="d-flex justify-content-center underline" >
            <div class="col-4 textTableUp rightLine pt-2">
                1-ый семестр
            </div>

            <div class="col-4  textTableUp rightLine">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[0].hours1" :disabled="!isTableEditing">
            </div>

            <div class="col-4  textTableUp">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[0].otherLoad1" :disabled="!isTableEditing">
            </div>
          </div>

          <div class="d-flex justify-content-center underline">
            <div class="col-4 textTableUp rightLine pt-2">
              2-ый семестр
            </div>

            <div class="col-4  textTableUp rightLine">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[1].hours2" :disabled="!isTableEditing">
            </div>

            <div class="col-4  textTableUp">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[1].otherLoad2" :disabled="!isTableEditing">
            </div>
          </div>

          <div class="d-flex justify-content-center underline">
            <div class="col-4 textTableUp rightLine pt-2">
              3-ый семестр
            </div>

            <div class="col-4  textTableUp rightLine" >
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[2].hours3" :disabled="!isTableEditing">
            </div>

            <div class="col-4  textTableUp" >
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[2].otherLoad3" :disabled="!isTableEditing">
            </div>
          </div>

          <div class="d-flex justify-content-center">
            <div class="col-4 textTableUp rightLine pt-2">
              4-ый семестр
            </div>

            <div class="col-4  textTableUp rightLine">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[3].hours4" :disabled="!isTableEditing">
            </div>

            <div class="col-4  textTableUp ">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[3].otherLoad4" :disabled="!isTableEditing">
            </div>
          </div>



        </div>

      </div>

    </div>

    <div class="roundBlock pb-0" v-if="educationTime === 3">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText" style="text-align: left">Педагогическая нагрузка</p>

        <div v-if="!isTableEditing">
          <button @click="editTable" class="editBtn2">Редактировать</button>
        </div>

        <div v-else>
          <button @click="cancelChangeHighTable" class="editBtn2 pe-2">Отменить</button>
          <button @click="editTable" class="editBtn2">Сохранить</button>
        </div>

      </div>

      <div class=" py-3 pb-3">

        <div class="roundBlock p-0">
          <div class="d-flex justify-content-center underline" style="height: 3.5rem">
            <div class="col-4 textTableUp rightLine pt-2">
              № семестра
            </div>

            <div class="col-4  textTableUp rightLine pt-2">
              Кол-во аудит. часов
            </div>

            <div class="col-4  textTableUp pt-2">
              Иная педагогическая практика
            </div>
          </div>

          <div class="d-flex justify-content-center underline" >
            <div class="col-4 textTableUp rightLine pt-2">
              1-ый семестр
            </div>

            <div class="col-4  textTableUp rightLine">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[0].hours1" :disabled="!isTableEditing">
            </div>

            <div class="col-4  textTableUp">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[0].otherLoad1" :disabled="!isTableEditing">
            </div>
          </div>

          <div class="d-flex justify-content-center underline">
            <div class="col-4 textTableUp rightLine pt-2">
              2-ый семестр
            </div>

            <div class="col-4  textTableUp rightLine">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[1].hours2" :disabled="!isTableEditing">
            </div>

            <div class="col-4  textTableUp">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[1].otherLoad2" :disabled="!isTableEditing">
            </div>
          </div>

          <div class="d-flex justify-content-center underline">
            <div class="col-4 textTableUp rightLine pt-2">
              3-ый семестр
            </div>

            <div class="col-4  textTableUp rightLine" >
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[2].hours3" :disabled="!isTableEditing">
            </div>

            <div class="col-4  textTableUp" >
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[2].otherLoad3" :disabled="!isTableEditing">
            </div>
          </div>

          <div class="d-flex justify-content-center underline">
            <div class="col-4 textTableUp rightLine pt-2">
              4-ый семестр
            </div>

            <div class="col-4  textTableUp rightLine">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[3].hours4" :disabled="!isTableEditing">
            </div>

            <div class="col-4  textTableUp ">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[3].otherLoad4" :disabled="!isTableEditing">
            </div>
          </div>

          <div class="d-flex justify-content-center underline">
            <div class="col-4 textTableUp rightLine pt-2">
              5-ый семестр
            </div>

            <div class="col-4  textTableUp rightLine">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[4].hours5" :disabled="!isTableEditing">
            </div>

            <div class="col-4  textTableUp">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[4].otherLoad5" :disabled="!isTableEditing">

            </div>
          </div>

          <div class="d-flex justify-content-center">
            <div class="col-4 textTableUp rightLine pt-2">
              6-ый семестр
            </div>

            <div class="col-4  textTableUp rightLine">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[5].hours6" :disabled="!isTableEditing">
            </div>

            <div class="col-4  textTableUp">
              <input type="text"  class="inputBox" v-model="arrayOfTeachingLoad[5].otherLoad6" :disabled="!isTableEditing">
            </div>
          </div>



        </div>

      </div>

    </div>


    <teaching-load-table v-for="(elements,index) in arrayOfTeachingLoadByPeriod "
                         :id = index
                         :elements = elements
                         @buttonSmallTableAdd=buttonSmallTableAdd(index)
                         @buttonSmallTableCancel = cancelChange()
                         @buttonSmallTableSave = saveTeachingLoad()
                         @makeCopy = makeCopy()
                         @deleteTeachingLoad="(n) => deleteTeachingLoad(index, n)"
                         v-if="educationTime * 2 === arrayOfTeachingLoadByPeriod.length"
    ></teaching-load-table>




  </div>



</template>

<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import teachingLoadTable from "@/components/layout/studentComponents/teachingLoadTable.vue";
import store from "@/store/index.js";
export default {
  name: "teachingLoad",
  components: {
    "headerOfStudent":headerOfStudent,
    "teachingLoadTable":teachingLoadTable
  },
  props: ["stateOfStudentPage", 'educationTime'],
  data() {
    return {
      isTableEditing:false,
      arrayOfTeachingLoadByPeriodCopy : [],
      arrayOfTeachingLoadByPeriod:[[
        {
          subject:"Информатика",
          numberOfGroup: "Б15-501",
          mainTeacher: "Сидоров А.А.",
          typeOfClasses: "Семинары",
          numberOfHours: 16
        },
        {
          subject:"Вdsaf",
          numberOfGroup: "gfds1",
          mainTeacher: "Ивdfgh",
          typeOfClasses: "Леdfghи",
          numberOfHours: 223
        }
      ],
        [{
          subject:"Весна 2024",
          numberOfGroup: "Б15-501",
          mainTeacher: "Иванов Г.В.",
          typeOfClasses: "Лекции",
          numberOfHours: 24

        }],
        [{
          subject:'123',
          numberOfGroup: '3456',
          mainTeacher:'8756',
          typeOfClasses: '3456',
          numberOfHours: '45678',

        }],
        [],
      ],
      arrayOfTeachingLoad : [
        {
          hours1: '48 семинары', otherLoad1: "2стендта (УИР), прием экзаменов по ..."
        },
        {
          hours2: '16 лр', otherLoad2: "1стендт (УИР)"
        },
        {
          hours3: '', otherLoad3: ""
        },
        {
          hours4: '', otherLoad4: ""
        },
        {
          hours5: '', otherLoad5: ""
        },
        {
          hours6: '', otherLoad6: ""
        },
        {
          hours7: '', otherLoad7: ""
        },
        {
          hours8: '', otherLoad8: ""
        }
      ],
      arrayOfTeachingLoadCopy: [],
    }
  },


  methods: {
    editTable() {
      this.isTableEditing = !this.isTableEditing;
      this.makeCopyGeneralArrays()
    },
    buttonSmallTableAdd(n){
      let newLoad = {
        subject: '',
        numberOfGroup: '',
        mainTeacher: '',
        typeOfClasses: '',
        numberOfHours: ''
      }
      this.arrayOfTeachingLoadByPeriod[n] = this.arrayOfTeachingLoadByPeriod[n].concat(newLoad)
    },
    cancelChange(){
      this.arrayOfTeachingLoadByPeriod.length = 0

      for (var i = 0; i < this.arrayOfTeachingLoadByPeriodCopy.length; i++)
        this.arrayOfTeachingLoadByPeriod[i] = this.arrayOfTeachingLoadByPeriodCopy[i].slice();
    },

    cancelChangeHighTable() {
      this.isTableEditing = !this.isTableEditing;
      this.makeCopyGeneralArrays(0)
    },

    saveTeachingLoad(){
      if (this.arrayOfTeachingLoadByPeriod !== this.arrayOfTeachingLoadByPeriodCopy){
        this.makeCopy()
        //saving
      }
    },
    makeCopy(){
      for (var i = 0; i < this.arrayOfTeachingLoadByPeriod.length; i++)
        this.arrayOfTeachingLoadByPeriodCopy[i] = this.arrayOfTeachingLoadByPeriod[i].slice();
    },
    makeCopyGeneralArrays(reverse = 1) {
      if (reverse){
        for (var i = 0; i < this.arrayOfTeachingLoad.length; i++) {
          this.arrayOfTeachingLoadCopy[i] = Object.assign({}, this.arrayOfTeachingLoad[i]);
        }
      }
      else {
        this.arrayOfTeachingLoad.length = 0
        for (var i = 0; i < this.arrayOfTeachingLoadCopy.length; i++) {
          this.arrayOfTeachingLoad[i] = Object.assign({}, this.arrayOfTeachingLoadCopy[i]);
        }
      }
    },

    deleteTeachingLoad(index, n){

      var tempData = this.arrayOfTeachingLoadByPeriod[index]
      tempData.splice(n,1)

    }

  },
  beforeMount() {
    if (store.getters.getType !== "student"){
      this.$router.push('/wrongAccess')
    }
  },
}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}





.textTableUp{
  color: #7C7F86;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size:20px;
  text-align: center;

}



.checkboxBlock{
  padding-top: 0.8%;
  padding-left: 0.8%;
  padding-bottom: 2%;
}

.inputBox {
  border: 0 !important;
  font-weight: 450;
  text-align: center;
  border-radius: 0 !important;
  outline: none !important;

}

.roundBlock {
  border: solid 0.12em #DEDEDE;
  border-radius: 20px;
  width: 95%;
  margin:auto;
  margin-bottom: 2% !important;
  padding: 0 1% 1%;

}


.underline {
  border-bottom: solid 0.12em #DEDEDE;

}

.rightLine {
  border-right:  solid 0.12em #DEDEDE !important;
}



.mainText{
  color:#7C7F86;
  font-weight: 300;
  font-size:30px;
  text-align: center;


}

.editBtn2 {
  color:#0055BB;
  border: 0;
  background-color: white;
}

ul p{
  color: #000000;
  font-family: "Raleway", sans-serif;
  font-weight: 900;
  font-size:22px;
  margin-left: 2%;

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

</style>