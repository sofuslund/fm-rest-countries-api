<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted, ref, type Ref} from 'vue';

const props = defineProps<{ countryName: string }>();
let country: Ref<{[key: string]: any}> = ref({population: "loading", region: "loading", capital: "loading"});

let error = ref("");

onMounted(() => {
    // Fetch country info
    fetch("https://restcountries.com/v3.1/name/" + props.countryName.toLowerCase() + "?fullText=true")
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            country.value = data[0];
            console.log(country.value.capital);
        }) // Update country reactive object without losing reactivity
        .catch(err => error.value = err);
});

const capital = computed(() => {
    return Object.values(country.value.capital).join(" ");
});
</script>
<template>
    <div v-if="error">{{error}}</div>
    <div v-else>
        <h1>{{countryName}}</h1>
        <p><strong>Population: </strong>{{country.population}}</p>
        <p><strong>Region: </strong>{{country.region}}</p>
        <p><strong>Capital: </strong>{{capital}}</p>
    </div>
</template>
