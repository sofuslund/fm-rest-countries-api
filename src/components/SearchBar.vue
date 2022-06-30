<script lang="ts">
export default {
    inheritAttrs: false
}
</script>
<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useAttrs } from "vue";

const props = defineProps<{placeholder: string}>();

const attrs = useAttrs();

const attrsExceptClass = computed(() => {
    let returnAttrs: {[key: string]: any} = {};
    for(let key in attrs) {
        if(key !== "class")
            returnAttrs[key] = attrs[key];
    }
    return returnAttrs;
});
</script>

<template>
    <div :class="$attrs['class']">
        <div class="relative">
            <i class="fa-solid fa-magnifying-glass absolute left-10 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-40"></i>
            <input v-bind="attrsExceptClass" class="bg-white focus:outline-none w-full py-3 pl-20 shadow-md rounded-md placeholder-gray placeholder:font-light" type="text" />
        </div>
    </div>
</template>
