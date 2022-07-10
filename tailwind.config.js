/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        colors: {
            "oxford-blue": "#2b3945",
            "ebony-clay": "#202c37",
            woodsmoke: "#111517",
            gray: "#858585",
            alabaster: "#fafafa",
            white: "#ffffff",
        },
        fontFamily: {
            "serif": ["Nunito Sans", "sans-serif"],
            "fa-font-solid": "var(--fa-font-solid)"
        },
        extend: {
            boxShadow: {
                "md-dark": "0px 0px .50rem hsl(360, 0%, 10%)",
                around: "0px 0px .75rem hsl(360, 0%, 90%)",
                "around-strong": "0px 0px .5rem .01rem hsl(360, 0%, 80%)",
                "around-dark": "0px 0px .5rem hsl(360, 0%, 12%)"
            }
        },
    },
    darkMode: "class",
    plugins: [],
};
