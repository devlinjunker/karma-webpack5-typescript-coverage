
const path = require('path');
const common = require('./webpack.config');

// Make Headless Chrome available.
process.env.CHROME_BIN = require('puppeteer').executablePath();


const basePath = __dirname;

module.exports = async (config) => {

  config.set({
    basePath,

    browsers: ['Chrome'], // ['ChromeHeadless'] if debugging

    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
    ],
    
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu'],
      },
      ChromeDebug: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9333'],
      },
    },

    files: [
      { pattern: "./app/**/*.ts", type: "module" },
    ],

    frameworks: ['mocha', 'chai', 'webpack'],

    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },

    port: 9876,
    preprocessors: {
      ['**/*.ts']: ['webpack'],
      ['**/!(*.spec).ts']: ['webpack', 'coverage'],
    },


    reporters: ['progress', 'coverage'],
    
    singleRun: true, // config.debug

    webpack: common,

    coverageReporter: {
      // specify a common output directory
      dir: 'coverage',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: '.' },

        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
        
        { type: 'text-summary', },
        { type: 'json', subdir: '.', file: 'coverage.json' },
      ]
    },
  });
};
