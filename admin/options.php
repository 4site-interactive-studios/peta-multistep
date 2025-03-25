<?php
// Register Multistep Post Type
function register_peta_multistep_post_type() {
    $labels = array(
        'name'                  => _x( 'Multistep', 'Post Type General Name', 'peta-multistep' ),
        'singular_name'         => _x( 'Multistep', 'Post Type Singular Name', 'peta-multistep' ),
        'menu_name'             => __( 'Multistep', 'peta-multistep' ),
        'name_admin_bar'        => __( 'Multistep', 'peta-multistep' ),
        'archives'              => __( 'Multistep Archives', 'peta-multistep' ),
        'attributes'            => __( 'Multistep Attributes', 'peta-multistep' ),
        'parent_item_colon'     => __( 'Parent Multistep:', 'peta-multistep' ),
        'all_items'             => __( 'All Multistep ', 'peta-multistep' ),
        'add_new_item'          => __( 'Add New Multistep', 'peta-multistep' ),
        'add_new'               => __( 'Add New', 'peta-multistep' ),
        'new_item'              => __( 'New Multistep', 'peta-multistep' ),
        'edit_item'             => __( 'Edit Multistep', 'peta-multistep' ),
        'update_item'           => __( 'Update Multistep', 'peta-multistep' ),
        'view_item'             => __( 'View Multistep', 'peta-multistep' ),
        'view_items'            => __( 'View Multistep ', 'peta-multistep' ),
        'search_items'          => __( 'Search Multistep', 'peta-multistep' ),
        'not_found'             => __( 'Not found', 'peta-multistep' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'peta-multistep' ),
    );
    $args = array(
        'label'                 => __( 'Multistep', 'peta-multistep' ),
        'description'           => __( 'Multistep', 'peta-multistep' ),
        'labels'                => $labels,
		'supports'              => array( 'title' ),
		'hierarchical'          => false,
		'public'                => false,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 20,
		'menu_icon'             => 'dashicons-lightbulb',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => false,
		'can_export'            => false,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => false,
		'capability_type'       => 'page',
		'show_in_rest'          => false,
    );
    register_post_type( 'peta_multistep', $args );
}

add_action( 'init', 'register_peta_multistep_post_type', 0 );

// Add new columns to list page
add_filter( 'manage_peta_multistep_posts_columns', 'foursite_add_new_columns' );
function foursite_add_new_columns( $columns ) {
    unset($columns['date']);
    unset($columns['title']);
    $columns['post_id'] = __( 'Post ID', 'peta-multistep' );
    $columns['title'] = __( 'Title', 'peta-multistep' );
    $columns['custom_date'] = __('Published', 'peta-multistep');
    $columns['status'] = __( 'Status', 'peta-multistep' );
    // $columns['peta_start_date'] = __( 'Start Date', 'peta-multistep' );
    // $columns['peta_end_date'] = __( 'End Date', 'peta-multistep' );
    
    $columns['promotion_type'] = __( 'Type', 'peta-multistep' );
    $columns['shortcode'] = __( 'Shortcode', 'peta-multistep' );
    
    return $columns;
}

add_action( 'manage_peta_multistep_posts_custom_column', 'foursite_peta_multistep_column', 10, 2);
function foursite_peta_multistep_column( $column, $post_id ) {
  $status = get_post_meta( $post_id, 'peta_multistep_display', true);

  if ( $column == 'status' ) {
    echo $status === 'turned-off' ? "<span style='color: red;'>Disabled</span>" : "<span style='color: green;'>Enabled</span>";
  }
  
  
  if ( 'promotion_type' === $column ) {
    $promotion_type = get_post_meta( $post_id, 'peta_promotion_type', true );

    echo implode(" ", array_map("ucfirst", explode("_", $promotion_type)));
  }
  
  if ('custom_date' === $column) {
    echo get_the_date( 'Y/m/d' ).' at '.get_the_date('g:i a');
  }

  if ('post_id' === $column) {
    echo $post_id;
  }

  if ('shortcode' === $column) {
    // Show shortcode as a text field with a copy button
    $shortcode = '[peta-multistep id=\''.$post_id.'\']';
    echo '<div style="display:flex;"><input type="text" value="'.$shortcode.'" readonly="readonly" style="width: 100%;"><button class="button button-primary" type="button" onclick="copyToClipboard(this)">Copy</button></div>';
  }
}

add_filter( 'manage_edit-peta_multistep_sortable_columns', 'foursite_peta_multistep_sortable_columns');
function foursite_peta_multistep_sortable_columns( $columns ) {
  $columns['post_id'] = 'post_id';
  $columns['custom_date'] = 'custom_date';
  $columns['status'] = 'peta_multistep_display';

  return $columns;
}

function copy_to_clipboard_js() {
  echo <<< PETA_COPY
    <script type="text/javascript">
    function copyToClipboard(element) {
      var _temp = jQuery("<input>");
      jQuery("body").append(_temp);
      _temp.val(jQuery(element).prev().val()).select();
      document.execCommand("copy");
      _temp.remove();
      element.innerHTML = "Copied!";
      element.classList.remove("button-primary");
      setTimeout(function(){
        element.innerHTML = "Copy";
        element.classList.add("button-primary");
      }, 2000);
    }
    </script>
PETA_COPY;
}
function peta_multistep_remove_inline_edit( $actions, $post ){
    // unset( $actions );
    unset( $actions['inline hide-if-no-js'] );
    return $actions;
}
add_filter('post_row_actions','peta_multistep_remove_inline_edit', 10, 2);

add_action('admin_footer', function () {
    $screen = get_current_screen();
    
    if ($screen && $screen->post_type === 'peta_multistep') {
        copy_to_clipboard_js();
    }
});
