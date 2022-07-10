<script setup lang="ts">
import { computed, ref } from 'vue';

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

let expanded = ref(false);

const infoBlocks = computed(() => {
    let n1 = {
        "Native Name": "",
        "Population": props.country.population.toLocaleString(),
        "Region": props.country.region,
        "Sub Region": props.country.subregion,
        "Capital": props.country.capital === undefined ? "No capital" : props.country.capital.join(", "),
    };
    if("nativeName" in props.country.name) {
        n1["Native Name"] = Object.values(props.country.name.nativeName!).map(val => val.common).join(", ");
    } else {
        n1["Native Name"] = props.country.name.common;
    }
    
    let n2 = {
        "Top Level Domain": props.country.tld.join(", "),
        "Currencies": Object.values(props.country.currencies).map(cur => cur.name).join(", "),
        "Languages": Object.values(props.country.languages).join(", "),
    }


    return [n1, n2];
});
</script>
<template>
    <div class="">
        <div @click="expanded = true" v-if="!expanded" class="cursor-pointer rounded-lg overflow-hidden mx-auto">
            <img class="h-[10.5rem] w-full object-cover" :src="country.flags.svg" alt="flag">
            <div class="bg-white dark:bg-oxford-blue overflow-hidden">
                <div class="pl-7 py-3">
                    <h1 class="my-3 font-extrabold dark:font-semibold text-xl text-woodsmoke dark:text-white">{{country.name.common}}</h1>
                    <p class="font-extrabold dark:font-extralight text-oxford-blue dark:text-white">Population: <span class="text-gray font-semibold">{{country.population.toLocaleString()}}</span></p>
                    <p class="font-extrabold dark:font-extralight text-oxford-blue dark:text-white">Region: <span class="text-gray font-semibold">{{country.region}}</span></p>
                    <p class="mb-8 font-extrabold dark:font-extralight text-oxford-blue dark:text-white">Capital: <span class="text-gray font-semibold">{{capital}}</span></p>
                </div>
            </div>
        </div>
        <div v-else class="absolute px-6 left-0 top-0 w-full h-full bg-alabaster dark:bg-ebony-clay dark:text-white">
            <button @click="expanded = false" class="bg-white dark:bg-oxford-blue mt-9 mb-16 shadow-around-strong dark:shadow-around-dark py-1 px-5 rounded dark:text-white">
                <span><i class="fa-solid fa-arrow-left-long mr-2"></i>Back</span>
            </button>
            <div class="flex flex-wrap gap-20">
                <img class="w-full max-w-sm object-cover mb-10" :src="country.flags.svg" alt="flag">
                <div class="flex flex-wrap justify-between">
                    <h1 class="w-full dark:text-white font-extrabold text-xl">{{country.name.common}}</h1>
                    <div class="my-3">
                        <p class="font-semibold text-sm leading-8" v-for="(value, key, idx) of infoBlocks![0]" :key="idx">
                            {{key}}: <span class="font-light">{{value}}</span>
                        </p>
                    </div>
                    <div class="my-3">
                        <p class="font-semibold text-sm leading-8" v-for="(value, key, idx) of infoBlocks![1]" :key="idx">
                            {{key}}: <span class="font-light">{{value}}</span>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
