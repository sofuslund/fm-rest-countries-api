<script setup lang="ts">
import { ref } from "vue";

import ThemeToggle from "@/components/ThemeToggle.vue";

let theme = ref<Theme>("light");
</script>

<template>
    <div :class="{dark: theme === 'dark'}">
        <div class="bg-alabaster dark:bg-ebony-clay h-screen">
            <RouterLink to="/home">
                <div class="py-7 px-5 bg-white dark:bg-oxford-blue shadow-md dark:shadow-md-dark relative z-10">
                    <h1 class="font-extrabold inline dark:text-white">Where in the world?</h1>
                    <ThemeToggle v-model="theme" class="float-right"></ThemeToggle>
                </div>
            </RouterLink>
            
            <RouterView class="relative" v-slot="{Component, route}">
                <KeepAlive>
                    <component :is="Component" :key="route.fullPath" ></component>
                </KeepAlive>
            </RouterView>
        </div>
    </div>
</template>
