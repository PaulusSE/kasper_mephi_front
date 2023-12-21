<script>
import authorization from "@/components/layout/authorization.vue"
import PageNotFound from "@/components/layout/pageNotFound.vue";


export default {
  name: "app",
  components: {
    PageNotFound,
    "authorization" :authorization,
    "page-not-found" : PageNotFound
  }
}
</script>


<template>
<router-view></router-view>

</template>


<style scoped>

</style>
