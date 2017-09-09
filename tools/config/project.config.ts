import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  /**
   * Enable SCSS stylesheet compilation.
   * Set ENABLE_SCSS environment variable to 'true' or '1'
   * @type {boolean}
   */
  ENABLE_SCSS = true;

  /**
   * The default title of the application as used in the `<title>` tag of the
   * `index.html`.
   * @type {string}
   */
  APP_TITLE = 'La Prophétie du Sang';

  /**
   * Tracking ID.
   * @type {string}
   */
  GOOGLE_ANALYTICS_ID = 'UA-94110732-1';


  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];

    // Add packages (e.g. ng2-translate)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'ng2-translate',
    //   // Path to the package's bundle
    //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
    // }];
    //
    let additionalPackages: ExtendPackages[] = [];
    additionalPackages.push({
      name:'@ngrx/core',
      path:'node_modules/@ngrx/core/bundles',
      packageMeta:{
        main: 'core.min.umd.js',
        defaultExtension: 'js',
      }
    });
    additionalPackages.push({
      name:'@ngrx/store',
      path:'node_modules/@ngrx/store/bundles',
      packageMeta:{
        main: 'store.min.umd.js',
        defaultExtension: 'js',
      }
    });
    additionalPackages.push({
      name:'animated-scroll-to',
      path:'node_modules/animated-scroll-to',
      packageMeta:{
        main: 'animated-scroll-to.js',
        defaultExtension: 'js',
      }
    });
    this.addPackagesBundles(additionalPackages);
    delete this.SYSTEM_BUILDER_CONFIG['packageConfigPaths'];

    /* Add proxy middleware */
    this.PROXY_MIDDLEWARE = [
      require('http-proxy-middleware')('/wp-json', { ws: false, target: 'http://localhost:9000/' })
    ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
