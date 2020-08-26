<?php
/**
 * Kanopi functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Kanopi
 */

if ( ! function_exists( 'kanopi_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function kanopi_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Kanopi, use a find and replace
		 * to change 'kanopi' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'kanopi', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'kanopi' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'kanopi_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'kanopi_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function kanopi_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'kanopi_content_width', 640 );
}
add_action( 'after_setup_theme', 'kanopi_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function kanopi_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'kanopi' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'kanopi' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'kanopi_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function kanopi_scripts() {
	$timestamp = date( 'YmdHis' );

	wp_enqueue_style( 'kanopi-style', get_template_directory_uri() . '/dist/css/style.css', [], $timestamp );
	wp_enqueue_script( 'kanopi-navigation', get_template_directory_uri() . '/dist/js/scripts.js', [], $timestamp, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'kanopi_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}


/**
 * Custom Event post type.
 */
function kanopi_event_post_type() {

	$labels = [
		'name'                  => _x( 'Events', 'Post Type General Name', 'kanopi' ),
		'singular_name'         => _x( 'Event', 'Post Type Singular Name', 'kanopi' ),
		'menu_name'             => __( 'Events', 'kanopi' ),
		'name_admin_bar'        => __( 'Event', 'kanopi' ),
		'archives'              => __( 'Event Archives', 'kanopi' ),
		'attributes'            => __( 'Event Attributes', 'kanopi' ),
		'parent_item_colon'     => __( 'Parent Event:', 'kanopi' ),
		'all_items'             => __( 'All Events', 'kanopi' ),
		'add_new_item'          => __( 'Add New Event', 'kanopi' ),
		'add_new'               => __( 'Add New', 'kanopi' ),
		'new_item'              => __( 'New Event', 'kanopi' ),
		'edit_item'             => __( 'Edit Event', 'kanopi' ),
		'update_item'           => __( 'Update Event', 'kanopi' ),
		'view_item'             => __( 'View Event', 'kanopi' ),
		'view_items'            => __( 'View Events', 'kanopi' ),
		'search_items'          => __( 'Search Event', 'kanopi' ),
		'not_found'             => __( 'Not found', 'kanopi' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'kanopi' ),
		'featured_image'        => __( 'Featured Image', 'kanopi' ),
		'set_featured_image'    => __( 'Set featured image', 'kanopi' ),
		'remove_featured_image' => __( 'Remove featured image', 'kanopi' ),
		'use_featured_image'    => __( 'Use as featured image', 'kanopi' ),
		'insert_into_item'      => __( 'Insert into item', 'kanopi' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Event', 'kanopi' ),
		'items_list'            => __( 'Events list', 'kanopi' ),
		'items_list_navigation' => __( 'Events list navigation', 'kanopi' ),
		'filter_items_list'     => __( 'Filter Events list', 'kanopi' ),
	];
	$args   = [
		'label'               => __( 'Event', 'kanopi' ),
		'description'         => __( 'Custom Events', 'kanopi' ),
		'labels'              => $labels,
		'supports'            => [ 'title', 'editor', 'thumbnail' ],
		'taxonomies'          => [ 'event_type' ],
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 5,
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
	];
	register_post_type( 'events', $args );

}
add_action( 'init', 'kanopi_event_post_type', 0 );

/**
 * Custom Event Type taxonomy
 */
function kanopi_event_type_taxonomy() {

	$labels = [
		'name'                       => _x( 'Event Types', 'Taxonomy General Name', 'kanopi' ),
		'singular_name'              => _x( 'Event Type', 'Taxonomy Singular Name', 'kanopi' ),
		'menu_name'                  => __( 'Event Type', 'kanopi' ),
		'all_items'                  => __( 'All Event Types', 'kanopi' ),
		'parent_item'                => __( 'Parent Event Type', 'kanopi' ),
		'parent_item_colon'          => __( 'Parent Event Type:', 'kanopi' ),
		'new_item_name'              => __( 'New Event Type Name', 'kanopi' ),
		'add_new_item'               => __( 'Add New Event Type', 'kanopi' ),
		'edit_item'                  => __( 'Edit Event Type', 'kanopi' ),
		'update_item'                => __( 'Update Event Type', 'kanopi' ),
		'view_item'                  => __( 'View Event Type', 'kanopi' ),
		'separate_items_with_commas' => __( 'Separate event types with commas', 'kanopi' ),
		'add_or_remove_items'        => __( 'Add or remove event types', 'kanopi' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'kanopi' ),
		'popular_items'              => __( 'Popular Event Typess', 'kanopi' ),
		'search_items'               => __( 'Search Event Types', 'kanopi' ),
		'not_found'                  => __( 'Not Found', 'kanopi' ),
		'no_terms'                   => __( 'No event types', 'kanopi' ),
		'items_list'                 => __( 'Event Types list', 'kanopi' ),
		'items_list_navigation'      => __( 'Event Types list navigation', 'kanopi' ),
	];
	$args   = [
		'labels'            => $labels,
		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud'     => true,
	];
	register_taxonomy( 'event_type', [ 'events' ], $args );

}
add_action( 'init', 'kanopi_event_type_taxonomy', 0 );

if ( function_exists( 'kanopi_acf_add_local_field_group' ) ) :

	/**
	 * ACF Event Meta Field Group
	 *
	 * @var array the ACF field group array.
	 */
	kanopi_acf_add_local_field_group([
		'key'                   => 'group_5f45969fa2aff',
		'title'                 => 'Event Meta',
		'fields'                => [
			[
				'key'               => 'field_5f45993d5b664',
				'label'             => 'Subtitle',
				'name'              => 'subtitle',
				'type'              => 'text',
				'instructions'      => '',
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'default_value'     => '',
				'placeholder'       => '',
				'prepend'           => '',
				'append'            => '',
				'maxlength'         => '',
			],
			[
				'key'               => 'field_5f45994d5b665',
				'label'             => 'Start Date',
				'name'              => 'start_date',
				'type'              => 'date_time_picker',
				'instructions'      => '',
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => [
					'width' => '50',
					'class' => '',
					'id'    => '',
				],
				'display_format'    => 'd/m/Y g:i a',
				'return_format'     => 'd/m/Y g:i a',
				'first_day'         => 1,
			],
			[
				'key'               => 'field_5f45997e5b666',
				'label'             => 'End Date',
				'name'              => 'end_date',
				'type'              => 'date_time_picker',
				'instructions'      => '',
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => [
					'width' => '50',
					'class' => '',
					'id'    => '',
				],
				'display_format'    => 'd/m/Y g:i a',
				'return_format'     => 'd/m/Y g:i a',
				'first_day'         => 1,
			],
		],
		'location'              => [
			[
				[
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'events',
				],
			],
		],
		'menu_order'            => 0,
		'position'              => 'acf_after_title',
		'style'                 => 'default',
		'label_placement'       => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen'        => '',
		'active'                => true,
		'description'           => '',
	]);
endif;
