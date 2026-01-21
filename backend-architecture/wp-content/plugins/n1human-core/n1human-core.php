<?php
/**
 * Plugin Name: n1Human Core
 * Description: Núcleo de lógica de negocio y API REST para n1Human Headless e-commerce.
 * Version: 1.0.0
 * Author: N1Human Engineering Team
 * Text Domain: n1human-core
 */

namespace N1Human\Core;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Autoloader simple para el namespace
spl_autoload_register( function ( $class ) {
    $prefix = 'N1Human\Core\';
    $base_dir = plugin_dir_path( __FILE__ ) . 'includes/';

    $len = strlen( $prefix );
    if ( strncmp( $prefix, $class, $len ) !== 0 ) {
        return;
    }

    $relative_class = substr( $class, $len );
    $file = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';

    if ( file_exists( $file ) ) {
        require $file;
    }
});

// Inicializar API
add_action( 'rest_api_init', function () {
    $product_controller = new Api\ProductController();
    $product_controller->register_routes();
    
    $order_controller = new Api\OrderController();
    $order_controller->register_routes();
});

// Configurar CORS para permitir peticiones desde Netlify/Localhost
add_action( 'init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
});

