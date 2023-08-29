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

    <div class="roundBlock pb-0" v-if="educationTime === 3">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText" style="text-align: left">Публикации в журналах/участие в конференциях</p>
        <div v-if="!isTableEditing">
          <button @click="editTable" class="editBtn2">Редактировать</button>
        </div>
        <div v-else>
          <button @click="cancelChangeHighTable" class="editBtn2 me-3">Отменить</button>
          <button @click="editTable" class="editBtn2">Сохранить</button>
        </div>



      </div>

      <div class=" py-5 pb-3">

        <div class="roundBlock p-0">
          <div class="d-flex justify-content-center underline">
            <div class="bigBox textTableUp rightLine ">

            </div>

            <div class="smallBox textTableUp rightLine">
              ВАК
            </div>

            <div class="smallBox textTableUp rightLine">
              WoS/
              Scopus
            </div>

            <div class="smallBox textTableUp rightLine">
              РИНЦ
            </div>

            <div class="smallBox textTableUp rightLine">
              Тезиы в сборниках конф
            </div>

            <div class="smallBox textTableUp rightLine">
              Очное участие в конф
            </div>

            <div class="smallBox textTableUp rightLine">
              Патенты
            </div>

            <div class="smallBox textTableUp">
              Всего за семетр
            </div>

          </div>

          <div class="d-flex justify-content-center"  :class="{ underline: index !== 7 }" v-for="(element,index) in generalArrayOfArticles">
            <div class="bigBox textTableUp rightLine pt-3">
              <div v-if="index === 0">
                До поступления
              </div>

              <div v-if="index > 0 && index < 7">
                {{index}}-ый семестр
              </div>

              <div v-if="index === 7">
                Текущий итог
              </div>

            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id1" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id2" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id3" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id4" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id5" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id6" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp">
              <input class="text inputBox" v-model="element.id7" :disabled="!isTableEditing">
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="roundBlock pb-0" v-if="educationTime === 2">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText" style="text-align: left">Публикации в журналах/участие в конференциях</p>

        <div v-if="!isTableEditing">
          <button  @click="editTable" class="editBtn2">Редактировать</button>
        </div>
        <div v-else>
          <button  @click="cancelChangeHighTable" class="editBtn2 me-3">Отменить</button>
          <button  @click="editTable" class="editBtn2">Сохранить</button>
        </div>

      </div>

      <div class=" py-5 pb-3">

        <div class="roundBlock p-0">
          <div class="d-flex justify-content-center underline">
            <div class="bigBox textTableUp rightLine ">

            </div>

            <div class="smallBox textTableUp rightLine">
              ВАК
            </div>

            <div class="smallBox textTableUp rightLine">
              WoS/
              Scopus
            </div>

            <div class="smallBox textTableUp rightLine">
              РИНЦ
            </div>

            <div class="smallBox textTableUp rightLine">
              Тезиы в сборниках конф
            </div>

            <div class="smallBox textTableUp rightLine">
              Очное участие в конф
            </div>

            <div class="smallBox textTableUp rightLine">
              Патенты
            </div>

            <div class="smallBox textTableUp">
              Всего за семетр
            </div>

          </div>

          <div class="d-flex justify-content-center"  :class="{ underline: index !== 5 }" v-for="(element,index) in generalArrayOfArticles">
            <div class="bigBox textTableUp rightLine pt-3">
              <div v-if="index === 0">
                До поступления
              </div>

              <div v-if="index > 0 && index < 5">
                {{index}}-ый семестр
              </div>

              <div v-if="index === 5">
                Текущий итог
              </div>

            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id1" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id2" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id3" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id4" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id5" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp rightLine">
              <input class="text inputBox" v-model="element.id6" :disabled="!isTableEditing">
            </div>

            <div class="smallBox textTableUp">
              <input class="text inputBox" v-model="element.id7" :disabled="!isTableEditing">
            </div>
          </div>
        </div>

      </div>

    </div>

    <tab-of-articles v-for="(articles,index) in arrayOfArticles"
    :id = index
    :articles = this.arrayOfArticles[index]
    @updatePage=cancelChange()
    @buttonSmallTableAdd=buttonSmallTableAdd(index)
    @saveArticles = saveArticles()
    @makeCopy = makeCopy
    @deleteArticle="(n) => deleteArticle(index, n)"
    v-if="educationTime * 2 === arrayOfArticles.length"
    ></tab-of-articles>





  </div>


</template>

