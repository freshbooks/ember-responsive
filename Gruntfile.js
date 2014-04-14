module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['lib/responsive.js', 'lib/*.js']
        }
      }
    },

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
          'dist/ember-responsive.js',
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

    jsdoc: {
      dist: {
        src: ['lib/*.js'],
        dest: 'dist/doc',
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-testem');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('test', 'Run tests using testem and PhantomJS',
                     ['concat:test', 'testem:ci:test']);

  grunt.registerTask('dist', 'Create a distributable version',
                     ['doc', 'uglify:dist', 'concat:dist']);

  grunt.registerTask('doc', 'Generate API documentation',
                     ['jsdoc:dist']);
}
