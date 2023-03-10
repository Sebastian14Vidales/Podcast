const { src, dest, watch, series } = require('gulp');

// Compilar sass
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');
// Imagenes
const imagemin = require('gulp-imagemin');

function css( done ) {
    //compilar ssas
    //pasos; 1) identificar archivo, 2) compilarla, 3) guardar el css

    src('src/scss/app.scss') //identifico el archivo
        .pipe( sass() ) //compilo el archivo
        .pipe(dest('build/css')); //guardo el archivo

    done();
}

function imagenes() {
    src('src/img/**/*')
        .pipe( imagemin( {optimizationLevel: 3 }))
        .pipe( dest('build/img'));
}

function cssbuild(done) {
    src('build/css/app.css')
    .pipe( rename({
        suffix: '.min'
    }))
    .pipe( purgecss({
        content: ['index.html']
    }))
    .pipe(dest('build/css'))

    done();
}

function dev() {
		watch ('src/scss/**/*.scss', css) //todas las carpetas con todos los archivos de scss
    //para que el archivo se modifique sin volver a ejecutar gulp
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);
exports.build = series(cssbuild);