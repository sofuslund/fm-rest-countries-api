<script>
export default {
    inheritAttrs: false
}
</script>
<script setup lang="ts">

</script>

<template>
    <div class="px-4 my-8">
        <div class="relative">
            <i class="fa-solid fa-magnifying-glass absolute left-10 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-40"></i>
            <input v-bind="$attrs" class="bg-white focus:outline-none w-full py-3 pl-20 shadow-md rounded-md placeholder-gray placeholder:font-light" type="text" placeholder="Search for a country..." />
        </div>
    </div>
</template>
