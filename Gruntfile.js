module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: ['lib/responsive.js', 'lib/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      test: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/handlebars/handlebars.js',
          'bower_components/ember/ember.js',
          'bower_components/qunit/qunit/qunit.js',
          'bower_components/sinonjs/sinon.js',
          'lib/responsive.js',
          'lib/*.js',
          'tests/**.js',
        ],
        dest: 'dist/<%= pkg.name %>.test.js'
      }
    },

    testem: {
      test: {
        options: {
          test_page: 'tests/index.html',
          framework: 'qunit',
          launch_in_dev: ['PhantomJS', 'Chrome'],
          launch_in_ci: ['PhantomJS', 'Chrome'],
        }
      }
    },

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'lib',
          outdir: 'dist/doc'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-testem');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  grunt.registerTask('test', 'Run tests using testem and PhantomJS',
                     ['concat:test', 'testem:ci:test']);

  grunt.registerTask('dist', 'Create a distributable version',
                     ['doc', 'concat:dist']);

  grunt.registerTask('doc', 'Generate API documentation',
                     ['yuidoc:compile']);
}
