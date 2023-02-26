# growtask-starting-pack

> Стартовый набор для верстки через сборщик `gulp`

## Как использовать

### Структура файлов

```
- assets: ассеты проекта
    - fonts: шрифты проекта
    - img: картики
    - scss: SCSS стили
- html: верстка
- dist: скомпилированные файлы
- src: исходный код
    - modules
    - app.js
```

### Установка зависимостей

```shell
npm intall
```

#### Запуск проекта

```shell
npm start
```

#### Очистка папки `dist`

```shell
npm clean
```

---

### Библиотеки

- `gulp` - Сборщик
- `gulp-autoprefixer` - Автопрефикс для CSS стилей
- `gulp-cssbeautify` - Форматирование CSS кода
- `gulp-cssnano` - Минимизация CSS файлов
- `gulp-rename` - Переменовывание файлов
- `gulp-file-include` - Объединение файлов
- `gulp-sass` - Перпроцессор SCSS
- `gulp-uglify` - Минимизация JS файлов
- `gulp-pumber` - Нужен для выявления ошибок (Gulp не ломается)
- `gulp-strip-css-comments` - Удаление комментариев в CSS файлах
- `gulp-imagemin` - Нужен для оптимизации картинок
- `del` - Для очищения файлов, папок
- `borwser-sync` - Для обновления страницы
- `sass` - SCSS
