<script setup lang="ts">
import { ref, computed, type Ref } from "vue";

let inputVal = ref("");
let allCountries = ref([""]);

fetch("https://restcountries.com/v3.1/all").then(
    response => response.json()
).then(
    data => {
        allCountries.value = data.map((elm: {name: {common: string}}) => elm.name.common);
    }
).catch(err => alert(err));

let countries = computed(() => {
    // This function iterates each country in a for loop and checks if the country matches with the search string provided by the user. If it does it will save the country as a result in the country array.

    // This country array will both store the name of the matched country but also the index of the match. For example if the user searchs "den" the index will be 3 in sweDEN and 0 DENmark. 
    let arr: {name: string, matchIndex: number}[] = [];
    
    for(let country of allCountries.value) {
        let idx = country.toLowerCase().indexOf(inputVal.value.toLowerCase());
        if (idx > -1) {
            arr.push({name: country, matchIndex: idx});
        }
    }
    // Sort the array of results with the results with the lowest match index first. 
    arr.sort((a, b) => a.matchIndex < b.matchIndex ? -1 : 1 );
    // Return an array without the match indexes and only the numbers
    return arr.map(elm => elm.name);
});

</script>

<template>

</template>
