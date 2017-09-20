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
	define( 'CUSTOMIZER_CURATION_VERSION', '0.1.0' );
}

require_once __DIR__ . '/core/autoload.php';

\OMG\Autoload\autoload( __DIR__. '/core' );
\OMG\Autoload\autoload( __DIR__. '/fields' );

Customizer_Curation\Core\setup();
