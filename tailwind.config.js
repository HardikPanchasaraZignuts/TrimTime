/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4d94c4",
          DEFAULT: "#1870aa",
          dark: "#0f4d75",
        },
        secondary: {
          DEFAULT: "#FF9800", // Amber
          light: "#FFB74D",
          dark: "#EF6C00",
        },
        background: {
          DEFAULT: "#FDFDFD",
          muted: "#F4F4F5",
          dark: "#1C1C1E",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#2A2A2A",
        },
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#3A3A3C",
        },
        text: {
          DEFAULT: "#1F2937",
          light: "#6B7280",
          inverted: "#FFFFFF",
        },
        success: {
          DEFAULT: "#4CAF50",
          light: "#81C784",
          dark: "#388E3C",
        },
        error: {
          DEFAULT: "#F44336",
          light: "#E57373",
          dark: "#D32F2F",
        },
        warning: {
          DEFAULT: "#FFC107",
          light: "#FFD54F",
          dark: "#FFA000",
        },
      },
    },
  },
  plugins: [],
};
