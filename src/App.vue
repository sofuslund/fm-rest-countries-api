<script setup lang="ts">
import { ref } from "vue";

import ThemeToggle from "@/components/ThemeToggle.vue";

let theme = ref<Theme>("light");
</script>

<template>
    <div :class="{dark: theme === 'dark'}">
        <div class="bg-alabaster dark:bg-ebony-clay h-screen">
            <router-link to="/home">
                <div class="py-7 px-5 bg-white dark:bg-oxford-blue shadow-md dark:shadow-md-dark relative z-10">
                    <h1 class="font-extrabold inline dark:text-white">Where in the world?</h1>
                    <ThemeToggle v-model="theme" class="float-right"></ThemeToggle>
                </div>
            </router-link>
            

            <router-view class="relative"></router-view>
        </div>
    </div>
</template>
