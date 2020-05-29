<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\JwtAuth;
use App\Http\Controllers\Response;
use App\Follower;

class FollowerController extends Controller
{
    // Crear
    public function store(Request $request)
    {
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if ($checkToken) {
            // Guardamos datos recibidos
            /* var_dump($request->input('json', null));die(); */

            $json = $request->input('json', null);

            $params = json_decode($json);


            $params_array = json_decode($json, true);

            /* var_dump($params_array);die(); */

            // Conseguir el usuario autentificado
            /* $user = $jwtAuth->checkToken($hash, true); */

            $follower = new Follower();



            /* var_dump($params_array);die(); */

            $follower->id_follower = $params_array['id_follower'];
            $follower->id_followed=$params_array['id_followed'];
            $follower->followed=$params_array['followed'];
            $follower->save();

            $data = array(
                'follower' => $follower,
                'status' => 'success',
                'code' => 200
            );
        } else {
            // Devolver error
            $data = array(
                'message' => 'Fallo al realizar la petición al servidor',
                'status' => 'error',
                'code' => 400,
            );
        }

        return response()->json($data, $data['code']);
    }
    // Actualizar
    public function update($id, Request $request){
        $hash=$request->header('Authorization', null);


        $jwtAuth=new JwtAuth();
        $checkToken=$jwtAuth->checkToken($hash);

        if($checkToken){
            $json=$request->input('json',null);
            $params=json_decode($json);
            $params_array=json_decode($json,true);
            unset($params_array['id_follower']);
            unset($params_array['id_followed']);
            unset($params_array['created_at']);

            $params_array['updated_at']= date('Y-m-d H:i:s');

            $follower=Follower::find($id);
            if($follower->followed==1){
                $params_array['followed']=0;
            }else{
                $params_array['followed']=1;
            }

            $follower=Follower::where('id',$id)->update($params_array);
            


            $data = array(
                'follower' => $follower,
                'status' => 'success',
                'code' => 200
            );
        }else{
            $data = array(
                'message' => 'Fallo al realizar la petición al servidor',
                'status' => 'error',
                'code' => 400,
            );
        }

        return response()->json($data, 200);
    }
    // Listado
    public function index(Request $request){
        $followers=Follower::all()->load('user', 'users');

        if(!empty($followers)){
            $data=array(
                'code'=>200,
                'status'=>'success',
                'followers'=>$followers
            );
        }else{
            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'No existen seguidores todavía'
            );
        }
        return response()->json($data,$data['code']);
    }

    public function destroy($id, Request $request){
        $follower=Follower::find($id);
        if(!empty($follower)){
            $follower->delete();
            $data=array(
                'code'=>200,
                'status'=>'success',
                'follower'=>$follower
            );
        }else{
            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'No se ha encontrado el registro.'
            );
        }

        return response()->json($data,$data['code']);
    }

    public function getFollower($id_follower, $id_followed){
        /*  $follower=Follower::where('id_follower','=', $id_follower)
            ->where( 'id_followed', '=', $id_followed)->get();
        if(sizeof($follower)!=0){ */
            $follower=Follower::where('id_follower','=', $id_follower)
            ->where( 'id_followed', '=', $id_followed)->first();
            if(is_object($follower)){
                $data=array(
                    'status'=>'success',
                    'follower'=>$follower,
                    'code'=>200
                );
            }else{
                $data=array(
                    'status'=>'error',
                    'message'=>'El follower no existe.',
                    'code'=>404
                );
            }
        /* }else{
            $follower=new Follower();
            $data=array(
                'status'=>'error',
                'follower'=>$follower,
                'message'=>'El follower no existe.',
                'code'=>404
            );
        } */

        return response()->json($data, $data['code']);
    }

    public function exist($id_follower, $id_followed){
        $follower=Follower::where('id_follower','=', $id_follower)
            ->where( 'id_followed', '=', $id_followed)->get();
        if(sizeof($follower)!=0){
            $data=array(
                'status'=>'success',
                'message'=>'Existe',
                'code'=>200
            );
        }else{
            $data=array(
                'status'=>'success',
                'message'=>'El follower no existe.',
                'code'=>200
            );
        }
        return response()->json($data, $data['code']);
    }
}
