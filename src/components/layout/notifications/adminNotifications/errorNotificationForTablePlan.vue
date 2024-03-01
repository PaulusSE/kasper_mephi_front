<template>

  <Transition name="slide-fade" v-if="show">
    <div class="v-notification">
      <div class="alert alert-danger" role="alert">
        <img src="../../../../../static/figures/triangle.svg" alt="failedSending" class="failedSendingImage">
        Значения плана обучения должны быть целыми числами
      </div>
    </div>
  </Transition>

</template>

<script>
export default {
  name: "errorNotificationForTablePlan",
  props : ["show"],
  data() {
    return {
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
  width:200px
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