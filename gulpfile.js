const scss = require('gulp-sass');
const { src, dest, watch, parallel } = require('gulp');
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify-es').default
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')

function styles(){
  return src('src/scss/style.scss')
    .pipe(scss({outputStyle:'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version']
    }))
    .pipe(dest('src/scss'))
    .pipe(browserSync.stream())
}

function watching(){
  watch(['src/scss/**/*.scss'], styles)
  watch(['src/js/main.min.js'], scripts)
  watch(['src/*.html']).on('change', browserSync.reload)
}

function images(){
  return src('src/img/**/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]))
  .pipe(dest('dist/images'))
}

function scripts(){
return src(['src/js/script.js'])
 .pipe(concat('main.min.js'))
 .pipe(uglify())
 .pipe(dest('src/js'))
 .pipe(browserSync.stream())
}

function build(){
  return src(
    ['src/scss/style.min.css', 
     'src/js/main.min.js',
     'src/fonts/**/*',
     'src/*.html'
], {base: 'src'})
.pipe(dest('dist'))
}

function browsersync(){
browserSync.init({
server:{
  baseDir: 'src/'
},
notify: false
})
}

exports.styles = styles
exports.watching = watching
exports.browsersync = browsersync 
exports.scripts = scripts
exports.build = build
exports.images = images
exports.default = parallel(browsersync, watching, scripts )

// let profect_folder = 'dist'
// let sourse_folder = '#src'
// let path = {
//   build:{
//     html: profect_folder + '/',
//     css: profect_folder + '/css/',
//     js: profect_folder + '/js/',
//     img: profect_folder + '/img/',
//     js: profect_folder + '/js/',
//     fonts: profect_folder + '/fonts/',
//   },
//   src: {
//     html: sourse_folder + '/',
//     css: sourse_folder + '/scss/style.scss',
//     js: sourse_folder + '/js/script.js',
//     img: sourse_folder + '/img/**/*.{jpg, png, svg, gif, ico, webp}',
//     js: sourse_folder + '/js/',
//     fonts: sourse_folder + '/fonts/*.ttf ',
//   },
//   watch: {
//     html: sourse_folder + '/**/*.html',
//     css: sourse_folder + '/scss/**/*.scss',
//     js: sourse_folder + '/js/**/*.js',
//     img: sourse_folder + '/img/**/*.{jpg, png, svg, gif, ico, webp}',
//     js: sourse_folder + '/js/', 
//   },
//    clean: './'+ profect_folder + '/'
// }
// let {src, dest} = require('gulp')