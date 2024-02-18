<template>




  <div class="roundBlock">

    <div class="d-flex justify-content-between">

      <p class="headingSemester">{{id + 1}} семестр</p>

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

    <div class="roundBlock" v-if="buttonIsOpened">
      <div class="d-flex justify-content-between">
        <nav class="mt-3" style="margin-left: 2.5%">
          <p class="headingSemester">Публикация в изданиях</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%">
          <button v-if="!smallTableEditing1" @click="buttonSmallTableClicked1" class="editBtn2 mt-3">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd1')">Добавить</button>
            <button class="editBtn2 mt-3 me-2" @click="cancelChange1">Отменить</button>
            <button class="editBtn2 mt-3 " @click="saveArticles">Сохранить</button>
          </div>
        </nav>
      </div>
      <div class="roundBlock p-0 mt-2">

        <div v-if="!smallTableEditing1">
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: articles.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 27.5%; text-align: center">
              Наименование<br>работы
            </div>


            <div class="rightLine textMiniTable" style="width: 10.15%; text-align: center">
              Статус
            </div>

            <div class="rightLine textMiniTable" style="width: 10.15%; text-align: center">
              Индексация
            </div>

            <div class="rightLine textMiniTable" style="width: 8.21%; text-align: center">
              Импакт<br>-<br>фактор<br>издания
            </div>

            <div class="rightLine textMiniTable" style="width: 22.07%; text-align: center">
              Выходные<br>данные
            </div>

            <div class="rightLine textMiniTable" style="width: 5.926%; text-align: center">
              Объем<br>в стр
            </div>

            <div class="textMiniTable" style="width: 12.26%; text-align: center">
              Соавторы
            </div>

          </div>

          <div class="d-flex " :class="{ underline: index !== articles.length-1}" v-for="(article,index) in articles">

            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>
            <div class="rightLine textMiniTable" style="width: 27.5%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{article.name}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 10.15%;">
              <div class="textWithCarry inputBox ">{{article.state}}</div>
            </div>

            <div class="rightLine textMiniTable" style="width: 10.15%;">

              <div style="height: 100%">
                <label class="textCheckBox inputBox text-start" >
                  <input type="checkbox" disabled/>ВАК</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" disabled/>РИНЦ</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" disabled/>Scopus</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" disabled/>WoS</label>
              </div>


            </div>


            <div class="rightLine textMiniTable" style="width: 8.21%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{article.impact}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 22.07%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{article.output_data}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 5.926%; text-align: center">
              <div>
                <div class="textWithCarry inputBox "> {{article.volume}}</div>
              </div>

            </div>
            <div class="textMiniTable" style="width: 12.26%; text-align: center; padding-right: 0" >
              <div class="pe-3">
                <div class="ps-3">
                  <div class="textWithCarry inputBox "> {{article.co_authors}}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div v-if="smallTableEditing1">

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: articles.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 25.5%; text-align: center">
              Наименование<br>работы
            </div>


            <div class="rightLine textMiniTable" style="width: 9.15%; text-align: center">
              Статус

            </div>

            <div class="rightLine textMiniTable" style="width: 12.65%; text-align: center">
              Индексация

            </div>

            <div class="rightLine textMiniTable" style="width: 7.21%; text-align: center">
              Импакт<br>-<br>фактор<br>издания
            </div>

            <div class="rightLine textMiniTable" style="width: 20.07%; text-align: center">
              Выходные<br>данные
            </div>

            <div class="rightLine textMiniTable" style="width: 4.926%; text-align: center">
              Объем<br>в стр
            </div>

            <div class="textMiniTable rightLine" style="width: 9.26%; text-align: center">
              Соавторы
            </div>

            <div class="textMiniTable" style="width: 6.0%; text-align: center">

            </div>

          </div>

          <div class="d-flex " :class="{ underline: index !== articles.length-1}" v-for="(article,index) in articles">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 25.5%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " v-model="article.name" rows="4" style="overflow-y:auto"></textarea>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 9.15%; text-align: center">
              <div style="height: 100%; width: 100%">
                <select class="textWithCarry inputBox" style="overflow: auto;width: 100%; word-break: break-all ;-webkit-appearance: none;height: calc(100%);" v-model="article.work_type">
                  <option>Принято в печать</option>
                  <option>Опубликовано</option>
                  <option>В процессе написания</option>
                </select>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 12.65%; text-align: center">

              <div style="height: 100%">
                <label class="textCheckBox inputBox text-start" >
                  <input type="checkbox"/>ВАК</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox"/>РИНЦ</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox"/>Scopus</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox"/>WoS</label>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 7.21%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox" rows="4" v-model="article.impact"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 20.07%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox" rows="4" v-model="article.output_data"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 4.926%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox" rows="4" v-model="article.volume"></textarea>
              </div>
            </div>

            <div class="textMiniTable rightLine" style="width: 9.26%; text-align: center; padding-right: 0" >
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="article.co_authors"></textarea>
              </div>
            </div>

            <div class="textMiniTable" style="width: 6%; text-align: center; padding-right: 0" >
              <button class="btnAddDeleteFiles mt-2" @click="deleteArticle(index)">
                <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>

    <div class="roundBlock" v-if="buttonIsOpened">
      <div class="d-flex justify-content-between">
        <nav class="mt-3" style="margin-left: 2.5%">
          <p class="headingSemester">Выступление на научных конференциях</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%">
          <button v-if="!smallTableEditing2" @click="buttonSmallTableClicked2" class="editBtn2 mt-3">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd2')">Добавить</button>
            <button class="editBtn2 mt-3 me-2" @click="cancelChange2">Отменить</button>
            <button class="editBtn2 mt-3 " @click="saveReports">Сохранить</button>
          </div>
        </nav>
      </div>
      <div class="roundBlock p-0 mt-2">

        <div v-if="!smallTableEditing2">
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: reports.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 27.5%; text-align: center">
              Наименование<br>доклада
            </div>


            <div class="rightLine textMiniTable" style="width: 11.15%; text-align: center">
              Статус

            </div>

            <div class="rightLine textMiniTable" style="width: 11.15%; text-align: center">
              Индексация

            </div>

            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              Название конференции
            </div>

            <div class="rightLine textMiniTable" style="width: 15.07%; text-align: center">
              Дата
            </div>

            <div class="textMiniTable" style="width: 10%; text-align: center">
              Место проведения
            </div>

          </div>

          <div class="d-flex " :class="{ underline: index !== reports.length-1}" v-for="(report,index) in reports">

            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>
            <div class="rightLine textMiniTable" style="width: 27.5%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{report.nameOfReport}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 11.15%;">
              <div style="height: 100%; display: table; overflow: hidden;">
                <select class="textWithCarry inputBox" style="-webkit-appearance: none;word-break: break-all; height: calc(100%)" v-model="report.stateOfReport" disabled>
                  <option>Зарегистрировался</option>
                  <option>Выступил</option>
                </select>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 11.15%;">
              <div style="height: 100%">
                <label class="textCheckBox inputBox text-start" >
                  <input type="checkbox" v-model="report.reportWorkType.vac" disabled/>ВАК</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.reportWorkType.rinc" disabled/>РИНЦ</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.reportWorkType.scopus" disabled/>Scopus</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.reportWorkType.wos" disabled/>WoS</label>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{report.nameOfConference}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 15.07%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{report.dateOfConference}}</div>
              </div>

            </div>
            <div class="textMiniTable" style="width: 10%; text-align: center">
              <div>
                <div class="textWithCarry inputBox "> {{report.place}}</div>
              </div>
            </div>
          </div>

        </div>

        <div v-if="smallTableEditing2">

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: reports.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 25.5%; text-align: center">
              Наименование<br>доклада
            </div>


            <div class="rightLine textMiniTable" style="width: 10.15%; text-align: center">
              Статус

            </div>

            <div class="rightLine textMiniTable" style="width: 14.65%; text-align: center">
              Индексация

            </div>

            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              Название конференции
            </div>

            <div class="rightLine textMiniTable" style="width: 10%; text-align: center">
              Дата
            </div>

            <div class="rightLine textMiniTable" style="width: 10%; text-align: center">
              Место проведения
            </div>


            <div class="textMiniTable" style="width: 7%; text-align: center">

            </div>

          </div>

          <div class="d-flex " :class="{ underline: index !== reports.length-1}" v-for="(report,index) in reports">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 25.5%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " v-model="report.nameOfReport" rows="4" style="overflow-y:auto"></textarea>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 10.15%; text-align: center">
              <div style="height: 100%">
                <select class="textWithCarry inputBox" style="-webkit-appearance: none;word-break: break-all; height: calc(100%)" v-model="report.stateOfReport">
                  <option>Зарегистрировался</option>
                  <option>Выступил</option>
                </select>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 14.65%; text-align: center">
              <div style="height: 100%">
                <label class="textCheckBox inputBox text-start" >
                  <input type="checkbox" v-model="report.reportWorkType.vac" />ВАК</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.reportWorkType.rinc"/>РИНЦ</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.reportWorkType.scopus"/>Scopus</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.reportWorkType.wos"/>WoS</label>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="report.nameOfConference"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 10%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="report.dateOfConference"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 10%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="report.place" style="word-break: break-all"></textarea>
              </div>
            </div>


            <div class="textMiniTable" style="width: 7%; text-align: center; padding-right: 0" >
              <button class="btnAddDeleteFiles mt-2" @click="deleteArticle(index)">
                <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>

    <div class="roundBlock" v-if="buttonIsOpened">
      <div class="d-flex justify-content-between">
        <nav class="mt-3" style="margin-left: 2.5%">
          <p class="headingSemester">Участие в научно-исследовательских проектах</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%">
          <button v-if="!smallTableEditing3" @click="buttonSmallTableClicked3" class="editBtn2 mt-3">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd3')">Добавить</button>
            <button class="editBtn2 mt-3 me-2" @click="cancelChange3">Отменить</button>
            <button class="editBtn2 mt-3 " @click="saveProjects">Сохранить</button>
          </div>
        </nav>
      </div>
      <div class="roundBlock p-0 mt-2">

        <div v-if="!smallTableEditing3">
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: projects.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              Наименование проекта (гранта)
            </div>


            <div class="rightLine textMiniTable" style="width: 12%; text-align: center">
              Дата начала

            </div>

            <div class="rightLine textMiniTable" style="width: 12%; text-align: center">
              Дата окончания
            </div>

            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              Дополнительная информация
            </div>

            <div class="textMiniTable" style="width: 20%; text-align: center">
              Грантодатель
            </div>


          </div>

          <div class="d-flex " :class="{ underline: index !== articles.length-1}" v-for="(project,index) in projects">

            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>
            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{project.nameOfProject}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 12%;">
              <div class="textWithCarry inputBox ">{{project.dateOfBeggining}}</div>
            </div>

            <div class="rightLine textMiniTable" style="width: 12%;">
              <div class="textWithCarry inputBox ">{{project.dateOfEnding}}</div>
            </div>


            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{project.additionalinfo}}</div>
              </div>

            </div>
            <div class="textMiniTable" style="width: 20%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{project.grantGiver}}</div>
              </div>

            </div>

          </div>

        </div>

        <div v-if="smallTableEditing3">

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: projects.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 22.5%; text-align: center">
              Наименование проекта (гранта)
            </div>


            <div class="rightLine textMiniTable" style="width: 12%; text-align: center">
              Дата начала

            </div>

            <div class="rightLine textMiniTable" style="width: 12%; text-align: center">
              Дата окончания
            </div>

            <div class="rightLine textMiniTable" style="width: 22.5%; text-align: center">
              Дополнительная информация
            </div>

            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              Грантодатель
            </div>
            <div class="textMiniTable" style="width: 7%; text-align: center">

            </div>

          </div>

          <div class="d-flex " :class="{ underline: index !== projects.length-1}" v-for="(project,index) in projects">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 22.5%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " v-model="project.nameOfProject" rows="4" style="overflow-y:auto"></textarea>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 12%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox " v-model="project.dateOfBeggining" rows="4" style="overflow-y:auto"></textarea>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 12%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="project.dateOfEnding"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 22.5%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="project.additionalinfo"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="project.grantGiver"></textarea>
              </div>
            </div>


            <div class="textMiniTable" style="width: 7%; text-align: center; padding-right: 0" >
              <button class="btnAddDeleteFiles mt-2" @click="deleteArticle(index)">
                <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>


  </div>




