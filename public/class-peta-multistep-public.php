<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://www.4sitestudios.com
 * @since      1.0.0
 *
 * @package    Peta_Multistep
 * @subpackage Peta_Multistep/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Peta_Multistep
 * @subpackage Peta_Multistep/public
 * @author     Fernando Santos <fernando@4sitestudios.com>
 */
class Peta_Multistep_Public {

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
	 * @param      string    $peta_multistep       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $peta_multistep, $version ) {

		$this->peta_multistep = $peta_multistep;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Peta_Multistep_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Peta_Multistep_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->peta_multistep, plugin_dir_url( __FILE__ ) . 'css/peta-multistep-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Add a preload link for the main stylesheet.
	 *
	 * @since    1.0.0
	 */
	public function add_preload_link() {
		echo '<link rel="preload" href="' . plugin_dir_url( __FILE__ ) . 'css/peta-multistep-public.css?ver=' . $this->version . '" as="style">';
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		$script_ver = $this->version;
		$main_script_url = plugin_dir_url( __FILE__ ) . 'js/peta-multistep-public.js';
		wp_enqueue_script( 'peta-multistep-public', $main_script_url, array(), $script_ver, false );
	}
}