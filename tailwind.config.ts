import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            xs: "480px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        extend: {
            colors: {
                "grey/700": "#525252",
                "grey/50": "#FFFFFF",
                "grey/70": "#F5F5F5",
                "grey/800": "#333333",
                "grey/500": "#858585",
                "grey/400": "#999999",
                "grey/200": "#CCCCCC",
                "grey/600": "#707070",
                "grey/900": "#363636",
                "grey/100": "#838383",
                "grey/300": "#ADADAD",
                "grey/form": "#778B044D",
                "grey/100-alt": "#EBEBEB",
                "secondary/700": "#778B04",
                "secondary/500": "#A9C509",
                "primary/200": "#97AAED",
                "primary/50": "#EEF1FC",
                "primary/500": "#254AD0",
                "primary/100": "#CBD4F6",
                "primary/300": "#637FE3",
                "primary/400": "#4062DD",
                "light-green": "#00FF19",
                "success-100": "#D1F8E3",
                "success-300": "#61D295",
                "success-400": "#56BA85",
                "success-500": "#51AF7D",
                "error-400": "#F97066",
                green: "#00900E",
                brown: "#504800",
                firstPlace: "#C3A60D",
                secondPlace: "#C0C0C0",
                thirdPlace: "#CD7F32",
                "light-brown": "#D9C409",
            },
            fontFamily: {
                cabinet_grotesk: ["cabinet_grotesk", "sans-serif"],
            },
            zIndex: {
                "1": "1",
            },
        },
    },
    plugins: [],
};
export default config;
