<?php
/**
 * Theme and external script registration
 *
 * @author Kanopi Studios.
 */

use WPWebpackLoader\AssetLoader;
use WPWebpackLoader\Model\LoaderConfiguration;

/**
 * Gets a development asset URL if one is defined
 *
 * @return string
 */
function kanopi_development_asset_url() {
	return defined( 'KANOPI_DEVELOPMENT_ASSET_URL' ) ? KANOPI_DEVELOPMENT_ASSET_URL : '';
}

/**
 * Find the application environment, defaults to 'production'
 *
 * @return string
 */
function kanopi_current_environment() {
	return defined( 'KANOPI_APP_ENVIRONMENT' ) ? KANOPI_APP_ENVIRONMENT : 'production';
}

function kanopi_current_environment_initialization_script() {
	$script = '';
	switch ( kanopi_current_environment() ) {
		case "staging":
			$script = 'scripts/environment.staging.js';
			break;
		case "local":
			$script = 'scripts/environment.local.js';
			break;
		default:
			break;
	}

	return $script;
}

/**
 * Standard configuration theme asset loader, aborts page load if there is a misconfiguration
 *
 * @return AssetLoader
 */
function kanopi_script_loader() {
	try {
		return new AssetLoader( 
			get_stylesheet_directory_uri(),
			kanopi_development_asset_url(),
			new LoaderConfiguration(
				kanopi_theme_version(),
				[ /* List of production URLs */ ]
			)
		);
	}
	catch ( Exception $exception ) {
		wp_die( wp_kses_post( $exception->getMessage() ) );
	}
}

/**
 * @param string $_file_path
 *
 * @return string
 */
function kanopi_static_asset_url( $_file_path ) {
	return Kanopi_script_loader()->static_assets_url( $_file_path );
}

/**
 * Get the current themes version
 *
 * @return string
 */
function kanopi_theme_version() {
	$theme = wp_get_theme();
	if ( !( $theme instanceof \WP_Theme ) ) {
		return false;
	}

	$version = $theme->get( 'Version' );

	return empty( $version ) || !is_string( $version ) ? 'DEV' : $version;
}

/**
 * Include theme specific CSS and JS
 */
function kanopi_initialize_scripts() {
	add_action( 'wp_enqueue_scripts',
		function() {
			$assets = kanopi_script_loader();
			$environment_script = kanopi_current_environment_initialization_script();
			if ( !empty( $environment_script ) ) {
				wp_enqueue_script( 'kanopi-environment',
					$assets->static_assets_url( $environment_script ),
					[],
					Kanopi_theme_version(),
					true );
			}

			$assets->register_vendor_script( 'central' );
			$assets->register_vendor_script( 'vendor' );

			$assets->register_runtime_script( 'runtime', [ 'jquery' ] );
			$assets->register_style( 'theme' );
			$assets->register_script( 'legacy' );

			$assets->enqueue_assets();

			// Required theme stylesheet
			wp_register_style(
				'kanopi-theme',
				esc_url_raw( get_stylesheet_directory_uri() . '/style.css' ),
				[],
				Kanopi_theme_version()
			);
			wp_enqueue_style( 'kanopi-theme' );

			// Comment scripts
			if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
				wp_enqueue_script( 'comment-reply' );
			}
		} );
}
