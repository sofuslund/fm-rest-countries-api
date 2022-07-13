import { createRouter, createWebHashHistory } from "vue-router";

import AppHome from "@/views/HomeView.vue";
import AppCountryPage from "@/views/CountryView.vue";

type ScrollPositionNormalized = {
    behavior?: ScrollOptions['behavior']
    left: number
    top: number
}
declare module "vue-router" {
    interface RouteMeta {
        scrollPos?: ScrollPositionNormalized
    }
}

const routes = [
    {
        path: "/home", 
        component: 
        AppHome, 
        alias: ["/"], 
        meta: {
            scrollPos: {top: 0, left: 0}
        }
    },
    {path: "/countries/:cca2", name: "countries", component: AppCountryPage, props: true}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        let savedPos = {top: 0};

        
        if(savedPosition) {
            savedPos = savedPosition;
        }
        else if(to.meta.scrollPos) {
            savedPos = to.meta.scrollPos as any;
        }

        return new Promise((resolve, reject) => {
            // create an Observer instance
            const resizeObserver = new ResizeObserver(entries => {
                if(entries[0].target.clientHeight >= savedPos.top + screen.height) {
                    resolve({...savedPos, behavior: "smooth"});
                    resizeObserver.disconnect();
                }
            });
            
            // start observing a DOM node
            resizeObserver.observe(document.body);
        });
    },
});

router.beforeEach((to, from) => {
    if(from.meta.scrollPos)
        from.meta.scrollPos.top = from.meta.scrollPos ? window.scrollY : 0;
});

export default router;