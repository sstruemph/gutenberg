<?php
/**
 * Init hooks.
 *
 * @package gutenberg
 */

/**
 * Gutenberg's Menu.
 *
 * Adds a new wp-admin menu page for the Gutenberg editor.
 *
 * @since 0.1.0
 */
function gutenberg_menu() {
	add_menu_page(
		'Gutenberg',
		'Gutenberg',
		'edit_posts',
		'gutenberg',
		'',
		'dashicons-edit'
	);

	add_submenu_page(
		'gutenberg',
		__( 'Demo', 'gutenberg' ),
		__( 'Demo', 'gutenberg' ),
		'edit_posts',
		'gutenberg'
	);

	if ( current_user_can( 'edit_posts' ) ) {
		add_submenu_page(
			'gutenberg',
			__( 'Support', 'gutenberg' ),
			__( 'Support', 'gutenberg' ),
			'edit_posts',
			__( 'https://wordpress.org/support/plugin/gutenberg/', 'gutenberg' )
		);
		add_submenu_page(
			'gutenberg',
			__( 'Documentation', 'gutenberg' ),
			__( 'Documentation', 'gutenberg' ),
			'edit_posts',
			'https://developer.wordpress.org/block-editor/'
		);
	}

	add_submenu_page(
		'gutenberg',
		__( 'Experiments Settings', 'gutenberg' ),
		__( 'Experiments', 'gutenberg' ),
		'edit_posts',
		'gutenberg-experiments',
		'the_gutenberg_experiments'
	);
}
add_action( 'admin_menu', 'gutenberg_menu', 9 );

// disable loading and enqueuing block editor scripts and styles
add_filter( 'should_load_block_editor_scripts_and_styles', '__return_false', 11 );

add_filter( 'should_load_separate_core_block_assets', '__return_true' );

// Add `editorScript` to Gutenberg block.json data if it's missing
function add_core_editor_script( $metadata ) {
	if ( ! empty( $metadata['name'] ) && str_starts_with( $metadata['name'], 'core/' ) ) {
		$block_name = str_replace( 'core/', '', $metadata['name'] );
		if ( ! isset( $metadata['editorScript'] ) ) {
			if ( isset( $metadata['file'] ) && strstr( $metadata['file'], 'gutenberg') ) {
				$metadata['editorScript'] = "file:./editor.min.js";
			}
		}
	}

	return $metadata;
}

add_filter( 'block_type_metadata', 'add_core_editor_script' );

function get_block_importmap() {
	$block_registry = WP_Block_Type_Registry::get_instance();
	$scripts = wp_scripts();
	$styles = wp_styles();
	$blocks         = array();

	foreach ( $block_registry->get_all_registered() as $block_name => $block_type ) {
		$imports = array();
		if ( isset( $block_type->editor_script_handles ) ) {
			foreach ( $block_type->editor_script_handles as $handle ) {
				$spec = $scripts->registered[ $handle ];
				$imports[] = array(
					'type' => 'script',
					'handle' => $spec->handle,
					'src' => $spec->src,
					'ver' => $spec->ver
				);
			}
		}
		if ( isset( $block_type->editor_style_handles ) ) {
			foreach ( $block_type->editor_style_handles as $handle ) {
				$spec = $styles->registered[ $handle ];
				$imports[] = array(
					'type' => 'style',
					'handle' => $spec->handle,
					'src' => $spec->src,
					'ver' => $spec->ver
				);
			}
		}
		if ( ! empty( $imports ) ) {
			$blocks[ $block_name ] = $imports;
		}
	}

	return $blocks;
}

function emit_importmap() {
	wp_register_script( 'wp-importmap', '');
	wp_add_inline_script( 'wp-importmap', 'wp.importmap = ' . wp_json_encode( get_block_importmap() ) . ';' );
  wp_enqueue_script('wp-importmap');
}

add_action( 'enqueue_block_editor_assets', 'emit_importmap' );