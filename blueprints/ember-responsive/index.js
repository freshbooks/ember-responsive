/* jshint node: true */

var EOL = require('os').EOL;
var path = require('path');

module.exports = {
  description: 'Generates ember-responsive test helper',

  fileMapTokens: function() {
    return {
      __app__: function (options) {
        return options.inAddon ? path.join(path.sep, 'tests', 'dummy', 'app') : path.sep;
      },
      __root__: function (/* options */) {
        return path.sep;
      }
    }
  },

  afterInstall: function() {

    var TEST_HELPER_PATH = 'tests/test-helper.js';
    var IMPORT_STATEMENT = EOL + "import './helpers/responsive';";
    var INSERT_AFTER = "import resolver from './helpers/resolver';";

    this.insertIntoFile(TEST_HELPER_PATH, IMPORT_STATEMENT, {
      after: INSERT_AFTER
    });

    return this.insertIntoFile('tests/.jshintrc', '    "setBreakpoint",', {
      after: '"predef": [\n'
    });
  },

  normalizeEntityName: function() {}
};
