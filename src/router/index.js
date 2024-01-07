import {createRouter, createWebHistory} from "vue-router";
import Authorization from "@/components/layout/authorization.vue";

import authorization from "@/components/layout/authorization.vue";
import pageNotFound from "@/components/layout/pageNotFound.vue";
import users from "@/views/users.vue";
import profile from "@/components/layout/profile.vue";
import studentPageFromTeacher from "@/components/layout/teacherComponents/studentPageFromTeacher.vue";
import registration from "@/components/layout/registration.vue";
import forgetPassword from "@/components/layout/forgetPassword.vue";
import teacherPageForAdmin from "@/components/layout/adminComponents/teacherPageForAdmin.vue";
import studentPageMainComponent from "@/components/layout/teacherComponents/studentPageMainComponent.vue";
import techWorks from "@/components/layout/techWorks.vue";



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', component: users
        },
        {
            path:'/auth', component:authorization,
        },
        {
            path:'/registration', component:registration,
        },
        {
            path: '/profile', component: profile
        },
        {
          path: '/user', component: studentPageMainComponent
        },
        {
            path: '/user2', component: teacherPageForAdmin
        },
        {
            path: '/passwordrecovery', component: forgetPassword
        },
        {
            path: '/information', component: techWorks
        },
        {
            path: '/:pathMatch(.*)*', component: pageNotFound
        },
    ]
})


export default router