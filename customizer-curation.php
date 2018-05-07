<?php
/*
Plugin Name:  Customizer Curation
Plugin URI:   https://github.com/mrbobbybryant/customizer-curation
Description:  An autosuggest field for curating content via the customizer.
Version:      1.0.0
Author:       Bobby Bryant
Author URI:   https://github.com/mrbobbybryant
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
*/

if ( !defined('ABSPATH') ) {
	exit;
}

if ( !defined( 'CUSTOMIZER_CURATION_DIR' ) ) {
	define( 'CUSTOMIZER_CURATION_DIR', dirname( __FILE__ ) );
}

if ( !defined( 'CUSTOMIZER_CURATION_URL' ) ) {
	define( 'CUSTOMIZER_CURATION_URL', get_stylesheet_directory_uri() . '/vendor' );
}

if ( !defined( 'CUSTOMIZER_CURATION_FILE' ) ) {
	define( 'CUSTOMIZER_CURATION_FILE', __FILE__ );
}

if ( !defined( 'CUSTOMIZER_CURATION_VERSION' ) ) {
	define( 'CUSTOMIZER_CURATION_VERSION', '1.0.0' );
}

add_action( 'after_setup_theme', function() {
	require_once CUSTOMIZER_CURATION_DIR . '/core/customizer-curation-control.php';
	require_once CUSTOMIZER_CURATION_DIR . '/core/helpers.php';
	require_once CUSTOMIZER_CURATION_DIR . '/core/validation_cb.php';
} );