<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import tabOfArticles from "@/components/layout/studentComponents/tabOfArticles.vue";
import store from "@/store/index.js";
export default {
  name: "scientificWork",
  components: {
    "headerOfStudent" : headerOfStudent,
    "tabOfArticles" : tabOfArticles
  },
  props: ["stateOfStudentPage", "educationTime"],
  data() {
    return {
      generalArrayOfArticles: [
        {id1:0, id2:1, id3:1, id4:0, id5:0, id6:0, id7:2},
        {id1:1, id2:0, id3:0, id4:0, id5:0, id6:0, id7:1},
        {id1:0, id2:2, id3:1, id4:1, id5:1, id6:0, id7:5},
        {id1:0, id2:0, id3:0, id4:1, id5:1, id6:1, id7:3},
        {id1:1, id2:0, id3:1, id4:0, id5:0, id6:1, id7:2},
        {id1:2, id2:0, id3:0, id4:0, id5:0, id6:1, id7:3},
      ],
      generalArrayOfArticlesCopy : [],
      isTableEditing: false,
      arrayOfArticlesCopy: [],
      arrayOfArticles: [
          [{
            name:"Статься «Суслики и их виды»",
            state:"UBC",
            impact: 0.67,
            comeOutData: "В мире детей, №5(29), 2012. c26-28",
            volume: 3,
            co_authors: "Ванко А.А, Буйко В.В",
          },],
          [
            {
              name:"123Статься «Суслики и их виды» 123Статься «Суслики и их виды» 123Статься «Суслики и их виды»",
              state:"UBC",
              impact: 0.67,
              comeOutData: "В мире детей, №5(29), 2012. c26-28",
              volume: 3,
              co_authors: "Ванко А.А, Буйко В.В",
            },
            {
              name:"Бла бла бла 128",
              state:"вы",
              impact: 0.2,
              comeOutData: "с23",
              volume: 15,
              co_authors: "БуБУ",
            }
          ],
          [
        {
          name:"Статься «Суслики и их виды»",
          state:"ВАК",
          impact: 0.35,
          comeOutData: "В мире животных, №1(29), 2012. c26-28",
          volume: 3,
          co_authors: "Петров А.А, Сидоров В.В",
        },],
          [],
      ]
    }
  },


  methods : {
    editTable() {

      this.makeCopyGeneralArrays()
      this.isTableEditing = !this.isTableEditing;
    },

    makeCopyGeneralArrays(reverse = 1) {
      if (reverse){
        for (var i = 0; i < this.generalArrayOfArticles.length; i++) {
          this.generalArrayOfArticlesCopy[i] = Object.assign({}, this.generalArrayOfArticles[i]);
        }
      }
      else {
        this.generalArrayOfArticles.length = 0
        for (var i = 0; i < this.generalArrayOfArticlesCopy.length; i++) {
          this.generalArrayOfArticles[i] = Object.assign({}, this.generalArrayOfArticlesCopy[i]);
        }
      }
    },

    buttonSmallTableAdd(n){
      let newArticle = {
        name: '',
        state: '',
        impact: '',
        comeOutData: '',
        volume: '',
        co_authors: ''
      }
      this.arrayOfArticles[n] = this.arrayOfArticles[n].concat(newArticle)
    },

    cancelChange(){
      this.arrayOfArticles.length = 0

      for (var i = 0; i < this.arrayOfArticlesCopy.length; i++)
        this.arrayOfArticles[i] = this.arrayOfArticlesCopy[i].slice();


    },
    saveArticles(){
      if (this.arrayOfArticles !== this.arrayOfArticlesCopy) {
        this.makeCopy()
        //saving
      }

    },
    makeCopy(){

      for (var i = 0; i < this.arrayOfArticles.length; i++)
        this.arrayOfArticlesCopy[i] = this.arrayOfArticles[i].slice();

    },
    deleteArticle(index,n){

      var tempData = this.arrayOfArticles[index]
      tempData.splice(n,1)
    },
    cancelChangeHighTable() {
      this.makeCopyGeneralArrays(0)
      this.isTableEditing = !this.isTableEditing;
    }

  },
  beforeMount() {
    if (store.getters.getType !== "student"){
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

.bigBox{
  width: 22%;
}

.smallBox{
  width: 10.85%;

}




.textTableUp{
  color: #7C7F86;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size:17px;
  text-align: center;

}



.checkboxBlock{
  padding-top: 0.8%;
  padding-left: 0.8%;
  padding-bottom: 2%;
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