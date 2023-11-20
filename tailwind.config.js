/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        general: '#D9D9D9',
        logoBlue: '#359EFF',
        lightGrey: '#D9D9D9',
        background: "#F0F2F5",
        columnGrey: "#E9E9E9",
        headersGrey: "#D1D1D1",

      },
      margin: {
        300: '300px',
        200: '200px',
        230: '230px',
        80: '80px',
        50: '50px',
        25: '25px',
        20: '20px',
      },
      padding: {
        80: '80px',
        50: '50px',
        25: '25px',
        20: '20px',
        100: '100px',
        200: '200px',
        230: '230px',
        300: '300px',
        
      },
      height: {
        page: '800px',
        recoverybox: '320px',
        searchbox: '500px',
        userbox: '510px',
        registerbox: '450px',
        updatebox: '420px',
        200: '200px',
        300: '300px',
        40: '40px',
        logbox: '413.5px'
      },
      minHeight: {
        recoverybox: '400px',
        usersybox: '500px',
      },
      width: {
        line: '1px',
        container: '550px',
        300: '700px',
        520: '520px',
        400: '400px',
        500: '500px',
        700: '700px',
        logbox: '1000px',
        recorybox: '600px',
      },
      fontSize: {
        logoSize: '70px',
        sublogoSize: '25px',
        16: '16px',
      },
      fontFamily: {
        Archivo: ['Archivo'],
        Lalezar: ['Lalezar'],
        Biryani: ['Biryani'],

      }
    },
  },
  plugins: ['macros'],
}