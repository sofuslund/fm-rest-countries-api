<script setup lang="ts">

import { ref, onMounted, computed} from "vue";
import { canHover } from "@/util";

const props = defineProps<{ text: string, options: string[] }>();
const emit = defineEmits<{ (e: "newValue", val: string | null): void }>();

let selectedIdx = ref<number | null>(null);
let dropdownShown = ref(false);

const selected = computed(() => selectedIdx.value === null ? null : props.options[selectedIdx.value]);

const clickArea = ref<HTMLInputElement | null>(null);
const hoverArea = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if(canHover() && hoverArea.value) {
        hoverArea.value.addEventListener("mouseenter", () => {
            dropdownShown.value = true;
        });
        hoverArea.value.addEventListener("mouseleave", () => {
            dropdownShown.value = false;
        });
    } else if (clickArea.value) {
        clickArea.value.addEventListener("click", () => {
            dropdownShown.value = !dropdownShown.value;
        });
    }
});

</script>
<template>
    <div ref="hoverArea" class="group w-[13rem] font-semibold dark:font-light text-sm relative">
        <div ref="clickArea" class="shadow-around dark:shadow-around-dark bg-white dark:bg-oxford-blue rounded-lg py-4 px-3 overflow-auto relative">
            <span class="text-woodsmoke dark:text-alabaster ml-4">{{ text }}</span>
            <i :class="{'rotate-180': dropdownShown}" class="transition-all fa-solid fa-angle-down fa-sm absolute right-6 top-1/2"></i>
        </div>
        <div :class="[dropdownShown ? 'opacity-100' : 'opacity-0', dropdownShown ? '' : 'hidden']" class="absolute w-full pt-2 transition-all">
            <div class="shadow-around dark:shadow-around-dark bg-white dark:bg-oxford-blue px-3 w-full overflow-hidden rounded-lg">
                <ul>
                    <li @click="selectedIdx = idx; $emit('newValue', selected)" :class="idx === selectedIdx ? 'list-disc !text-woodsmoke !text-alabaster' : ''" class="ml-4 my-2 first:mt-4 last:mb-4 hover:list-disc hover:text-gray" v-for="(option, idx) of options" key="idx">
                        <span class="text-woodsmoke dark:text-alabaster">{{ option }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
