const webpack = require( 'webpack' );
const webpackConfig = require( './webpack.config' );


/**
 * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
 *
 * Do not change, leave as is or it wont work.
 * See: https://github.com/webpack/karma-webpack#source-maps
 */
const webpackDevtool = 'inline-source-map';

// TODO adicionar estes postLoaders apenas se for teste com cobertura
const webpackPostLoaders = [

  /**
   * Instruments JS files with Istanbul for subsequent code coverage reporting.
   * Instrument only testing sources.
   *
   * See: https://github.com/deepsweet/istanbul-instrumenter-loader
   */
  {
    test: /\.(ts)$/,
    loader: 'istanbul-instrumenter-loader',
    include: webpackConfig.resolve.root,
    exclude: [
      /\.(e2e|spec)\.ts$/,
      /node_modules/,
      // @TODO this is temporary, will remove when typescript-helpers will be extracted to separate package
      /(polyfills|vendor)\.ts$/
    ]
  }
];

const webpackNode = {
  /**
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  process: true
};

Object.assign( webpackConfig, {
  entry: {},
  output: {},
  devtool: webpackDevtool,
  watch: false,
  // plugins: [],
  ts: {
      compilerOptions: {
          sourceMap: false,
          sourceRoot: '',
          inlineSourceMap: true
      }
  },
  node: Object.assign( webpackConfig.node, webpackNode )
} );
Object.assign( webpackConfig.module, {
  postLoaders: webpackPostLoaders
} );

// remove CommonsChunkPlugin
webpackConfig.plugins.splice(0,1);

module.exports = webpackConfig;
