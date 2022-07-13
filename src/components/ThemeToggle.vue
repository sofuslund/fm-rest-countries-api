<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const emit = defineEmits<{(e: "update:modelValue", val: Theme): void}>();
const props = defineProps<{modelValue: Theme, saveItem?: string}>();

let theme = ref<Theme>(props.modelValue);

watch(() => props.modelValue, val => {
    theme.value = val;
    if(props.saveItem) {
        localStorage.setItem(props.saveItem, val); 
    }
});

function switchTheme() {
    if(theme.value === "dark") {
        theme.value = "light";
    } else {
        theme.value = "dark";
    }
    
    if(props.saveItem)
        localStorage.setItem(props.saveItem, theme.value);
    emit("update:modelValue", theme.value);
}

</script>
<template>
<div @click="switchTheme" class="rounded-full hover:bg-alabaster dark:hover:bg-ebony-clay px-2 text-woodsmoke dark:text-white font-semibold select-none">
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
