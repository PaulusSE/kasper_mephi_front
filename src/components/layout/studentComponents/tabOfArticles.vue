<template>




  <div class="roundBlock">

    <div class="d-flex justify-content-between">

      <p class="headingSemester highLightActualSemester" v-if="this.actualSemester === id+1">{{id + 1}} семестр (текущий)</p>
      <p class="headingSemester" v-else>{{id + 1}} семестр</p>

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
        <nav class="text-end" style="margin-right: 2.5%" v-if="!(this.actualSemester === id+1)&&canEdit&&!waitForCheck||(this.actualSemester === id+1)&&!canEdit&&!waitForCheck||(this.actualSemester === id+1)&&canEdit&&!waitForCheck">
          <button v-if="!smallTableEditing1" @click="buttonSmallTableClicked1" :disabled="waitForCheck" :class="{disabledText : waitForCheck}" class="editBtn2 mt-3">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd1')" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Добавить</button>
            <button class="editBtn2 mt-3 me-2" @click="cancelChange1" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Отменить</button>
            <button class="editBtn2 mt-3 " @click="saveArticles" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Сохранить</button>
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
              <div class="textWithCarry inputBox ">{{this.publicationMap[article.status]}}</div>
            </div>

            <div class="rightLine textMiniTable" style="width: 10.15%;">

              <div style="height: 100%">
                <label class="textCheckBox inputBox text-start " >
                  <input type="checkbox" v-model="article.wac" disabled/>ВАК</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="article.rinc" disabled/>РИНЦ</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="article.scopus" disabled/>Scopus</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="article.wos" disabled/>WoS</label>
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
              Наименование<br>работы*
            </div>


            <div class="rightLine textMiniTable" style="width: 10.15%; text-align: center">
              Статус*

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

            <div class="textMiniTable rightLine" style="width: 10.26%; text-align: center">
              Соавторы
            </div>

            <div class="textMiniTable" style="width: 4.0%; text-align: center">

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


            <div class="rightLine textMiniTable" style="width: 10.15%; text-align: center">
              <div style="height: 100%; width: 100%">
                <select class="textWithCarry inputBox" style="overflow: auto;width: 100%; word-break: break-all ;-webkit-appearance: none;height: calc(100%);" v-model="article.status">
                  <option value="to print">Принято в печать</option>
                  <option value="published">Опубликовано</option>
                  <option value="in progress">В процессе написания</option>
                </select>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 12.65%; text-align: center">

              <div style="height: 100%">
                <label class="textCheckBox inputBox text-start" >
                  <input type="checkbox" v-model="article.wac" />ВАК</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="article.rinc"/>РИНЦ</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="article.scopus"/>Scopus</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="article.wos"/>WoS</label>
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

            <div class="textMiniTable rightLine" style="width: 10.26%; text-align: center; padding-right: 0" >
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="article.co_authors"></textarea>
              </div>
            </div>

            <div class="textMiniTable" style="width: 4%; text-align: center; padding-right: 0" >
              <button class="btnAddDeleteFiles mt-2" @click="deleteArticle(index)" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">
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
        <nav class="text-end" style="margin-right: 2.5%" v-if="!(this.actualSemester === id+1)&&canEdit&&!waitForCheck||(this.actualSemester === id+1)&&!canEdit&&!waitForCheck||(this.actualSemester === id+1)&&canEdit&&!waitForCheck">

          <button v-if="!smallTableEditing2" @click="buttonSmallTableClicked2" class="editBtn2 mt-3" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd2')" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Добавить</button>
            <button class="editBtn2 mt-3 me-2" @click="cancelChange2" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Отменить</button>
            <button class="editBtn2 mt-3 " @click="saveReports" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Сохранить</button>
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
                <div class="textWithCarry inputBox ">{{report.report_name}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 11.15%;">
              <div>
                <div class="textWithCarry inputBox ">{{this.conferenceMap[report.status]}}</div>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 11.15%;">
              <div style="height: 100%">
                <label class="textCheckBox inputBox text-start" >
                  <input type="checkbox" v-model="report.wac" disabled/>ВАК</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.rinc" disabled/>РИНЦ</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.scopus" disabled/>Scopus</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.wos" disabled/>WoS</label>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{report.conference_name}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 15.07%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{report.reported_at.slice(0,10)}}</div>
              </div>

            </div>
            <div class="textMiniTable" style="width: 10%; text-align: center">
              <div>
                <div class="textWithCarry inputBox "> {{report.location}}</div>
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
              Наименование<br>доклада*
            </div>


            <div class="rightLine textMiniTable" style="width: 11.15%; text-align: center">
              Статус*

            </div>

            <div class="rightLine textMiniTable" style="width: 14.65%; text-align: center">
              Индексация

            </div>

            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              Название конференции*
            </div>

            <div class="rightLine textMiniTable" style="width: 11%; text-align: center">
              Дата*
            </div>

            <div class="rightLine textMiniTable" style="width: 11%; text-align: center">
              Место проведения
            </div>


            <div class="textMiniTable" style="width: 4%; text-align: center">

            </div>

          </div>

          <div class="d-flex " :class="{ underline: index !== reports.length-1}" v-for="(report,index) in reports">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 25.5%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " v-model="report.report_name" rows="4" style="overflow-y:auto"></textarea>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 11.15%; text-align: center">
              <div style="height: 100%">
                <select class="textWithCarry inputBox" style="-webkit-appearance: none;word-break: break-all; height: calc(100%)" v-model="report.status">
                  <option value="registered">Зарегистрировался</option>
                  <option value="performed ">Выступил</option>
                </select>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 14.65%; text-align: center">
              <div style="height: 100%">
                <label class="textCheckBox inputBox text-start" >
                  <input type="checkbox" v-model="report.wac" />ВАК</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.rinc"/>РИНЦ</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.scopus"/>Scopus</label>
                <label class="textCheckBox inputBox text-start">
                  <input type="checkbox" v-model="report.wos"/>WoS</label>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="report.conference_name"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 11%; text-align: center">

              <div>
                <input class="textWithCarry inputBox "  type="date" min="2000-01-01" v-model="report.reported_at"></input>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 11%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="report.location" style="word-break: break-all"></textarea>
              </div>
            </div>


            <div class="textMiniTable" style="width: 4%; text-align: center; padding-right: 0" >
              <button class="btnAddDeleteFiles mt-2" @click="deleteReport(index)" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">
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
        <nav class="text-end" style="margin-right: 2.5%" v-if="!(this.actualSemester === id+1)&&canEdit&&!waitForCheck||(this.actualSemester === id+1)&&!canEdit&&!waitForCheck||(this.actualSemester === id+1)&&canEdit&&!waitForCheck">

          <button v-if="!smallTableEditing3" @click="buttonSmallTableClicked3" class="editBtn2 mt-3" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd3')" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Добавить</button>
            <button class="editBtn2 mt-3 me-2" @click="cancelChange3" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Отменить</button>
            <button class="editBtn2 mt-3 " @click="saveProjects" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Сохранить</button>
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

          <div class="d-flex " :class="{ underline: index !== projects.length-1}" v-for="(project,index) in projects">

            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>
            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{project.project_name}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 12%;">
              <div class="textWithCarry inputBox ">{{project.start_at.slice(0,10)}}</div>
            </div>

            <div class="rightLine textMiniTable" style="width: 12%;">
              <div class="textWithCarry inputBox ">{{project.end_at.slice(0,10)}}</div>
            </div>


            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{project.add_info}}</div>
              </div>

            </div>
            <div class="textMiniTable" style="width: 20%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{project.grantee}}</div>
              </div>

            </div>

          </div>

        </div>

        <div v-if="smallTableEditing3">

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: projects.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 23.5%; text-align: center">
              Наименование проекта (гранта)*
            </div>


            <div class="rightLine textMiniTable" style="width: 13%; text-align: center">
              Дата начала*

            </div>

            <div class="rightLine textMiniTable" style="width: 13%; text-align: center">
              Дата окончания*
            </div>

            <div class="rightLine textMiniTable" style="width: 22.5%; text-align: center">
              Дополнительная информация
            </div>

            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              Грантодатель
            </div>
            <div class="textMiniTable" style="width: 4%; text-align: center">

            </div>

          </div>

          <div class="d-flex " :class="{ underline: index !== projects.length-1}" v-for="(project,index) in projects">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 23.5%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " v-model="project.project_name" rows="4" style="overflow-y:auto"></textarea>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 13%; text-align: center">

              <div>
                <input class="textWithCarry inputBox" v-model="project.start_at" type="date" min="2000-01-01" style="overflow-y:auto"></input>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 13%; text-align: center">

              <div>
                <input class="textWithCarry inputBox " type="date" min="2000-01-01" v-model="project.end_at"></input>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 22.5%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="project.add_info"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="project.grantee"></textarea>
              </div>
            </div>


            <div class="textMiniTable" style="width: 4%; text-align: center; padding-right: 0" >
              <button class="btnAddDeleteFiles mt-2" @click="deleteProject(index)" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">
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
          <p class="headingSemester">Патенты</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%" v-if="!(this.actualSemester === id+1)&&canEdit&&!waitForCheck||(this.actualSemester === id+1)&&!canEdit&&!waitForCheck||(this.actualSemester === id+1)&&canEdit&&!waitForCheck">

          <button v-if="!smallTableEditing4" @click="buttonSmallTableClicked4" class="editBtn2 mt-3" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd4')" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Добавить</button>
            <button class="editBtn2 mt-3 me-2" @click="cancelChange4" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Отменить</button>
            <button class="editBtn2 mt-3 " @click="savePatents" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Сохранить</button>
          </div>
        </nav>
      </div>
      <div class="roundBlock p-0 mt-2">

        <div v-if="!smallTableEditing4">
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: patents.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 35%; text-align: center">
              Наименование патента
            </div>


            <div class="textMiniTable rightLine" style="width: 35%; text-align: center">
             Тип
            </div>

            <div class="textMiniTable" style="width: 18%; text-align: center">
              Дата
            </div>



          </div>

          <div class="d-flex " :class="{ underline: index !== patents.length-1}" v-for="(patent,index) in patents">

            <div class="rightLine textMiniTable" style="width: 10%; text-align: center">

              {{index + 1}}
            </div>
            <div class="rightLine textMiniTable" style="width: 35%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{patent.patent_name}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 35%;">
              <div class="textWithCarry inputBox ">{{this.patentsMap[patent.patent_type]}}</div>

            </div>

            <div class="textMiniTable" style="width: 18%;">
              <div class="textWithCarry inputBox">{{patent.date.slice(0,10)}}</div>
            </div>

          </div>

        </div>

        <div v-if="smallTableEditing4">

          <div class="d-flex " style="vertical-align: baseline;" :class="{ underline: patents.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">
              Наименование патента*
            </div>


            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">
              Тип*
            </div>

            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              Дата*
            </div>

            <div class="textMiniTable" style="width: 6%; text-align: center">

            </div>

          </div>

          <div class="d-flex" :class="{ underline: index !== patents.length-1}" v-for="(patent,index) in patents">
            <div class="rightLine textMiniTable" style="width: 10%; text-align: center">

              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " v-model="patent.patent_name" rows="4" style="overflow-y:auto"></textarea>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">

              <div style="height: 100%; width: 100%">
                <select class="textWithCarry inputBox" style="overflow: auto;width: 100%; word-break: break-all ;-webkit-appearance: none;height: calc(100%);"  v-model="patent.patent_type">
                  <option value="software">Свидетельство о регистрации программ ЭВМ</option>
                  <option value="database">Свидетельство о регистрации базы данных</option>
                </select>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              <div>
                <input class="textWithCarry inputBox " type="date" min="2000-01-01"  v-model="patent.date">
              </div>
            </div>



            <div class="textMiniTable" style="width: 6%; text-align: center; padding-right: 0" >
              <button class="btnAddDeleteFiles mt-2" @click="deletePatents(index)" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">
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
import axios from "axios";

