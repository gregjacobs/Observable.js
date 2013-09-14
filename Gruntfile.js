/*global require, module */
/*jshint devel:true, latedef:false */

module.exports = function( grunt ) {

	// Register main tasks
	grunt.registerTask( 'default', "Default task runs JSHint and then builds the project.", [ 'build' ] );
	grunt.registerTask( 'build', "Builds the distribution JavaScript files (Observable.js, and Observable.min.js)",
		[ 'jshint', 'concat:dist', 'uglify:dist' ] );
	
	
	// -----------------------------------
	
	// Plugin Configurations
	
	var banner = [
		'/*!',
		' * <%= pkg.name %>',
		' * Version <%= pkg.version %>',
		' *',
		' * Copyright(c) 2006-2009 Sencha, Inc.',
		' * MIT Licensed. http://www.opensource.org/licenses/mit-license.php',
		' *',
		' * Copyright(c) 2013 Gregory Jacobs.',
		' * MIT Licensed. http://www.opensource.org/licenses/mit-license.php',
		' *',
		' * <%= pkg.homepage %>',
		' */\n'
	].join( '\n' );
	
	
	// Project configuration
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		
		jshint: {
			files: [ 'Gruntfile.js', 'src/**/*.js', 'tests/spec/**/*.js' ],
			
			options : {
				'smarttabs' : true,
				'undef'     : true,
				'browser'   : true
			}
		},
		
		
		concat : {
			'dist' : {
				options : {
					banner: banner
				},
				src  : [ 'src/Observable.js' ],  // simply adding the banner
				dest : 'dist/Observable.js'      // to the output file
			}
		},
		
		
		uglify : {
			'dist' : {
				options: {
					preserveComments : 'some'  // preserve license header comments
				},
				files : {
					'dist/Observable.min.js' : [ 'dist/Observable.js' ]
				}
			}
		}
	} );

	
	// These plugins provide the tasks.
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	
};
