<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import CountryCard from "@/components/CountryCard.vue";
import FilterDropdown from "@/components/FilterDropdown.vue";

import { ref, computed, type Ref } from "vue";

const inputVal = ref("");
const allCountries: Ref<Country[]> = ref([]);

console.log("Starting fetch");
// Fetch the data about all countries
fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
        allCountries.value = data;
        console.log("Fetch done");
    })
    .catch((err) => alert(err));

const resultCountries = computed(() => {
    // This function iterates each country in a for loop and checks if the country matches with the search string provided by the user. If it does it will save the country as a result in the country array.



    // This country array will both store the name of the matched country but also the index of the match. For example if the user searchs "den" the index will be 3 in sweDEN and 0 DENmark.
    const arr: {country: Country, matchIndex: number}[] = [];

    for (const country of allCountries.value) {
        const matchIdx = country.name.common.toLowerCase().indexOf(inputVal.value.toLowerCase());
        if (matchIdx > -1) {
            arr.push({country: country, matchIndex: matchIdx});
        }
    }
    // Sort the array of results with the results with the lowest match index first.
    arr.sort((a, b) => (a.matchIndex < b.matchIndex ? -1 : 1));
    // Return an array without the match indexes and only the numbers

    return arr.map((elm) => elm.country);
});
</script>
<template>
    <div class="min-h-screen bg-alabaster dark:bg-ebony-clay overflow-hidden">
        <SearchBar placeholder="Search for a country..." class="lg:max-w-lg lg:w-full lg:ml-16 lg:mt-12 lg:inline-block mx-4 mt-6 mb-10" @input="(e) => (inputVal = e.target.value)"></SearchBar>
        <FilterDropdown class="lg:float-right lg:mt-12 lg:mr-16 mx-4 my-7" text="Filter by Region" :options="['Africa', 'America', 'Asia', 'Europe', 'Oceania']"></FilterDropdown>
        <div class="mb-8 md:mx-16 grid grid-cols-[repeat(auto-fill,_17rem)] justify-center md:justify-around lg:justify-between gap-x-3 2xl:gap-x-20 gap-y-12">
            <CountryCard
                @click="$router.push({name: 'countries', params: {cca2: country.cca2}})"
                class="w-[17rem] lg:m-0 shadow-around dark:shadow-around-dark"
                v-for="(country, idx) in resultCountries"
                :key="idx"
                :country="country"
            ></CountryCard>
        </div>
    </div>
</template>