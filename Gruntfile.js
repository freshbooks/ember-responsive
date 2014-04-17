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

    qunit: {
      all: ['test/*.html'],
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

    clean: ['dist'],

    jshint: {
      all: ['lib/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', 'Run tests using PhantomJS',
                     ['jshint:all', 'concat:test', 'qunit:all']);

  grunt.registerTask('dist', 'Create a distributable version',
                     ['jshint:all', 'doc', 'concat:dist']);

  grunt.registerTask('doc', 'Generate API documentation',
                     ['yuidoc:compile']);

  grunt.registerTask('release:minor', 'Generates and tags a minor release',
                     ['test', 'clean', 'dist', 'bump:minor']);

  grunt.registerTask('release:patch', 'Generates and tags a patch release',
                     ['test', 'clean', 'dist', 'bump:patch']);
};
