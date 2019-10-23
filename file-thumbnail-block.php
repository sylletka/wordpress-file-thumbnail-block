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
 * Text Domain: file-thumbnail-block
 *
 * @package file-thumbnail-block
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'file_thumbnail_block_load_textdomain' );

function file_thumbnail_block_load_textdomain() {
	load_plugin_textdomain( 'file-thumbnail-block', false, basename( __DIR__ ) . '/languages' );
}

function file_thumbnail_block_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'file-thumbnail-block',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	register_block_type( 'sylletka/file-thumbnail-block', array(
		'style' => 'file-thumbnail-block',
		'editor_script' => 'file-thumbnail-block',
	) );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    wp_set_script_translations( 'file-thumbnail-block', 'file-thumbnail-block' );
  }

}
add_action( 'init', 'file_thumbnail_block_register_block' );
