<?php

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
	define( 'CUSTOMIZER_CURATION_VERSION', '0.6.3' );
}

if ( file_exists( CUSTOMIZER_CURATION_DIR . '/vendor/autoload.php' ) ) {
	require_once CUSTOMIZER_CURATION_DIR . '/vendor/autoload.php';
}

\AaronHolbrook\Autoload\autoload( CUSTOMIZER_CURATION_DIR . '/core' );
