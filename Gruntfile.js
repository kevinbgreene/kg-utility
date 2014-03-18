/* global module:false */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        datetime: Date.now(),

        uglify: {

            options: {
                mangle: false,
                beautify: true
            },

            build: {

                files: {

                    'dist/js/kg.utility.<%= pkg.version %>.js': [

                        'dev/js/main.js',
                        'dev/js/sniffer.js'
                    ]
                }
            }
        },

        watch: {

            main: {
                files: ['dev/js/**/*.js'],
                tasks: ['build'],
                options: {
                    nospawn: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('build', ['uglify:build']);
};