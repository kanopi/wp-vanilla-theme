<?php
/**
 * Kanopi Theme Customizer
 *
 * @package Kanopi
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function kanopi_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial( 'blogname', array(
			'selector'        => '.site-title a',
			'render_callback' => 'kanopi_customize_partial_blogname',
		) );
		$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
			'selector'        => '.site-description',
			'render_callback' => 'kanopi_customize_partial_blogdescription',
		) );
	}

	// Footer Section.
	$wp_customize->add_section(
		'footer_info',
		[
			'title'    => 'Footer',
			'priority' => 21,
		]
	);

	$wp_customize->add_setting(
		'copyright',
		[
			'default'           => '',
			'type'              => 'option',
			'transport'         => 'refresh',
			'sanitize_callback' => 'wp_filter_nohtml_kses',
		]
	);

	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize,
			'copyright',
			[
				'label'    => __( 'Copyright Company', 'kanopi' ),
				'section'  => 'footer_info',
				'settings' => 'copyright',
				'type'     => 'text',
			]
		)
	);
}
add_action( 'customize_register', 'kanopi_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function kanopi_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function kanopi_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function kanopi_customize_preview_js() {
	wp_enqueue_script( 'kanopi-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'kanopi_customize_preview_js' );
