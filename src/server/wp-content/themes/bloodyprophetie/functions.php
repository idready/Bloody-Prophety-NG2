<?php
/**
 * Twenty Sixteen functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 *
 * @package WordPress
 * @subpackage Bloody_Prophety
 * @since Bloody Prophety 1.0
 */

/***** WP REST API Cache *****/
// HEADER
add_filter( 'rest_cache_headers', function( $headers ) {
    $headers['Cache-Control'] = 'public, max-age=3600';

    return $headers;
} );
// TIMEOUT
add_filter( 'rest_cache_timeout', function() {
    // https://codex.wordpress.org/Transients_API#Using_Time_Constants
    // return 15 * DAY_IN_SECONDS;
    return 15 * (3600 * 24);
} );
// HIDE / SHOW ADMIN LINK ON TOOLBAR
add_filter( 'rest_cache_show_admin', function() {
    return true;
} );

// function filter_rest_allow_anonymous_comments() {
//     return true;
// }
// add_filter('rest_allow_anonymous_comments','filter_rest_allow_anonymous_comments');
