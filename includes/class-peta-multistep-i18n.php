<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://www.4sitestudios.com
 * @since      1.0.0
 *
 * @package    Peta_Multistep
 * @subpackage Peta_Multistep/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Peta_Multistep
 * @subpackage Peta_Multistep/includes
 * @author     Fernando Santos <fernando@4sitestudios.com>
 */
class Peta_Multistep_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'peta-multistep',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
