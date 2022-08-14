<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps<{ cca2: string}>();

let country = ref<Country>();
let borderCountries = ref<Country[]>([]);

let error: any;

onMounted(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${props.cca2}`)
        .then(response => {
            if(response.ok)
                return response.json();
            else
                throw new Error(`Server responded with status ${response.status}`);
        })
        .then(countryData => {
            if(countryData.length > 1)
                console.log("Oops");
            country.value = countryData[0];

            if(!country.value) return;
            for(let borderCountry of country.value.borders) {
                fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
                    .then(response => {
                        if(response.ok)
                            return response.json()
                        else
                            throw new Error(`Server responded with status ${response.status}`);
                    })
                    .then(json => {
                        borderCountries.value?.push(json[0]);
                    });
            }
        })
        .catch(err => error = err);
});

const info1 = computed(() => {
    if(country.value === undefined)
        return;
    let nativeName;
    if("nativeName" in country.value.name) {
        nativeName = Object.values(country.value.name.nativeName!).map(val => val.common).join(", ");
    } else {
        nativeName = country.value.name.common;
    }
    return {
        "Native Name": nativeName,
        "Population": country.value.population.toLocaleString(),
        "Region": country.value.region,
        "Sub Region": country.value.subregion,
        "Capital": country.value.capital === undefined ? "No capital" : country.value.capital.join(", "),
    };
});
const info2 = computed(() => {
    if(country.value === undefined)
        return;
    let tld = country.value.tld;
    if(Array.isArray(country.value.tld)) tld = country.value.tld.join(", ");
    return {
        "Top Level Domain": tld,
        "Currencies": Object.values(country.value.currencies).map(cur => cur.name).join(", "),
        "Languages": Object.values(country.value.languages).join(", "),
    }
});

</script>
<template>
<div class="h-full dark:bg-ebony-clay">
    <div class="dark:text-white" v-if="country === undefined">
        Loading...
        <div v-if="error !== undefined">
            {{error}}
        </div>
    </div>
    <div v-else class="px-6 md:px-10 lg:px-12 xl:px-20 left-0 top-0 w-full h-full bg-alabaster dark:text-white dark:bg-ebony-clay">
        <RouterLink to="/home">
            <button class="bg-white dark:bg-oxford-blue mt-9 mb-16 shadow-around-strong dark:shadow-around-dark py-1 px-5 rounded dark:text-white">
                <span><i class="fa-solid fa-arrow-left-long mr-2"></i>Back</span>
            </button>
        </RouterLink>
        <div class="flex flex-wrap md:flex-nowrap justify-between max-w-md sm:max-w-lg md:max-w-screen mx-auto">
            <img class="w-full md:w-auto md:object-contain object-cover mb-10" :src="country.flags.svg" alt="flag">
            <div class="">
                <h1 class="dark:text-white font-extrabold text-xl">{{country.name.common}}</h1>
                <div class="flex flex-wrap justify-between gap-x-10 flex-shrink-0">
                    <div class="my-3">
                        <p class="font-semibold leading-8 md:text-[.8rem]" v-for="(value, key, idx) of info1" :key="idx">
                            {{key}}: <span class="font-light">{{value}}</span>
                        </p>
                    </div>
                    <div class="my-3">
                        <p class="font-semibold leading-8 md:text-[.8rem]" v-for="(value, key, idx) of info2" :key="idx">
                            {{key}}: <span class="font-light">{{value}}</span>
                        </p>
                    </div>
                </div>
                <h2 class="font-semibold dark:text-white mb-5 mt-8 text-lg">
                    Border Countries:
                </h2>
                <div class="flex flex-wrap gap-x-3 gap-y-2 mb-20">
                    <router-link v-for="borderCountry in borderCountries" class="inline-block shadow-around dark:shadow-around-dark rounded text-sm font-light py-1.5 px-7" :to="`/countries/${borderCountry.cca2}`">{{borderCountry.name.common}}</router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>