export default {
  name: "tabOfArticles",
  props: ["articles", "reports", "projects", "id", "waitForCheck", "actualSemester", "canEdit", "patents", "buttonIsOpened"],
  data() {
    return {
      smallTableEditing1 : false,
      smallTableEditing2 : false,
      smallTableEditing3 : false,
      smallTableEditing4 : false,
      deleteArticlesID : [],
      deleteProjectsID : [],
      deleteReportsID : [],
      deletePatentsID: [],
      publicationMap: {
        "to print" : "Принято в печать",
        "published" : "Опубликовано",
        "in progress": "В процессе написания"
      },
      conferenceMap: {
        "registered" : "Зарегистрировался",
        "performed" : "Выступил",
      },
      patentsMap: {
        "software" : "Свидетельство о регистрации программ ЭВМ",
        "database" : "Свидетельство о регистрации базы данных",
      }
    }
  },
  methods : {
    buttonClicked(){
      this.$emit('changeTabState')
    },

    buttonSmallTableClicked1(){

      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.smallTableEditing1 = !this.smallTableEditing1
      this.$emit("makeCopy", 1)
    },
    buttonSmallTableClicked2(){
      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.smallTableEditing2 = !this.smallTableEditing2
      this.$emit("makeCopy", 2)
    },
    buttonSmallTableClicked3(){
      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.smallTableEditing3 = !this.smallTableEditing3
      this.$emit("makeCopy", 3)
    },

    buttonSmallTableClicked4(){
      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.smallTableEditing4= !this.smallTableEditing4
      this.$emit("makeCopy", 4)
    },

    async saveArticles(){
      this.smallTableEditing1 = !this.smallTableEditing1

      if(this.deleteArticlesID.length !== 0)
      {
        try {
          const response = await axios.put(this.IP +'/students/works/publications/' + localStorage.getItem("access_token"),
              {
                "ids" : this.deleteArticlesID,
                "semester" : this.id + 1
              }
          )
        }
        catch (e) {
          console.log(e)
        }
      }

      this.$emit('saveArticles')

    },
    async saveReports(){
      this.smallTableEditing2 = !this.smallTableEditing2


      if(this.deleteReportsID.length !== 0)
      {
        try {
          const response = await axios.put(this.IP +'/students/works/conferences/' + localStorage.getItem("access_token"),
              {
                "ids" : this.deleteReportsID,
                "semester" : this.id + 1
              }
          )
        }
        catch (e) {
          console.log(e)
        }
      }


      this.$emit('saveReports')


    },
    async saveProjects(){
      this.smallTableEditing3 = !this.smallTableEditing3



      if(this.deleteProjectsID.length !== 0)
      {
        try {
          const response = await axios.put(this.IP +'/students/works/projects/' + localStorage.getItem("access_token"),
              {
                "ids" : this.deleteProjectsID,
                "semester" : this.id + 1
              }
          )
        }
        catch (e) {
          console.log(e)
        }
      }


      this.$emit('saveProjects')

    },

    async savePatents(){
      this.smallTableEditing4 = !this.smallTableEditing4



      if(this.deletePatentsID.length !== 0)
      {
        try {
          const response = await axios.put(this.IP +'/students/works/patents/' + localStorage.getItem("access_token"),
              {
                "ids" : this.deletePatentsID,
                "semester" : this.id + 1
              }
          )
        }
        catch (e) {
          console.log(e)
        }
      }


      this.$emit('savePatents')

    },

    cancelChange1(){
      this.$emit('updatePage', 1)
      this.deleteArticlesID.length = 0
      this.smallTableEditing1 = !this.smallTableEditing1
    },
    cancelChange2(){
      this.$emit('updatePage', 2)
      this.deleteReportsID.length = 0
      this.smallTableEditing2 = !this.smallTableEditing2
    },
    cancelChange3(){
      this.$emit('updatePage', 3)
      this.deleteProjectsID.length = 0
      this.smallTableEditing3 = !this.smallTableEditing3
    },
    cancelChange4(){
      this.$emit('updatePage', 4)
      this.deletePatentsID.length = 0
      this.smallTableEditing4 = !this.smallTableEditing4
    },

    deleteArticle(myIndex){
      this.deleteArticlesID.push(this.articles[myIndex].publication_id)
      this.$emit('deleteArticle', myIndex)
    },
    deleteReport(myIndex){
      this.deleteReportsID.push(this.reports[myIndex].conference_id)
      this.$emit('deleteReport', myIndex)
    },
    deleteProject(myIndex){
      this.deleteProjectsID.push(this.projects[myIndex].project_id)
      this.$emit('deleteProject', myIndex)
    },
    deletePatents(myIndex){
      this.deletePatentsID.push(this.patents[myIndex].patent_id)
      this.$emit('deletePatent', myIndex)

    }
  },

  beforeMount() {
console.log()
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

.highLightActualSemester{
  color:#1c9931 !important;
  font-weight: 700! important;
  font-size:1.3rem !important
}

.disabledText {
  color: grey !important;
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