export default {
  plugins: {
      // Было: tailwindcss: {},
      // Стало:
      '@tailwindcss/postcss': {}, // Используйте новый плагин
      // autoprefixer: {}, // Если вы его используете
    },
}
