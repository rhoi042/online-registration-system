var gulp        =require( 'gulp' );
var sass        =require( 'gulp-sass' );
var plumber     =require( 'gulp-plumber' );
var browserSync =require( 'browser-sync' ).create;
//var nodemon = require('gulp-nodemon');

gulp.task( 'sass',function(){

    return gulp.src( 'src/scss/main.scss' )
    .pipe( plumber() )
    .pipe( sass() )
    .pipe( gulp.dest( 'public/css/' ) );

	} );

gulp.task( 'sass-watch',[ 'sass' ],browserSync.reload );

gulp.task( 'watching',function(){

    browserSync({
        proxy: 'localhost:3000'
    });
    //gulp.watch( 'app/views/**/*.html',[ 'nodemon-watch' ] );
    gulp.watch( 'src/scss/**/*.scss',[ 'sass' ] );
	} );

