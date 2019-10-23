<?php

/**
 * Plugin Name: Wordpress file thumbnail block
 * Plugin URI: https://github.com/sylletka/wordpress-file-thumbnail-block
 * Description: This plugin provides a Gutenberg block that inserts a link to files as a file icon or a thumbnail.
 * Version: 1.0
 * Requires at least: 5.0
 * Author: Samuele Saorin
 * License: GPL3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: pdf-preview-block
 *
 * @package pdf-preview
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'pdf_preview_block_load_textdomain' );

function pdf_preview_block_load_textdomain() {
	load_plugin_textdomain( 'pdf-preview-block', false, basename( __DIR__ ) . '/languages' );
}

function pdf_preview_block_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'pdf-preview-block',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	register_block_type( 'sylletka/pdf-preview-block', array(
		'style' => 'pdf-preview-block',
		'editor_script' => 'pdf-preview-block',
	) );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    wp_set_script_translations( 'pdf-preview-block', 'pdf-preview-block' );
  }

}
add_action( 'init', 'pdf_preview_block_register_block' );
