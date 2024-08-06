/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        costom: "2px 7px 5px rgba(0, 0, 0, 0.03)",
      },
    },

    fontSize: {
      h1: [
        "3.5rem",
        {
          lineHeight: "4rem",
          fontWeight: "bold",
        },
      ],
      h2: [
        "2.25rem",
        {
          lineHeight: "2.75rem",
          fontWeight: "bold",
        },
      ],
      h3: [
        "1.5rem",
        {
          lineHeight: "2rem",
          fontWeight: "bold",
        },
      ],
      h4: [
        "1.25rem",
        {
          lineHeight: "1.75rem",
          fontWeight: "bold",
        },
      ],
      b1: [
        "1.125rem",
        {
          lineHeight: "1.625rem",
          fontWeight: 500,
        },
      ],
      b2: [
        "1rem",
        {
          lineHeight: "1.75rem",
          fontWeight: 500,
        },
      ],
      b3: [
        "0.875rem",
        {
          lineHeight: "1.5rem",
          fontWeight: 500,
        },
      ],
    },

    colors: {
      ps: {
        gray: {
          100: "#F6F6F9",
          200: "#DCDFED",
          300: "#AEB1C3",
          400: "#7B7E8F",
          500: "#5B5D6F",
          600: "#3A3B46",
        },
        orange: {
          100: "#FFF1EC",
          200: "#FFD5C2",
          300: "#FFB899",
          400: "#FF986F",
          500: "#FF7037",
          600: "#E44A0C",
        },
        yellow: {
          100: "#FFF5EC",
          200: "#FFCA62",
        },
        blue: {
          100: "#ECFBFF",
          500: "#76D0FC",
        },
        green: {
          100: "#E7FDF4",
          500: "#1CCD83",
        },
        pink: {
          100: "#FFF0F1",
          500: "#FA8AC0",
        },
        black: "#000000",
        white: "#FFFFFF",
        red: "#EA1010",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
  daisyui: {
    themes: [
      {
        mytheme: {
          // Customizing the default theme
          primary: "#FF7037", // orange-500
          "primary-content": "#FFFFFF",
          secondary: "#000000", // black
          accent: "#FFCA62", // yellow
          neutral: "#3A3B46", //gray-600
          "base-100": "#FFFFFF", // Change this to the background color you want
          info: "#76D0FC",
          success: "#1CCD83",
          error: "#EA1010",
          "error-content": "#FFFFFF",
          warning: "#FFCA62",
        },
      },
    ],
  },
};
