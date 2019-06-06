'use strict'

const browserSync = require('browser-sync').create()

module.exports = (gulp, path) => {

  gulp.task('reload', done => {
    browserSync.reload()

    done()
  })

  gulp.task('serve', done => {
    browserSync.init({
      notify: false,
      server: path.src,
      port: 3000
    })

    gulp.watch([path.baseUrl + '/src/**/*.html'])
      .on('all', gulp.series('assets:html', 'reload'))

    // Watch SCSS Files then apply PostCSS Sorting
    gulp.watch(['../src/styles/**/*.scss', '!../src/styles/main.scss'])
      .on('all', gulp.series('assets:sass-sort'))

    gulp.watch([path.baseUrl + '/src/**/*.scss'])
      .on('all', gulp.series('assets:sass', 'reload'))
    gulp.watch([path.baseUrl + '/**/*.js'])
      .on('all', gulp.series('assets:js', 'reload'))

    done()
  })

}
