<?php
namespace N1Human\Core\Api;

use WP_REST_Controller;
use WP_REST_Server;
use WP_REST_Response;
use WP_Error;

class OrderController extends WP_REST_Controller {

    public function __construct() {
        $this->namespace = 'n1human/v1';
        $this->rest_base = 'orders';
    }

    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->rest_base, array(
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'create_item' ),
                'permission_callback' => array( $this, 'permissions_check' ),
            ),
        ) );
    }

    public function permissions_check( $request ) {
        // Aquí verificaríamos Nonces o JWT Tokens
        // return current_user_can( 'edit_posts' );
        
        // Para la demo, permitimos siempre pero logueamos
        return true; 
    }

    public function create_item( $request ) {
        $params = $request->get_json_params();

        if ( empty( $params['items'] ) || empty( $params['total'] ) ) {
            return new WP_Error( 'cant_create', 'Datos de pedido inválidos', array( 'status' => 400 ) );
        }

        // Simular creación de pedido (Custom Post Type 'shop_order')
        /*
        $order_id = wp_insert_post( array(
            'post_type'   => 'shop_order',
            'post_title'  => 'Pedido #' . uniqid(),
            'post_status' => 'publish'
        ) );
        */
        
        // Mock Response
        $response = [
            'id' => rand(1000, 9999),
            'status' => 'processing',
            'message' => 'Pedido recibido correctamente en WordPress Backend.'
        ];

        return new WP_REST_Response( $response, 201 );
    }
}
