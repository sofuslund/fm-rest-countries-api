import { createRouter, createWebHashHistory } from "vue-router";
import { nextTick } from "vue";

import AppHome from "@/views/HomeView.vue";
import AppCountryPage from "@/views/CountryView.vue";

const routes = [
    {path: "/home", component: AppHome, alias: ["/"]},
    {path: "/countries/:cca2", name: "countries", component: AppCountryPage, props: true}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            if(savedPosition) {
                // create an Observer instance
                const resizeObserver = new ResizeObserver(entries => {
                    if(entries[0].target.clientHeight >= savedPosition.top + screen.height) {
                        console.log(entries[0].target.clientHeight, screen.height, savedPosition.top + screen.height, savedPosition);
                        resolve({...savedPosition, behavior: "smooth"});
                        resizeObserver.disconnect();
                    }
                });
                
                // start observing a DOM node
                resizeObserver.observe(document.body);
            } else {
                resolve({ top: 0 });
            }
        });
    },
});
export default router;