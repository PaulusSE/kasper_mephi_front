<script>
import axios from "axios";
import utf8 from "utf8";

export default {
  name: "conformSendingToCheck",
  data() {
    return {
      dissertationText : '',
      scientificWorkText: '',
      teachingLoadText: '',
      render : false,
      explanationaryNoteFile : '',
    }
  },
  props : ["show", "actualSemester"],
  methods : {
    cancel(){
      this.$emit("closeWindow")
    },
    async send(){
      this.$emit("closeWindow")


      try {
        const response = await axios.post(this.IP +"/students/review/" + localStorage.getItem("access_token"),
            {
              "commentary" : this.dissertationText
            }
        )

      }
      catch (e) {
        console.log(e)
      }

      this.updateAllStudentsComponents()
    },
    updateAllStudentsComponents() {
      this.$emit("updateAllStudentsComponents")
    },
    
  },
  async beforeMount() {
  
  }


}

</script>


<template>

  <div class="confirmBlock" v-if="this.show">
    <div class="confirmBlockContent">
      <slot>

        <div class="mainText d-flex m-2">
          Подтверждение отправки всех разделов на проверку
        </div>
        <div class="roundBlock">

          <div class="roundBlock mt-3">
            <p class="textMiniTable" style="word-break:break-word">
              Вы уверены, что хотите отправить разделы:
            </p>
            <p class="textMiniTable" style="word-break:break-word">
              Диссертация, научная работа, педагогическая нагрузка на проверку?
            </p>
            <p class="textMiniTable" style="word-break:break-word">
              В течение проверки разделы будут недоступны для редактирования
            </p>


<!--            <p class="wrongPassword" v-if="explanationaryNoteFile === ''">-->
<!--              Пояснительная записка за текущий семестр не загружена !!!-->
<!--            </p>-->

            <div class="d-flex justify-content-between mt-3 pt-2 pb-2 mb-2">
              <nav  class="text-center ms-2">
                <button type="button" class="loggining btn btn-primary btn-lg my-1 text-center" @click="send" >Подтвердить</button>
<!--                <button type="button" class="loggining-disabled btn btn-primary btn-lg my-1 text-center" v-else @click="send" disabled>Подтвердить</button>-->
              </nav>
              <nav  class="text-center me-2">
                <button type="button" class="loggining btn btn-primary btn-lg my-1 text-center" @click="cancel">Отмена</button>
              </nav>
            </div>

          </div>

          <div class="roundBlock">
            <p class="textMiniTable text-start" style="word-break:break-word">
              Комментарий к отчету
            </p>
            <textarea v-model="dissertationText" rows=12 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none;"></textarea>
          </div>




        </div>


      </slot>
    </div>
  </div>

</template>

<style scoped>
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}


.confirmBlock {
  top : 0;
  bottom : 0;
  right: 0;
  left: 0;
  background: rgb(0,0,0, 0.5);
  position: fixed;
  display: flex;
  padding-top: 0;
  z-index: 2 !important;
}



@media (min-width: 800px) {

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:18px;
    text-align: center;
    word-break: break-all;

  }

  .wrongPassword {
    color: red;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 1.2rem;
    text-align: center;
  }

  .confirmBlockContent {
    margin: auto;
    background : white;
    border-radius : 12px;
    min-height: 50px;
    padding: 0.5rem;
    width: 70%;
    overflow-y: scroll !important;
    height: 50% !important;
  }


  .headerText{
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 450;
    font-size:23px !important;
    text-align: start;
  }

  .loggining {
    font-size: 1.2rem !important;

    background-color: #0055bb;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    padding:0.5rem;
    margin: 0 !important;
    color:white !important;
  }

  .loggining-disabled {
    font-size: 1.2rem !important;
    background-color: grey !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    border-color:grey !important;
    padding:0.5rem;
    margin: 0 !important;
    color:white !important;
  }

}

@media (max-width: 800px) {


  .confirmBlockContent {
    margin: auto;
    background : white;
    border-radius : 12px;
    min-height: 50px;
    padding: 0.5rem;
    width: 80%;
    overflow-y: scroll !important;
    height: 50% !important;
  }

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.9rem;
    text-align: center;
    word-break: break-all;
    padding-left:0.1rem;
    padding-right: 0.1rem;
  }

  .wrongPassword {
    color: red;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 1rem;
    text-align: center;

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

  .headerText{
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 450;
    font-size:23px !important;
    text-align: start;
  }

  .loggining {
    font-size: 1.1rem !important;
    padding:0.25rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }

  .loggining-disabled {
    font-size: 1.1rem !important;
    background-color: grey !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    border-color:grey !important;
    padding:0.25rem;
    margin: 0 !important;
    color:white !important;
  }


}

@media (pointer: coarse) and (max-width: 400px) {

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.6rem;
    text-align: center;
    word-break: break-all;
    padding-left:0.1rem;
    padding-right: 0.1rem;
  }

  .wrongPassword {
    color: red;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 0.8rem;
    text-align: center;

  }

  .confirmBlockContent {
    margin: auto;
    background : white;
    border-radius : 12px;
    min-height: 50px;
    padding: 0.5rem;
    width: 90%;
    overflow-y: scroll !important;
    height: 50% !important;
  }

  .headerText{
    margin-top: 0!important;
    color:#7C7F86;
    font-weight: 300;
    font-size: 0.8rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 !important;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 450;
    font-size:0.6rem !important;
    text-align: start;
  }

  .loggining {
    font-size: 0.8rem !important;
    padding:0.3rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }

  .loggining-disabled {
    font-size: 0.8rem !important;
    background-color: grey !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    border-color:grey !important;
    padding:0.3rem;
    margin: 0 !important;
    color:white !important;
  }


}


</style>