<template>
  <link href="../../static/css/studentProfile.css" rel="stylesheet">
  <link href="static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <Transition name="slide-fade">
    <div class="v-notification">
      <div class="alert alert-success" role="alert" v-if="resultOfSending">
        <img src="static/figures/check.svg" alt="successSending" class="successSendingImage">
        Отправлено
      </div>
      <div class="alert alert-danger" role="alert" v-if="!resultOfSending">
        <img src="static/figures/triangle.svg" alt="failedSending" class="failedSendingImage">
        Что-то пошло не так
      </div>
    </div>
  </Transition>

</template>

<script>
export default {
  name: "sendingFilesNotification",
  props : ["resultOfSending"],
  data() {
    return {
      show: false
    }
  }
}
</script>

<style>
.v-notification{
  position: fixed;
  top:100px;
  right: 16px;
  z-index: 10;
}

.v-notificationContent{
  padding:16px;
  border-radius: 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: space-between;
  margin-bottom: 16px;

}

.successSendingImage{
  width: 25px;
  margin-top: -3px;
  padding-right:5px;
}

.failedSendingImage{
  width: 25px;
  margin-top: -3px;
  padding-right:5px;
}


.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


</style>