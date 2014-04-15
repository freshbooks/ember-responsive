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
          'test/**.js',
        ],
        dest: 'dist/<%= pkg.name %>.test.js'
      }
    },

    testem: {
      test: {
        options: {
          test_page: 'test/index.html',
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
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commitFiles: ['package.json', 'bower.json', 'dist/'],
        pushTo: 'origin',
      }
    },

    clean: ['dist']
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-testem');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('test', 'Run tests using testem and PhantomJS',
                     ['concat:test', 'testem:ci:test']);

  grunt.registerTask('dist', 'Create a distributable version',
                     ['doc', 'concat:dist']);

  grunt.registerTask('doc', 'Generate API documentation',
                     ['yuidoc:compile']);

  grunt.registerTask('release:minor', 'Generates and tags a minor release',
                     ['test', 'clean', 'dist', 'bump:minor']);

  grunt.registerTask('release:patch', 'Generates and tags a patch release',
                     ['test', 'clean', 'dist', 'bump:patch']);
}
