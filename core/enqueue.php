<?php
namespace OMG\Customizer_Curation\Core;

function setup() {
  add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\scripts' );
  add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\styles' );
}

function scripts() {
  wp_enqueue_script( 'omg-fields-js', CUSTOMIZER_CURATION_URL . '/omg-fields/dist/index.bundle.js', array(), CUSTOMIZER_CURATION_VERSION, true );
}

function styles() {
  wp_enqueue_style(
  	'omg-fields-js',
    CUSTOMIZER_CURATION_URL . '/omg-fields/dist/index.bundle.css',
    array(),
    CUSTOMIZER_CURATION_VERSION
	);
}
