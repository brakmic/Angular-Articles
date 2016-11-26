const webpack = require('webpack');
const path = require('path');
const helper = require('./helper');
/*
 * Webpack Plugins
 */
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const resolveNgRoute = require('@angularclass/resolve-angular-routes');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');

/*
 * Webpack Constants
 */
const HMR = helper.hasProcessFlag('hot');
const METADATA = {
  port: 3000,
  host: 'localhost',
  title: 'ServiceWorkers',
  urlPrefix: '/',
  baseUrl: '/',
  isDevServer: helper.isWebpackDevServer(),
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
 const isProd = options.env === 'production';
 return {

   /*
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {

    'polyfills': './src/init/polyfills.ts',
    'vendor': './src/init/vendor.ts',
    'main': './src/init/main.ts'

  },

  externals: ['window'],

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js', '.json', '.css', '.scss'],

    // An array of directory names to be resolved to the current directory
    modules: [
        helper.getRoot('src'),
        helper.getRoot('src/app'),
        helper.getRoot('src/vendor'),
        helper.getRoot('node_modules')
    ],
    alias: {
      'lodash': helper.getRoot('node_modules/lodash/index.js'),
      'jquery': helper.getRoot('src/vendor/jquery/jquery-2.2.3.min.js'),
      'inert': helper.getRoot('node_modules/inert/lib/index.js'),
      'bows': helper.getRoot('src/vendor/bows/index.js')
    },

  },

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    rules: [
      { 
        test: require.resolve('jquery'), 
        loader: 'expose-loader?$!expose-loader?jQuery' 
      },
      {
          test: /datatables\.net.*/,
          loader: 'imports?define=>false'
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helper.getRoot('node_modules/rxjs'),
          helper.getRoot('node_modules/@angular'),
        ]
      },
      /*
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        loaders: [
          '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader',
            'angular2-template-loader',
            'angular2-router-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      /*
       * Raw loader support for *.css files
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.css$/,
        loaders: ['to-string', 'raw', 'style', 'css']
        //loaders: ['raw-loader']
      },
      /*
      * Load Sass Styles
      * See: See: https://github.com/jtangelder/sass-loader
      */
      { 
        test: /\.scss$/, 
        loaders: ['to-string', 'style', 'css', 'sass'] 
      },
      {
        test: /initial\.scss$/,
        loader: ExtractTextPlugin.extract(
          {
            fallbackLoader: 'style-loader',
            loader: 'css-loader!sass-loader?sourceMap'
          })
      },
      {
        test: /\.woff(2)?(\?v=.+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=.+)?$/,
        loader: 'file-loader'
      },
      { 
        test: /bootstrap\/dist\/js\/umd\//, 
        loader: 'imports?jQuery=jquery' 
      },
      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helper.getRoot('src/index.html')]
      },

      /* File loader for supporting images, for example, in CSS files.
      */
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file'
      },

      {
         enforce: 'post',
         test: /\.js$/,
         loader: 'string-replace-loader',
         query: {
           search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
           replace: 'var sourceMappingUrl = "";',
           flags: 'g'
         }
      }

    ]

  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [


    new ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        jquery: 'jquery'
    }),

    /**
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://gist.github.com/sokra/27b24881210b56bbaff7
     */
    new LoaderOptionsPlugin({
      options: {
          METADATA: METADATA,
          context: __dirname,
          output: {
            path: helper.getRoot('dist')
          },
          // alias: {
          //   'jquery': helper.getRoot('src/vendor/jquery/jquery-2.2.3.min'),
          // }
      }
    }),

    new ExtractTextPlugin({ filename: 'initial.css', allChunks: true }),

    new AssetsPlugin({
        path: helper.getRoot('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
    }),

    new DashboardPlugin(),

    /*
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new ForkCheckerPlugin(),
    /*
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),


    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helper.getRoot('src'),
      resolveNgRoute(helper.getRoot('src'))
    ),

    new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets'
        },
        {
          from: './favicon.ico'
        },
        {
          from: 'src/sw/my-sw.js'
        },
        {
          from: 'src/sw/my-sw.map'
        }
        ]),

    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: METADATA.title,
      isDevServer: METADATA.isDevServer,
      favicon: 'favicon.ico',
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'head'
    }),

    /*
    * Plugin: ScriptExtHtmlWebpackPlugin
    * Description: Enhances html-webpack-plugin functionality
    * with different deployment options for your scripts including:
    *
    * See: https://github.com/numical/script-ext-html-webpack-plugin
    */
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

     new HtmlElementsPlugin({
      headTags: require('./head-config.common')
    }),

    // Fix Angular 2
    new NormalModuleReplacementPlugin(
      /facade(\\|\/)async/,
      helper.getRoot('node_modules/@angular/core/src/facade/async.js')
    ),
    new NormalModuleReplacementPlugin(
      /facade(\\|\/)collection/,
      helper.getRoot('node_modules/@angular/core/src/facade/collection.js')
    ),
    new NormalModuleReplacementPlugin(
      /facade(\\|\/)errors/,
      helper.getRoot('node_modules/@angular/core/src/facade/errors.js')
    ),
    new NormalModuleReplacementPlugin(
      /facade(\\|\/)lang/,
      helper.getRoot('node_modules/@angular/core/src/facade/lang.js')
    ),
    new NormalModuleReplacementPlugin(
      /facade(\\|\/)math/,
      helper.getRoot('node_modules/@angular/core/src/facade/math.js')
    ),

  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

 };
};

