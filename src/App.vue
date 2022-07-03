<script setup lang="ts">
import { ref, computed, type Ref } from "vue";
import SearchBar from "./components/SearchBar.vue";
import CountryCard from "./components/CountryCard.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import FilterDropdown from "./components/FilterDropdown.vue";

const inputVal = ref("");
const allCountries: Ref<Country[]> = ref([]);

// Fetch the data about ALL countries! (And store it... duh)
fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
        allCountries.value = data
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

let theme = ref<Theme>("light");
</script>

<template>
    <div :class="{dark: theme === 'dark'}">
        <div class="py-7 px-5 bg-white shadow-md">
            <h1 class="font-extrabold inline">Where in the world?</h1>
            <ThemeToggle v-model="theme" class="float-right"></ThemeToggle>
        </div>
        <div>
            <SearchBar placeholder="Search for a country..." class="mx-4 mt-6 mb-10" @input="(e) => (inputVal = e.target.value)"></SearchBar>
            <FilterDropdown class="mx-4 my-7" text="Filter by Region" :options="['Africa', 'America', 'Asia', 'Europe', 'Oceania']"></FilterDropdown>
            <div class="flex gap-12 flex-col">
                <CountryCard
                    class="shadow-around"
                    v-for="(country, idx) in resultCountries"
                    :key="idx"
                    :country="country"
                ></CountryCard>
            </div>
        </div>
    </div>
</template>
