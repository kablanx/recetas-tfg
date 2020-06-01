<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\JwtAuth;
use App\Http\Controllers\Response;
use App\Mensaje;

class MensajeController extends Controller
{
    public $cont=0;

    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['getMensajesToUserByUser', 'getMensajesUser'/* 'index', 'show', 'login', 'store'*/]]);
    }

    public function index(Request $request)
    {

        $mensajes = Mensaje::all();
        if (!empty($mensajes)) {
            $data = array(
                'code' => 200,
                'status' => 'success',
                'mensajes' => $mensajes
            );
        } else {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'No existen mensajes'
            );
        }
        return response()->json($data, $data['code']);
    }

    // Crear mensaje
    public function store(Request $request)
    {

        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);


        // Comprobar token y si coincide id del token con el id pasado por json
        $token = $request->header('Authorization', null);
        $jwtAuth = new JwtAuth();

        // Devolver el objeto usuario identificado
        $user = $jwtAuth->checkToken($token, true);


        if (!empty($params_array)) {
            /* var_dump($user);die(); */
            if ($user->sub != $params_array['id_usuario_e']) {
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Error al recibir los datos.'
                );
            } else {
                $mensaje = new Mensaje();

                $mensaje->id_usuario_e = $params_array['id_usuario_e'];
                $mensaje->id_usuario_r = $params_array['id_usuario_r'];
                $mensaje->texto = $params_array['texto'];

                $mensaje->save();
                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'mensaje' => $mensaje
                );
            }

        } else {
            $data = array(
                'status' => 'success',
                'code' => 400,
                'message' => 'Error al enviar los datos.'
            );
        }

        return response()->json($data, $data['code']);
    }

    // Actualizar
    public function update($id, Request $request)
    {

        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        if (!empty($params_array)) {
            unset($params_array['id_usuario_e']);
            unset($params_array['id_usuario_r']);

            $mensaje = Mensaje::where('id', $id)->update($params_array);
            if ($mensaje == 0) {
                $data = array(
                    'message' => 'Mensaje no encontrado',
                    'status' => 'error',
                    'code' => 400
                );
            } else {
                $data = array(
                    'mensaje' => $params_array,
                    'status' => 'success',
                    'code' => 200
                );
            }
        } else {
            $data = array(
                'message' => 'Error al actualizar el mensaje',
                'status' => 'error',
                'code' => 400
            );
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        // Buscar mensaje
        $mensaje = Mensaje::find($id);
        if (!empty($mensaje)) {
            $token = $request->header('Authorization', null);
            $jwtAuth = new JwtAuth();
            $userAuth = $jwtAuth->checkToken($token, true);
            if ($mensaje->id_usuario_e == $userAuth->sub) {
                $mensaje->delete();
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'mensaje' => $mensaje
                );
            } else {
                $data = array(
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'Solo el creador del mensaje puede borrarlo.'
                );
            }
        } else {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Mensaje no encontrado.'
            );
        }
        return response()->json($data, $data['code']);
    }

    public function getMensajesToUserByUser($id_e, $id_r)
    {
        $mensajes = DB::table('mensajes')->where([
            ['id_usuario_e', $id_e],
            ['id_usuario_r', $id_r]
        ])
            ->orWhere([
                ['id_usuario_e', $id_r],
                ['id_usuario_r', $id_e]
            ])
            ->orderBy('created_at')
            ->get();
        /* $mensajesEnviados=Mensaje::where([
            ['id_usuario_e', $id_e],
            ['id_usuario_r', $id_r]
        ])->get();
        $mensajesRecibidos=Mensaje::where([
            ['id_usuario_e', $id_r],
            ['id_usuario_r', $id_e]
        ])->get(); */
        $data = array(
            'code' => 200,
            'status' => 'success',
            'mensajes' => $mensajes/* ,
            'mensajesRecibidos'=>$mensajesRecibidos */
        );
        return response()->json($data, $data['code']);
    }

    public function getMensajesUser($id)
    {
        $mensajes = Mensaje::where('id_usuario_e', $id)
            ->orWhere('id_usuario_r', $id)->distinct()->get(['id_usuario_e', 'id_usuario_r'])->load('userEnviado', 'userRecibido');
        /* $cont=0;
            foreach($mensajes as $mensaje1){

            foreach ($mensajes as $mensaje2){
                if($mensaje1->id_usuario_r==$mensaje2->id_usuario_e && $mensaje1->id_usuario_e==$mensaje2->id_usuario_r){

                    unset($mensajes[$cont]);
                }
            }
            $cont++;
        } */
        /* var_dump(gettype($mensajes));die(); */
        if ($mensajes) {
            $data = array(
                'code' => 200,
                'status' => 'success',
                'mensajes' => $mensajes
            );
        } else {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Este usuario no tiene mensajes'
            );
        }
        return response()->json($data, $data['code']);
    }

    public function deleteMensajes($id_user1, $id_user2){

    }
}
