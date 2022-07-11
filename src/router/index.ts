import { createRouter, createWebHashHistory } from "vue-router";

import AppHome from "@/views/HomeView.vue";
import AppCountryPage from "@/views/CountryView.vue";

const routes = [
    {path: "/home", component: AppHome, alias: ["/"]},
    {path: "/country/:countryCCA2", component: AppCountryPage}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;