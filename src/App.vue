<script setup lang="ts">
import { ref, computed, type Ref } from "vue";

const inputVal = ref("green");
let countries = ref([]);

let anyCountries = ref(false);

async function updateCountries() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${inputVal.value}`);
        let data = await response.json();

        anyCountries.value = response.ok;
        countries.value = data.map((elm: {name: {official: string}}) => elm.name.official);

    } catch (e) {
        alert('Error: ' + e);
    }
};

</script>

<template>
</template>

<style>
</style>
