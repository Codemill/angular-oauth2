'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    karma : {
      unit : {
        options : {
          frameworks : ['jasmine'],
          singleRun : true,
          browsers : ['PhantomJS'],
          files : [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'index.js',
            'test/**/*.js'
          ]
        }
      }
    },
    jshint : {
      options : {
        jshintrc : '.jshintrc'
      },
      all : [
        'Gruntfile.js',
        'index.js'
      ]
    }
  });

  grunt.registerTask('test' , [
    'jshint',
    'karma'
  ]);
};
