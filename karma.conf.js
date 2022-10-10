
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
      require('karma-coverage-istanbul-reporter'),
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
      ['**/!(*.spec).ts']: ['webpack'],
    },


    reporters: ['progress', 'coverage-istanbul'],
    
    singleRun: true, // config.debug

    webpack: common,

    coverageIstanbulReporter: {
      reports: [ 'html', 'text-summary', 'lcovonly' ],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
      'report-config': {
        html: { outdir: 'html' }
      }
    }
  });
};
