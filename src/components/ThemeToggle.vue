<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{(e: "newTheme", theme: "dark" | "light"): void}>();

let theme = ref<"dark" | "light">("light");

function switchMode() {
    if(theme.value === "dark") {
        theme.value = "light";
    } else {
        theme.value = "dark";
    }
    emit("newTheme", theme.value);
}

</script>
<template>
<div @click="switchMode" class="rounded-full hover:bg-alabaster px-2 text-woodsmoke font-semibold select-none">
    <div v-if="theme === 'dark'">
        <i class="fa-regular fa-moon mr-3"></i>
        <span>Dark Mode</span>
    </div>
    <div v-else>
        <i class="fa-regular fa-sun mr-3"></i>
        <span>Light Mode</span>
    </div>
</div>
</template>
