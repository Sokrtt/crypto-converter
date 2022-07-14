import {createRouter, createWebHistory} from "vue-router";
import Profile from "@/pages/Profile";
import Converter from "@/pages/Converter"


const routes = [
    {
        path: '/',
        component: Converter
    },
    {
        path: '/lk',
        component: Profile
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;
