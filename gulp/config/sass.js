'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Globals
var paths = global.paths;
global.config.sass = {
  enabled: true,
  src: ([
    // paths.themeDir + '/components/css/**/*.scss'
  ]),
  themeSrc: ([
    paths.themeDir + '/sass/**/*.scss'
  ]),
  watchSrc: ([
    paths.themeDir + '/sass/**/*.scss'
  ]),
  dest: paths.themeDir + '/dist/css',
  flattenDestOutput: false,
  lint: {
    enabled: true,
    failOnError: true
  },
  sassOptions: {
    outputStyle: 'expanded',
    eyeglass: {
      enableImportOnce: false
    }
  },
  sourceComments: false,
  sourceMapEmbed: false,
  outputStyle: 'expanded',
  autoPrefixerBrowsers: [
    'last 2 versions',
    'IE >= 11'
  ],
  includePaths: ([
    // paths.themeDir + '/node_modules/foundation-sites/scss',
    // paths.themeDir + '/node_modules/motion-ui/src'
  ]),
  docs: {
    enabled: true,
    dest: paths.themeDir + '/sassdoc',
    verbose: false,
    sort: [
      'file',
      'group',
      'line'
    ]
  },
  sizeReport: {
    enabled: true,
    options: {
      '*': {
        'maxSize': 70000 // Alert if > Max Size in Bytes after gzip
      }
    }
  }
};
