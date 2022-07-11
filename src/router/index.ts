import { createRouter, createWebHashHistory } from "vue-router";

import AppHome from "@/views/HomeView.vue";
import AppCountryPage from "@/views/CountryView.vue";

const routes = [
    {path: "/home", component: AppHome, alias: ["/"]},
    {path: "/countries/:cca2", name: "countries", component: AppCountryPage, props: true}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;