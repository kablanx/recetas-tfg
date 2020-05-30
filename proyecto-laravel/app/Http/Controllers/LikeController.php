<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Like;
use App\Helpers\JwtAuth;
class LikeController extends Controller
{
    //

    public function store(Request $request){
        $json=$request->input('json', null);
        $params_array=json_decode($json, true);


        if(!empty($params_array)){
            $like=new Like();
            $like->id_usuario=$params_array['id_usuario'];
            $like->id_receta= $params_array['id_receta'];
            $like->gustado=$params_array['gustado'];
            $like->save();
            $data=array(
                'code'=>200,
                'status'=>'success',
                'like'=>$like
            );
        }else{
            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'Error al recibir los datos.'
            );
        }
        return response()->json($data,$data['code']);
    }
    public function index(Request $request){
        $likes=Like::all()->load('user', 'receta');

        if(!empty($likes)){
            $data=array(
                'code'=>200,
                'status'=>'success',
                'likes'=>$likes
            );
        }else{
            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'No existen likes todavía'
            );
        }
        return response()->json($data,$data['code']);
    }
    public function update($id, Request $request){
        $json=$request->input('json', null);
        $params=json_decode($json);
        $params_array=json_decode($json, true);

        if(!empty($params_array)){
            unset($params_array['id_usuario']);
            unset($params_array['id_receta']);
            unset($params_array['created_at']);
            $params_array['updated_at']= date('Y-m-d H:i:s');
            /* var_dump($params_array);die(); */
            $like=Like::find($id);
            if($like->gustado==1){
                $params_array['gustado']=0;
            }else{
                $params_array['gustado']=1;
            }

            // Editar registro
            $like=Like::where('id',$id)->update($params_array);

            // Obtener el registro editado
            $like=Like::where('id', $id)->get();
            $data=array(
                'status'=>'success',
                'code'=>200,
                'changes'=>$params_array,
                'like'=>$like
            );
        }else{
            $data=array(
                'status'=>'error',
                'code'=>400,
                'message'=>'Error al recibir los datos'
            );
        }
        return response()->json($data,$data['code']);
    }

    public function getLike($id_usuario, $id_receta){
        $like=Like::where('id_usuario','=', $id_usuario)
        ->where( 'id_receta', '=', $id_receta)->first();
        if(is_object($like)){
            $data=array(
                'status'=>'success',
                'dato'=>$like,
                'code'=>200
            );
        }else{
            $like=new Like();
            $like->id_usuario=$id_usuario;
            $like->id_receta= $id_receta;
            $like->gustado=0;
            $like->save();
            $data=array(
                'status'=>'success',
                'dato'=>$like,
                'code'=>200
            );
        }
        return response()->json($data, $data['code']);
    }
}
