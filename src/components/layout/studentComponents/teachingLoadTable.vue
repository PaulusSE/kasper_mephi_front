<template>



  <div class="roundBlock">
    <div class="d-flex justify-content-between" >

      <p class="headingSemester ">{{id + 1}} семестр</p>

      <div v-if="buttonIsOpened">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowleft.png" class="semestrImgActive">
        </button>

      </div>
      <div v-else>
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowdown.png" class="semestrImgActive">
        </button>
      </div>

    </div>
    <div v-if="buttonIsOpened" class="text-end" style="margin-right: 2.5%">
      <button v-if="!smallTableEditing" @click="buttonSmallTableClicked" class="editBtn2 mt-3">Редактировать</button>
      <div v-else>
        <button class="editBtn2 mt-3 me-2" @click="deleteButton" v-if="!deleteState">Удалить</button>
        <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd')"  v-if="!deleteState">Добавить</button>
        <button class="editBtn2 mt-3 me-2" @click="cancelChange" >Отменить</button>
        <button class="editBtn2 mt-3 me-2" @click="buttonSaveLoad" >Сохранить</button>
      </div>

    </div>




    <div class="roundBlock p-0 mt-2" v-if="buttonIsOpened">
      <div v-if="!deleteState">
        <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: elements.length !== 0}">
          <div class="rightLine textMiniTable ps-3" style="width: 33%; text-align: center;">
            Дисциплина
          </div>

          <div class="rightLine textMiniTable" style="width: 11.1%; text-align: center">
            Группы
          </div>


          <div class="rightLine textMiniTable" style="width: 20.2%; text-align: center">
            Основной<br>преподователь

          </div>

          <div class="rightLine textMiniTable" style="width: 26.3%; text-align: center">
            Тип занятий
          </div>

          <div class="textMiniTable ps-3" style="width: 8.3%; text-align: center">
            Кол-во<br>часов
          </div>

        </div>

        <div class="d-flex" :class="{ underline: index !== elements.length-1}" v-for="(element,index) in elements">
          <div class="rightLine textMiniTable ps-3" style="width: 33.0%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model=element.subject readonly ></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model=element.subject></textarea>
            </div>
          </div>

          <div class="rightLine textMiniTable" style="width: 11.1%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model=element.numberOfGroup readonly ></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model=element.numberOfGroup></textarea>
            </div>
          </div>


          <div class="rightLine textMiniTable" style="width: 20.2%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model=element.mainTeacher readonly ></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model=element.mainTeacher></textarea>
            </div>

          </div>

          <div class="rightLine textMiniTable" style="width: 26.3%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model=element.typeOfClasses readonly ></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model=element.typeOfClasses></textarea>
            </div>


          </div>

          <div class="textMiniTable ps-3" style="width: 8.3%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="element.numberOfHours" readonly ></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="element.numberOfHours"></textarea>
            </div>

          </div>
        </div>
      </div>

      <div v-if="deleteState">
        <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: elements.length !== 0}">
          <div class="rightLine textMiniTable ps-3" style="width: 31%; text-align: center;">
            Дисциплина
          </div>

          <div class="rightLine textMiniTable" style="width: 10.1%; text-align: center">
            Группы
          </div>


          <div class="rightLine textMiniTable" style="width: 19.2%; text-align: center">
            Основной<br>преподователь

          </div>

          <div class="rightLine textMiniTable" style="width: 25.3%; text-align: center">
            Тип занятий
          </div>

          <div class="textMiniTable ps-3 rightLine" style="width: 6.3%; text-align: center">
            Кол-во<br>часов<br>сем.
          </div>

          <div class="textMiniTable ps-3" style="width: 7%; text-align: center">

          </div>

        </div>

        <div class="d-flex" :class="{ underline: index !== elements.length-1}" v-for="(element,index) in elements">
          <div class="rightLine textMiniTable ps-3" style="width: 31.0%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="element.subject" readonly></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="element.subject"></textarea>
            </div>
          </div>

          <div class="rightLine textMiniTable" style="width: 10.1%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="element.numberOfGroup" readonly></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="element.numberOfGroup"></textarea>
            </div>
          </div>


          <div class="rightLine textMiniTable" style="width: 19.2%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="element.mainTeacher" readonly></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="element.mainTeacher"></textarea>
            </div>

          </div>

          <div class="rightLine textMiniTable" style="width: 25.3%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="element.typeOfClasses" readonly></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="element.typeOfClasses"></textarea>
            </div>
          </div>

          <div class="textMiniTable ps-3 rightLine" style="width: 6.3%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="element.numberOfHours" readonly></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="element.numberOfHours"></textarea>
            </div>
          </div>

          <div class="textMiniTable ps-3 pt-2" style="width: 7%; text-align: center">
            <button class="btnAddDeleteFiles" @click="deleteTeachingLoad(index)">
              <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
            </button>
          </div>
        </div>
      </div>



    </div>
  </div>


</template>

<script>
export default {
  name: "tabOfArticles",
  props: ["elements", "id"],
  data() {
    return {
      buttonIsOpened : false,
      smallTableEditing: false,
      deleteState: false,
    }
  },
  methods : {
    buttonClicked(){

      if (this.buttonIsOpened === true)
        this.smallTableEditing = false
      this.buttonIsOpened = !this.buttonIsOpened
    },
    buttonSmallTableClicked(){
      this.smallTableEditing = !this.smallTableEditing
      this.$emit("makeCopy")
    },
    buttonSaveLoad(){
      this.smallTableEditing = !this.smallTableEditing
      this.$emit('buttonSmallTableSave')

      if (this.deleteState === true)
        this.deleteState = false
    },

    cancelChange(){
      this.$emit('buttonSmallTableCancel')
      if (this.deleteState === true)
        this.deleteState = false
    },

    deleteButton(){
      this.deleteState = !this.deleteState
    },
    deleteTeachingLoad(myIndex){
      this.$emit('deleteTeachingLoad', myIndex)
    }

  }
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}


.headingSemester {

  margin-top:1%;
  margin-left: 1%;
  color: #7C7F86;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size:22px;
}

.semestrButtonActive {
  border:0 !important;
  width: 3%;
  height: 100%;
  max-width: 42px;
  margin-top: 0 !important;
  background-color: white;
  margin-right: 3rem;
}




.textMiniTable{
  color: #7C7F86;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size:18px;
  text-align: center;

}



.inputBox {
  border: 0 !important;
  font-weight: 400;
  text-align: center;
  border-radius: 0 !important;
  color:#000000;
  background-color: white;
  outline: none !important;


}

.roundBlock {
  border: solid 0.12em #DEDEDE;
  border-radius: 20px;
  width: 95%;
  margin:auto;
  padding: 0 !important;
  margin-bottom: 2%;
}


.underline {
  border-bottom: solid 0.12em #DEDEDE;

}

.rightLine {
  border-right:  solid 0.12em #DEDEDE !important;
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

.trashLogo{
  width:35px !important;
  height: 35px !important;
}

.btnAddDeleteFiles {
  border:0 !important;
  background:white !important;
}

.textWithCarry{
  border: 0 !important;
  resize: none;
  width: 100%;
  overflow-x:hidden;
  overflow-y:hidden;
}

</style>