<script setup lang="ts">
import { computed } from '@vue/reactivity';

const props = defineProps<{ country: Country}>();

const capital = computed(() => {
    // The country might not have a capital 
    if(!props.country.hasOwnProperty("capital"))
        return "None";
    // The country capital is an array as it may have more capitals. In that case the capitals should be displayed with commas in between
    return props.country.capital.join(", ");
});
</script>
<template>
    <div>
        <h1>{{country.name.common}}</h1>
        <p><strong>Population: </strong>{{country.population}}</p>
        <p><strong>Region: </strong>{{country.region}}</p>
        <p><strong>Capital: </strong>{{capital}}</p>
    </div>
</template>
