<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.4sitestudios.com
 * @since             1.0.0
 * @package           peta_multistep
 *
 * @wordpress-plugin
 * Plugin Name:       PETA Multistep
 * Plugin URI:        https://www.4sitestudios.com/peta-multistep/
 * Description:       Add PETA Multistep Form to your WordPress site.
 * Version:           0.0.3
 * Author:            4Site Studios
 * Author URI:        https://www.4sitestudios.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       peta-multistep
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}
if ( defined( 'PETA_MULTISTEP_VERSION' ) ) {
    error_log('PETA Multistep Already Defined');
}
/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PETA_MULTISTEP_VERSION', '0.0.3' );

// Gutenberg Block
function peta_en_form_block() {
	register_block_type(__DIR__ . '/blocks/en-form');
}
add_action( 'init', 'peta_en_form_block' );

function generate_en_form_shortcode($atts) {
    $ret_start = '<!-- PETA Multistep Start -->';
    $ret_end = '<!-- PETA Multistep End -->';
    // We will need to get the POST ID from the shortcode, and load the form data from the post
    $post_id = $atts['id'];
    if (empty($post_id)) {
        return $ret_start . '<!-- No post ID found -->' . $ret_end;
    }
    $post = get_post($post_id);
    if (empty($post)) {
        return $ret_start . '<!-- No post found -->' . $ret_end;
    }
    $status = get_field('peta_multistep_display', $post_id);
    if('turned-on' !== $status) {
        return $ret_start . '<!-- PETA Multistep is turned off -->' . $ret_end;
    }

    $page_title = htmlspecialchars(get_the_title($post_id), ENT_QUOTES, 'UTF-8');

    $peta_promotion_type = get_field('peta_promotion_type', $post_id);
    $promotion_type = str_replace('multistep_', '', trim($peta_promotion_type));

    $peta_donation_page = get_field('peta_donation_page', $post_id);
    

    $peta_hero_type = get_field('peta_hero_type', $post_id);
    $peta_image = get_field('peta_image', $post_id);
    $peta_video = get_field('peta_video', $post_id);
    $peta_use_logo = get_field('peta_use_logo', $post_id);
    $peta_logo = get_field('peta_logo', $post_id);
    $peta_logo_position = get_field('peta_logo_position', $post_id);
    $peta_divider = get_field('peta_divider', $post_id);
    $peta_title = htmlspecialchars(get_field('peta_title', $post_id), ENT_QUOTES, 'UTF-8');
    $peta_paragraph = htmlspecialchars(get_field('peta_paragraph', $post_id), ENT_QUOTES, 'UTF-8');
    $peta_footer = htmlspecialchars(get_field('peta_footer', $post_id), ENT_QUOTES, 'UTF-8');
    $peta_bg_color = get_field('peta_bg_color', $post_id);
    $peta_text_color = get_field('peta_text_color', $post_id);
    $peta_form_color = get_field('peta_form_color', $post_id);
    $peta_cookie_hours = get_field('peta_cookie_hours', $post_id);
    $peta_cookie_name = get_field('peta_cookie_name', $post_id);
    $peta_content_position = get_field('peta_content_position', $post_id);
    $peta_append_url_params = get_field('peta_append_url_params', $post_id) ? 'true' : 'false';
    $confetti = array();

    if(have_rows('peta_confetti', $post_id) ){
        while( have_rows('peta_confetti', $post_id) ){
            the_row();
            $confetti[] = get_sub_field('color');
        }
    }

    $peta_video_auto_play = ($peta_hero_type == 'autoplay-video');
    $peta_confetti = htmlspecialchars(json_encode($confetti), ENT_QUOTES, 'UTF-8');
    $logo_position_options = isset($peta_logo_position['position_options']) ? $peta_logo_position['position_options'] : [];
    $logo_position_options_values['top'] = isset($peta_logo_position['top']) ? $peta_logo_position['top'] : '';
    $logo_position_options_values['left'] = isset($peta_logo_position['left']) ? $peta_logo_position['left'] : '';
    $logo_position_options_values['right'] = isset($peta_logo_position['right']) ? $peta_logo_position['right'] : '';
    $logo_position_options_values['bottom'] = isset($peta_logo_position['bottom']) ? $peta_logo_position['bottom'] : '';
    
    if(!is_array($logo_position_options)) {
        $logo_position_options = [];
    }

    $peta_logo_position = htmlspecialchars(json_encode($logo_position_options), ENT_QUOTES, 'UTF-8');
    $logo_position_options = htmlspecialchars(json_encode($logo_position_options_values), ENT_QUOTES, 'UTF-8');

    $ret = <<<PETA
    $ret_start
    <div id="peta-multistep-$post_id"
    data-id="$post_id"
    data-name="$page_title"
    data-url="$peta_donation_page"
    data-type="$promotion_type"
    data-hero-type="$peta_hero_type"
    data-image="$peta_image"
    data-video="$peta_video"
    data-video-auto-play="$peta_video_auto_play"
    data-use-logo="$peta_use_logo"
    data-logo="$peta_logo"
    data-logo-position="$peta_logo_position"
    data-logo-position-options="$logo_position_options"
    data-divider="$peta_divider"
    data-title="$peta_title"
    data-paragraph="$peta_paragraph"
    data-footer="$peta_footer"
    data-bg-color="$peta_bg_color"
    data-text-color="$peta_text_color"
    data-form-color="$peta_form_color"
    data-cookie-hours="$peta_cookie_hours"
    data-cookie-name="$peta_cookie_name"
    data-confetti="$peta_confetti"
    data-content-position="$peta_content_position"
    data-append-url-params="$peta_append_url_params"
    class="peta-multistep peta-multistep-$post_id peta-multistep-$peta_content_position"></div>
    $ret_end
    PETA;
    return $ret;

}
add_shortcode('peta-multistep', 'generate_en_form_shortcode');

function peta_en_form_wp_enqueue_scripts() {
    // wp_register_script( 'peta-multistep-script', plugins_url( '/en-form/dist/peta-multistep.js', __FILE__ ), array(), PETA_MULTISTEP_VERSION, false );
    wp_enqueue_script('peta-multistep-script', plugins_url( '/en-form/dist/peta-multistep.js', __FILE__ ), array(), PETA_MULTISTEP_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'peta_en_form_wp_enqueue_scripts' );


/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-peta-multistep-activator.php
 */
function activate_peta_multistep() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-peta-multistep-activator.php';
	Peta_Multistep_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-peta-multistep-deactivator.php
 */
function deactivate_peta_multistep() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-peta-multistep-deactivator.php';
	Peta_Multistep_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_peta_multistep' );
register_deactivation_hook( __FILE__, 'deactivate_peta_multistep' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-peta-multistep.php';



/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_peta_multistep() {
	$plugin = new Peta_Multistep();
	$plugin->run();
}
run_peta_multistep();
