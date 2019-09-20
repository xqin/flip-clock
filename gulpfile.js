const { series, watch, src, dest } = require('gulp')

const browserSync = require('browser-sync').create()
const reload      = browserSync.reload

const less = {
  compile () {
    return src('./src/style.less')
      .pipe(require('gulp-less')())
      .pipe(dest('./dist/'))
  },
  watch () {
    watch('./src/**/*.less' , less.compile)
  }
}

const copy = () => {
  return src(['./src/*', '!./src/*.less']).pipe(dest('./dist/'))
}

const serve = (cb) => {
    // Serve files from the root of this project
    browserSync.init({
      server: {
          baseDir: './dist/'
      }
    })


    watch(['./src/*', '!./src/*.less']).on('change', copy)

    watch('./dist/*').on('change', reload)

    less.watch()

    cb()
}

exports.serve = series(less.compile, copy, serve)

exports.default = series(less.compile, less.watch)
