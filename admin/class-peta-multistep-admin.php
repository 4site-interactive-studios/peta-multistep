<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://www.4sitestudios.com
 * @since      1.0.0
 *
 * @package    peta_multistep
 * @subpackage peta_multistep/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    peta_multistep
 * @subpackage peta_multistep/admin
 * @author     Fernando Santos <fernando@4sitestudios.com>
 */
class Peta_Multistep_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $peta_multistep    The ID of this plugin.
	 */
	private $peta_multistep;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $peta_multistep       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $peta_multistep, $version ) {

		$this->peta_multistep = $peta_multistep;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in peta_multistep_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The peta_multistep_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->peta_multistep, plugin_dir_url( __FILE__ ) . 'css/peta-multistep-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in peta_multistep_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The peta_multistep_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->peta_multistep, plugin_dir_url( __FILE__ ) . 'js/peta-multistep-admin.js', array( 'jquery' ), $this->version, false );

	}

}