</template>

<script>
export default {
  name: "tabOfArticles",
  props: ["articles", "id", "waitForCheck"],
  data() {
    return {
      buttonIsOpened : false,
      smallTableEditing1 : false,
      smallTableEditing2 : false,
      smallTableEditing3 : false,

      reports : [{
        nameOfReport : 'доклад 1',
        stateOfReport : 'Зарегистрировался',
        reportWorkType : {
          'vac' : true,
          'scopus' : false,
          'rinc' : true,
          'wos' : true,
        },
        nameOfConference : "Конференция 1",
        dateOfConference : '20.02.4621',
        place : '21 street 122 avenu',

      },
        {
          nameOfReport : 'доклад 2',
          stateOfReport : 'Выступил',
          reportWorkType : {
            'vac' : true,
            'scopus' : true,
            'rinc' : true,
            'wos' : false,
          },
          nameOfConference : "Конференция 2",
          dateOfConference : '6.12.1621',
          place : '21 street 122 avenu',
        },
      ],
      projects : [
        {
          nameOfProject: "Проект 1",
          dateOfBeggining: "12.12.12",
          dateOfEnding: "13.13.13",
          additionalinfo: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
          grantGiver : "Грантодатель",
        },
        {
          nameOfProject: "Проект 2",
          dateOfBeggining: "14.14.14",
          dateOfEnding: "15.15.15",
          additionalinfo: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
          grantGiver : "Грантодатель2",
        }
      ]
    }
  },
  methods : {
    buttonClicked(){
      if (this.buttonIsOpened === true)
        this.smallTableEditing = false

      this.buttonIsOpened = !this.buttonIsOpened
    },
    buttonSmallTableClicked1(){

      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.smallTableEditing1 = !this.smallTableEditing1
      this.$emit("makeCopy")
    },
    buttonSmallTableClicked2(){
      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.smallTableEditing2 = !this.smallTableEditing2
      this.$emit("makeCopy")
    },
    buttonSmallTableClicked3(){
      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.smallTableEditing3 = !this.smallTableEditing3
      this.$emit("makeCopy")
    },
    saveArticles(){
      this.smallTableEditing1 = !this.smallTableEditing1
      this.$emit('saveArticles')


    },
    saveReports(){
      this.smallTableEditing2 = !this.smallTableEditing2
      this.$emit('saveReports')


    },
    saveProjects(){
      this.smallTableEditing3 = !this.smallTableEditing3
      this.$emit('saveProjects')

    },
    cancelChange1(){
      this.$emit('updatePage')
      this.smallTableEditing1 = !this.smallTableEditing1
    },
    cancelChange2(){
      this.$emit('updatePage')
      this.smallTableEditing2 = !this.smallTableEditing2
    },
    cancelChange3(){
      this.$emit('updatePage')
      this.smallTableEditing3 = !this.smallTableEditing3
    },

    deleteArticle(myIndex){
      this.$emit('deleteArticle', myIndex)
    }
  },

  beforeMount() {
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

@media (min-width: 800px) {
  .headingSemester {

    margin-top:1%;
    margin-left: 1%;
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:1.3rem;

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


  .trashLogo{
    width:32px !important;
    height: 32px !important;
  }

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:1.1rem;
    text-align: center;
    word-break: break-word;
    padding-left:0.1rem;
    padding-right: 0.1rem;

  }

  .textWithCarry{
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
  }

  .textCheckBox {
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
    font-size: 0.95rem;
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

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }


  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    font-size: 1.1rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

  }
}

@media (max-width: 800px) {
  .headingSemester {

    margin-top:1%;
    margin-left: 1%;
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:1.1rem;

  }

  .semestrImgActive{
    width: 50px;
  }

  .semestrButtonActive {
    border:0 !important;
    width: 3%;
    height: 100%;
    max-width: 42px;
    margin-top: 0 !important;
    background-color: white;
    margin-right: 2rem;
  }


  .trashLogo{
    width:25px !important;
    height: 25px !important;
  }

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.9rem;
    text-align: center;
    word-break: break-word;
    padding-left:0.1rem;
    padding-right: 0.1rem;
  }

  .textWithCarry{
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
  }

  .textCheckBox {
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
    font-size: 0.8rem;
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

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }


  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    font-size: 0.9rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .headingSemester {

    margin-top:0.5%;
    margin-left: 1%;
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:0.7rem;

  }

  .semestrImgActive{
    width: 30px;
  }

  .semestrButtonActive {
    border:0 !important;
    width: 3%;
    height: 100%;
    max-width: 42px;
    margin-top: 0 !important;
    background-color: white;
    margin-right: 1rem;
  }


  .trashLogo{
    width:15px !important;
    height: 15px !important;

  }

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.5rem;
    text-align: center;
    word-break: break-word;
    padding-left:0.1rem;
    padding-top: 0.2rem;
    padding-right: 0.1rem;
  }

  .textWithCarry{
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
  }

  .textCheckBox {
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
    font-size: 0.5rem !important;
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

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }


  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    font-size: 0.7rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

  }
}


</style>