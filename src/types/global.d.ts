export {};

declare global {
    type Country = {
        name: {common: string, nativeName?: {[key: string]: {common: string}}}, 
        population: number, 
        region: string,
        subregion: string,
        capital?: string[],
        flags: {svg: string},
        tld: any,
        cca3: string,
        languages: {[key: string]:  string}[],
        currencies: {[key: string]: {name: string}}[],
        borders: any,
    };
    type Theme = "dark" | "light";
};