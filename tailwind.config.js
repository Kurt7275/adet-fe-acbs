/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1e40af',
          secondary: '#64748b',
          success: '#16a34a',
          warning: '#ea580c',
          danger: '#dc2626',
        },
      },
    },
    plugins: [],
  }