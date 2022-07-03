export {};

declare global {
    type Country = {
        name: {common: string}, 
        population: number, 
        region: string,
        capital?: string[],
        flags: {svg: string}
    };
    type Theme = "dark" | "light";
};