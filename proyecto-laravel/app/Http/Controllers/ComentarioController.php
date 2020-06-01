<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\JwtAuth;
use App\Http\Controllers\Response;
use App\Comentario;

class ComentarioController extends Controller {
    //

    public function store( Request $request ) {
        $json = $request->input( 'json', null );
        $params_array = json_decode( $json, true );
        if ( !empty( $params_array ) ) {
            $comentario = new Comentario();
            $comentario->id_usuario = $params_array['id_usuario'];
            $comentario->id_receta = $params_array['id_receta'];
            $comentario->texto = $params_array['texto'];

            $comentario->save();
            $data = [
                'code'=>200,
                'status'=>'success',
                'comentario'=>$comentario
            ];
        } else {
            $data = [
                'code'=>400,
                'status'=>'error',
                'message'=>'Error al recibir los datos'
            ];
        }
        return response()->json( $data, $data['code'] );
    }

    public function update( $id, Request $request ) {
        $json = $request->input( 'json', null );
        $params_array = json_decode( $json, true );
        if ( !empty( $params_array ) ) {
            // Quitamos los datos que no queremos actualizar
            unset( $params_array['id_usuario'] );
            unset( $params_array['id_receta'] );
            $comentario = Comentario::where( 'id', $id )->update( $params_array );
            if ( $comentario == 0 ) {
                $data = [
                    'code'=>400,
                    'status'=>'error',
                    'message'=>'Comentario no encontrado'
                ];
            } else {
                $data = array(
                    'code'=>200,
                    'status'=>'success',
                    'comentario' =>$params_array
                );
            }
        } else {
            $data = [
                'code'=>400,
                'status'=>'error',
                'message'=>'Error al editar el mensaje'
            ];
        }
        return response()->json( $data, $data['code'] );
    }

    public function destroy( $id, Request $request ) {
        $comentario = Comentario::find( $id );
        if ( !empty( $comentario ) ) {
            $comentario->delete();
            $data = array(
                'code'=>200,
                'status'=>'success',
                'follower'=>$comentario
            );
        } else {
            $data = array(
                'code'=>400,
                'status'=>'error',
                'message'=>'No se ha encontrado el registro.'
            );
        }

        return response()->json( $data, $data['code'] );
    }

    public function show( $id, Request $request ) {
        $comentario = Comentario::find( $id )->load( 'user' );
        if ( is_object( $comentario ) ) {
            $data = array(
                'code'=>200,
                'status'=>'success',
                'comentario'=>$comentario
            );
        } else {
            $data = array(
                'code'=>400,
                'status'=>'error',
                'message'=>'Comentario no encontrado.'
            );
        }
        return response()->json( $data, $data['code'] );
    }
}
