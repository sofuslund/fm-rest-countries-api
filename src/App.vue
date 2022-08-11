<script setup lang="ts">
import { ref, onMounted } from "vue";

import ThemeToggle from "@/components/ThemeToggle.vue";

let theme = ref<Theme>(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

onMounted(() => {
    let savedTheme = localStorage.getItem("theme");
    if(savedTheme)
        theme.value = savedTheme as Theme;
});

</script>

<template>
    <div :class="{dark: theme === 'dark'}">
        <div class="bg-alabaster dark:bg-ebony-clay min-h-screen">
            <div class="py-7 px-5 bg-white dark:bg-oxford-blue shadow-md dark:shadow-md-dark relative z-10">
                    <RouterLink to="/home">
                        <h1 class="font-extrabold inline dark:text-white">Where in the world?</h1>
                    </RouterLink>
                    <ThemeToggle v-model="theme" save-item="theme" class="float-right"></ThemeToggle>
                </div>
            
            <RouterView v-slot="{Component, route}">
                <KeepAlive>
                    <component :is="Component" :key="route.fullPath"></component>
                </KeepAlive>
            </RouterView>
        </div>
    </div>
</template>
