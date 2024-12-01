/* eslint-disable */
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    // Include Tailwind CSS plugin
    require('tailwindcss')(),

    // Autoprefixer plugin for better cross-browser support
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions'
      ]
    }),

    // Optional RTL CSS Support (uncomment if needed)
    // Uncomment the following lines to enable RTL support in your CSS
    // First, install postcss-rtlcss: npm install postcss-rtlcss
    // require('postcss-rtlcss')
  ]
}
