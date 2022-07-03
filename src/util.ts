import { computed } from "vue";

export function canHover(){
    return window.matchMedia("(hover: hover)").matches;
};