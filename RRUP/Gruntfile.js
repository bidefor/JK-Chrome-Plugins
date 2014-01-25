var arrScripts1 = [
    'assets/js/libs/zepto.min.js',
    'assets/js/libs/underscore-min.js',
    'assets/js/libs/backbone-min.js',
    'assets/js/libs/require.js',

    'assets/js/api.js',
    'assets/js/utils.js',
    'assets/js/global.js',

    'assets/js/app.js',
    'assets/js/views.js',
    'assets/js/routers.js'
];

var arrScripts2 = [
    'assets/js/libs/zepto.min.js',
    'assets/js/libs/underscore-min.js',
    'assets/js/libs/backbone-min.js',
    'assets/js/libs/require.js',

    'assets/js/api.js',
    'assets/js/utils.js',
    'assets/js/global.js',

    'assets/js/app2.js',
    'assets/js/views.js',
    'assets/js/routers.js'
];



module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {
            compile: {
                files: {
                    './assets/css/app.css': './assets/css/app.less'
                }
            }
        },

        cssmin: {
            options: {
                report: 'gzip'
            },
            combine: {
                files: {
                  './assets/css/app.min.css': ['./assets/css/bootstrap.min.css', './assets/css/app.css']
                }
            }
        },

        uglify: {
            options: {
                report: 'gzip',
                mangle: true, // Specify mangle: false to prevent changes to your variable and function names.
                banner: '/** \n' +
                        ' * -------------------------------------------------------------\n' +
                        ' * Copyright (c) 2013 RRUP.ML, All rights reserved. \n' +
                        ' * http://rrup.ml/ \n' +
                        ' *  \n' +
                        ' * @version: <%= pkg.version%> \n' +
                        ' * @author: <%= pkg.author%> \n' +
                        ' * @description: <%= pkg.description%> \n' +
                        ' * ------------------------------------------------------------- \n' +
                        ' */ \n\n'
            },

            scripts: {
                files: {
                    './assets/js/app.min.js': arrScripts1,
                    './assets/js/app2.min.js': arrScripts2
                }
            }
        },

        copy: {
            online: {
                files: [
                    {expand: true, cwd: '', src: './favicon.ico', dest: '../pro/'},
                    {expand: true, cwd: '', src: './manifest.json', dest: '../pro/'},
                    {expand: true, cwd: '', src: './*.html', dest: '../pro/'},

                    {expand: true, cwd: '', src: './assets/css/app.min.css', dest: '../pro/'},
                    {expand: true, cwd: '', src: './assets/images/**', dest: '../pro/'},
                    {expand: true, cwd: '', src: './assets/js/background.js', dest: '../pro/'},
                    {expand: true, cwd: '', src: './assets/js/app.min.js', dest: '../pro/'},
                    {expand: true, cwd: '', src: './assets/js/app2.min.js', dest: '../pro/'},
                    {expand: true, cwd: '', src: './assets/js/tpls/**', dest: '../pro/'}
                ]
            }
        },

        watch: {
            scripts: {
                files: ['./assets/css/*.less'],
                tasks: ['less', 'cssmin']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'copy']);

};
