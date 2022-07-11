<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ country: Country}>();

const capital = computed(() => {
    // The country might not have a capital 
    if(!props.country.hasOwnProperty("capital")) {
        return "None";
    }
    // The country capital is an array as it may have more capitals. In that case the capitals should be displayed with commas in between
    if(props.country.capital !== undefined)
        return props.country.capital.join(", ");
});
</script>
<template>
    <div class="">
        <div class="cursor-pointer rounded-lg overflow-hidden mx-auto">
            <img class="h-[10.5rem] w-full object-cover" :src="country.flags.svg" alt="flag">
            <div class="bg-white dark:bg-oxford-blue overflow-hidden">
                <div class="pl-7 py-3 h-[12rem]">
                    <h1 class="my-3 font-extrabold dark:font-semibold text-xl text-woodsmoke dark:text-white">{{country.name.common}}</h1>
                    <p class="font-extrabold dark:font-extralight text-oxford-blue dark:text-white">Population: <span class="text-gray font-semibold">{{country.population.toLocaleString()}}</span></p>
                    <p class="font-extrabold dark:font-extralight text-oxford-blue dark:text-white">Region: <span class="text-gray font-semibold">{{country.region}}</span></p>
                    <p class="mb-8 font-extrabold dark:font-extralight text-oxford-blue dark:text-white">Capital: <span class="text-gray font-semibold">{{capital}}</span></p>
                </div>
            </div>
        </div>
        
    </div>
</template>
