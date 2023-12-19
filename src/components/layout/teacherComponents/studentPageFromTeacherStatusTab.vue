<template>
  <link href="../../../../static/css/authorization.css" rel="stylesheet">
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">


  <div class="roundBlock">
    <div class="d-flex justify-content-between"  style="height: 3.5em;">

      <p class="headingSemester">{{id + 1}} семестр</p>

      <div v-if="buttonIsOpened" style="margin-right: 3%">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowleft.png" class="semestrImgActive">
        </button>

      </div>
      <div v-else style="margin-right: 3%">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowdown.png" class="semestrImgActive">
        </button>
      </div>
    </div>
    <div v-if="buttonIsOpened">

      <div class="roundBlock ">
        <div class="d-flex justify-content-between mt-3" style="height:5em">
          <nav class="checkboxBlock justify-content-start col-3 ms-0">
            <div class="mySelectedField2 gap-3 d-flex">
              <p class="mainText" style="font-weight: 400; margin-top: 0.1em">Статус</p>
              <select class="form-select" id="inputGroupSelect02" style="width: 180px" v-model="stateOfWork" :class="{textResult1: stateOfWork === 'Проверено', textResult2: stateOfWork === 'На доработку', textResult3: stateOfWork === 'Не сдано'}">
                <option  class="textResult">Выбрать статус</option>
                <option  class="textResult1">Проверено</option>
                <option  class="textResult2">На доработку</option>
                <option  class="textResult3">Не сдано</option>
              </select>
            </div>
          </nav>

        </div>

        <div class="roundBlock" style="height: 5em">
          <ul class="pt-1">
            <p style="font-family: 'Raleway', 'sans-serif';" class="loadText">Титульный лист</p>
          </ul>
          <ul class="selectedFileMessage" v-if="files['ExplanationaryNote'] === ''">
            Файлы отсутствуют
          </ul>
          <ul class="selectedFileMessage" v-else>
            {{files['TitleList']}}
          </ul>
        </div>

        <div class="roundBlock" style="height: 5em">
          <ul>
            <p class="loadText">Пояснительная записка</p>
          </ul>
          <ul class="selectedFileMessage" v-if="files['TitleList'] === ''">
            Файлы отсутствуют
          </ul>
          <ul class="selectedFileMessage" v-else>
            {{files['TitleList']}}
          </ul>
        </div>

      </div>

    </div>


  </div>


</template>

<script>
export default {
  name: "studentPageFromTeacherStatusTab",
  props : ["files", "id"],
  data()  {
    return {
      buttonIsOpened : false,
      stateOfWork : "'Проверено'"
    }
  },
  methods : {
    buttonClicked() {
      this.buttonIsOpened = !this.buttonIsOpened
    }
  },
  beforeMount() {

  }
}
</script>

<style scoped>
.semestrButtonActive {
  border:0 !important;
  width: 3%;
  height: 100%;
  max-width: 42px;
  margin-top: 0 !important;
  background-color: white;
}

.roundBlock {
  border: solid 0.12em #DEDEDE;
  border-radius: 20px;
  width: 95%;
  margin:auto;
  margin-bottom: 2% !important;
  padding: 0 1% 1%;

}

.headingSemester {

  margin-top:1%;
  color: #7C7F86;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size:22px;
}

.textResult1 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  font-size:17px;
  color:#6BDB6B;
}

.textResult2 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  font-size:17px;
  color:#FFC009
}

.textResult3 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  font-size:17px;
  color:#FF3333;
}

.mainText{
  color:#7C7F86;
  font-weight: 300;
  font-size:20px;
  text-align: center;
}

.loadText {
  font-family: 'Raleway', 'sans-serif';
  font-size: 22px;
  font-weight: 500;
}


</style>