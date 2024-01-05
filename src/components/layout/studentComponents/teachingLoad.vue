<template>


  <div class="mainPage">
    <header-of-student

        @btnDissertationClicked="$emit('btnDissertationClicked')"
        @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
        @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
        :state-of-student-page = stateOfStudentPage

    ></header-of-student>



    <teaching-load-table v-for="(elements,index) in arrayOfTeachingLoadByPeriod "
                         :id = index
                         :elements = elements
                         @buttonSmallTableAdd=buttonSmallTableAdd(index)
                         @buttonSmallTableCancel = cancelChange()
                         @buttonSmallTableSave = saveTeachingLoad()
                         @makeCopy = makeCopy()
                         @deleteTeachingLoad="(n) => deleteTeachingLoad(index, n)"
    ></teaching-load-table>




  </div>



</template>

<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import teachingLoadTable from "@/components/layout/studentComponents/teachingLoadTable.vue";
import store from "@/store/index.js";
import axios from "axios";
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
      arrayDeleteTeachingLoadId : [],
      numberOfSemesters : '',
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
        numberOfHours: '',
        semester:n + 1,
        numberOfSemesters : ''
      }
      this.arrayOfTeachingLoadByPeriod[n] = this.arrayOfTeachingLoadByPeriod[n].concat(newLoad)
    },
    cancelChange(){

      this.arrayOfTeachingLoadByPeriod.length = 0
      this.arrayOfTeachingLoadByPeriod = JSON.parse(JSON.stringify(this.arrayOfTeachingLoadByPeriodCopy));

      this.arrayDeleteTeachingLoadId.length = 0
    },

    cancelChangeHighTable() {
      this.isTableEditing = !this.isTableEditing;
      this.makeCopyGeneralArrays(0)
    },

    async saveTeachingLoad(){
      if (JSON.stringify(this.arrayOfTeachingLoadByPeriod) === JSON.stringify(this.arrayOfTeachingLoadByPeriodCopy)){
        return
      }
        this.makeCopy()

        var saveData = new Array()
        for (var i = 0; i < this.arrayOfTeachingLoadByPeriod.length; i++){
          for (var j = 0; j < this.arrayOfTeachingLoadByPeriod[i].length; j++){
            saveData.push(
                {
                  subject: this.arrayOfTeachingLoadByPeriod[i][j].subject,
                  student_id: this.arrayOfTeachingLoadByPeriod[i][j].student_id,
                  typeOfClasses: this.arrayOfTeachingLoadByPeriod[i][j].typeOfClasses,
                  semester: parseInt(this.arrayOfTeachingLoadByPeriod[i][j].semester),
                  numberOfHours: parseInt(this.arrayOfTeachingLoadByPeriod[i][j].numberOfHours),
                  mainTeacher: this.arrayOfTeachingLoadByPeriod[i][j].mainTeacher,
                  numberOfGroup: this.arrayOfTeachingLoadByPeriod[i][j].numberOfGroup,
                  loadID: this.arrayOfTeachingLoadByPeriod[i][j].loadID,
                  additional_load: this.arrayOfTeachingLoadByPeriod[i][j].additional_load,

                }
            )
          }
        }


        try {
          const response = await axios.post('http://localhost:8080/students/teaching_load/' + localStorage.getItem("access_token"),
              {"array" : saveData}
          )

          this.data = response.data;
          this.fillArrayOfTeachingLoad(this.data.works, this.numberOfSemesters)
        }
        catch (e) {
          console.log(e)
        }

      if (this.arrayDeleteTeachingLoadId.length === 0){
        return
      }

      try {
        const response = await axios.delete("http://localhost:8080/students/teaching_load/" + localStorage.getItem("access_token"),
            {data : {
                "ids" : this.arrayDeleteTeachingLoadId
              }
            }
        )
        this.data = response.data;
        this.fillArrayOfTeachingLoad(this.data, this.numberOfSemesters)
      }
      catch (e) {
        console.log(e)
      }

      this.arrayDeleteTeachingLoadId = []


    },
    makeCopy(){
      this.arrayOfTeachingLoadByPeriodCopy.length = 0
      this.arrayOfTeachingLoadByPeriodCopy = JSON.parse(JSON.stringify(this.arrayOfTeachingLoadByPeriod));

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
      if (tempData[n].loadID === undefined){
        tempData.splice(n,1)
        return
      }

      this.arrayDeleteTeachingLoadId.push(tempData[n].loadID)
      tempData.splice(n,1)
    },

    fillArrayOfTeachingLoad(data, numberOfSemesters) {
      console.log(data)
      this.arrayOfTeachingLoadByPeriod = Array(parseInt(numberOfSemesters))

      for (var i = 0; i < this.arrayOfTeachingLoadByPeriod.length; i++){
        this.arrayOfTeachingLoadByPeriod[i] = new Array()
      }

      for (var i = 0; i < data.length; i++){
        if (data[i].semester === 1) {
          this.arrayOfTeachingLoadByPeriod[0].push(data[i])
        }
        if (data[i].semester === 2) {
          this.arrayOfTeachingLoadByPeriod[1].push(data[i])
        }
        if (data[i].semester === 3) {
          this.arrayOfTeachingLoadByPeriod[2].push(data[i])
        }
        if (data[i].semester === 4) {
          this.arrayOfTeachingLoadByPeriod[3].push(data[i])
        }
        if (data[i].semester === 5) {
          this.arrayOfTeachingLoadByPeriod[4].push(data[i])
        }
        if (data[i].semester === 6) {
          this.arrayOfTeachingLoadByPeriod[5].push(data[i])
        }
        if (data[i].semester === 7) {
          this.arrayOfTeachingLoadByPeriod[6].push(data[i])
        }
        if (data[i].semester === 8) {
          this.arrayOfTeachingLoadByPeriod[7].push(data[i])
        }
      }
    },

    async loadTeachingLoad() {
      try {
        const response = await axios.get('http://localhost:8080/students/teaching_load/' + localStorage.getItem("access_token"))
        this.data = await response.data;
      }
      catch (e) {
        console.log(e)
      }
      this.fillArrayOfTeachingLoad(this.data.array, this.data.years * 2)
      this.numberOfSemesters = this.data.years * 2
    }

  },
  async beforeMount() {
    if (store.getters.getType !== "student"){
      this.$router.push('/wrongAccess')
    }
    await this.loadTeachingLoad()
  },
}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}



@media (min-width: 800px) {
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
}

@media (max-width: 800px) {
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
}

@media (pointer: coarse) {
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
}

</style>