<script setup lang="ts">
import { computed } from '@vue/reactivity';

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
    <div class="w-[17rem] rounded-xl overflow-hidden mx-auto">
        <img class="w-full" :src="country.flags.svg" alt="">
        <div class="bg-white overflow-hidden">
            <div class="pl-7 py-3">
                <h1 class="my-3 font-extrabold text-xl text-woodsmoke">{{country.name.common}}</h1>
                <p class="font-extrabold text-oxford-blue">Population: <span class="text-gray font-semibold">{{country.population.toLocaleString()}}</span></p>
                <p class="font-extrabold text-oxford-blue">Region: <span class="text-gray font-semibold">{{country.region}}</span></p>
                <p class="mb-8 font-extrabold text-oxford-blue">Capital: <span class="text-gray font-semibold">{{capital}}</span></p>
            </div>
        </div>
    </div>
</template>
