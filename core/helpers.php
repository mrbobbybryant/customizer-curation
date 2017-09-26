<?php
function get_currated_values( $setting, $callback = false ) {
	$values = get_theme_mod( $setting );

	if ( empty( $values ) ) {
		return false;
	}

	$values = json_decode( $values );

	return array_map( function( $item ) use ( $callback ) {
		if ( false === $callback ) {
			return get_post( $item->id );
		}

		return call_user_func_array( $callback, [ $item ] );
	}, $values );

}