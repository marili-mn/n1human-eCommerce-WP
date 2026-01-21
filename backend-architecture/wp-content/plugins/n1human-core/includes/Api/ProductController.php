<?php
namespace N1Human\Core\Api;

use WP_REST_Controller;
use WP_REST_Server;
use WP_REST_Response;

class ProductController extends WP_REST_Controller {

    public function __construct() {
        $this->namespace = 'n1human/v1';
        $this->rest_base = 'products';
    }

    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->rest_base, array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_items' ),
                'permission_callback' => '__return_true', // Público
            ),
        ) );
    }

    /**
     * Devuelve la lista de productos simulando una DB.
     * Estructura idéntica al JSON del frontend.
     */
    public function get_items( $request ) {
        // En un caso real, esto vendría de WP_Query sobre un Custom Post Type 'product'
        // Aquí hardcodeamos los datos para garantizar paridad con el Mockup JS.
        
        $products = [
            [
                "id" => 101,
                "name" => "Camisa Falcon 9",
                "slug" => "camisa-falcon-9",
                "price" => 45.00,
                "category" => "camisas",
                "image" => "assets/img/npcHuman1 (1).jpg",
                "description" => "Inspirada en la ingeniería aeroespacial. Corte minimalista."
            ],
            [
                "id" => 102,
                "name" => "Camisa Heavy",
                "slug" => "camisa-heavy",
                "price" => 55.00,
                "category" => "camisas",
                "image" => "assets/img/npcHuman1 (2).jpg",
                "description" => "Tejido resistente para entornos hostiles."
            ],
            [
                "id" => 201,
                "name" => "Remera Finix",
                "slug" => "remera-finix",
                "price" => 25.00,
                "category" => "remeras",
                "image" => "assets/img/npcHuman1 (3).jpg",
                "description" => "Algodón orgánico con diseño retro-futurista."
            ],
            [
                "id" => 301,
                "name" => "Gafas Dragon",
                "slug" => "gafas-dragon",
                "price" => 80.00,
                "category" => "accesorios",
                "image" => "assets/img/black-hole-eye-screen.jpg",
                "description" => "Protección UV nivel orbital."
            ]
        ];

        // Filtrado básico por categoría si se pide ?category=x
        $category_param = $request->get_param( 'category' );
        if ( ! empty( $category_param ) ) {
            $products = array_filter( $products, function( $p ) use ( $category_param ) {
                return $p['category'] === $category_param;
            });
        }

        return new WP_REST_Response( array_values($products), 200 );
    }
}
