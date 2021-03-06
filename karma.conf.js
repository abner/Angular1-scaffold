/**
 * @author: @ngParty
 */
const testWebpackConfig = require('./webpack-test.config');

module.exports = function(config) {

  config.set({

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [ ],

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [ { pattern: './config/spec-bundle.js', watched: false } ],

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    // Webpack Config at ./webpack-test.config.js
    webpack: testWebpackConfig,

    // coverageReporter: {
    //   dir : 'coverage/',
    //   reporters: [
    //     { type: 'text-summary' },
    //     { type: 'json' },
    //     { type: 'html' }
    //   ]
    // },
    coverageReporter: {
      reporters: [{
        type: 'json',
        subdir: '.',
        file: 'coverage-final.json'
      }]
    },
    remapIstanbulReporter: {
      src: 'coverage/coverage-final.json',
      reports: {
        html: 'coverage'
      },
      timeoutNotCreated: 1000,
      timeoutNoMoreFiles: 1000
    },

    // Webpack please don't spam the console when running in karma!
    webpackServer: { noInfo: true },

    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: [ 'mocha', 'coverage', 'karma-remap-istanbul'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: [
      'Chrome'
      // 'PhantomJS'
    ],

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  });

};
