import { createApp } from 'vue'
import App from './App';
import router from "@/router/router";
import store from '@/store';
import VueApexCharts from "vue3-apexcharts";




createApp(App)
    .use(router)
    .use(store)
    .use(VueApexCharts)
    .mount('#app');

