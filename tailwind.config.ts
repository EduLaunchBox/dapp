import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "grey/700": "#525252",
        "grey/50": "#FFFFFF",
        "grey/70": "#F5F5F5",
        "grey/800": "#333333",
        "grey/500": "#858585",
        "grey/200": "#CCCCCC",
        "grey/600": "#707070",
        "grey/900": "#363636",
        "grey/100": "#838383",
        "grey/300": "#ADADAD",
        "grey/form": "#778B044D",
        "secondary/700": "#778B04",
        "primary/200": "#97AAED",
        "primary/50": "#EEF1FC",
        "primary/500": "#254AD0",
        "primary/100": "#CBD4F6",
        "primary/300": "#637FE3",
        "light-green": "#00FF19",
        green: "#00900E",
        brown: "#504800",
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
