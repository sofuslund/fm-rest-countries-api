<script setup lang="ts">
import { computed } from '@vue/reactivity';

const props = defineProps<{ country: {name: string, population: number, region: string, capital: string} }>();

const capital = computed(() => {
    // The country capital is an array as it may have more capitals. In that case the capitals should be displayed with commas in between
    return Object.values(props.country.capital).join(", ");
});
</script>
<template>
    <div>
        <h1>{{country.name}}</h1>
        <p><strong>Population: </strong>{{country.population}}</p>
        <p><strong>Region: </strong>{{country.region}}</p>
        <p><strong>Capital: </strong>{{capital}}</p>
    </div>
</template>
