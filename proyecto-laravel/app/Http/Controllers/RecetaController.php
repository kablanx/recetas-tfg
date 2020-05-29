<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Helpers\JwtAuth;
use App\Receta;
use App\User;
use App\Http\Controllers\Storage;
use Illuminate\Support\Facades\DB;

class RecetaController extends Controller
{
    // Usa siempre el middleware especificado excepto en los métodos indicados
    public function __construct(){
        $this->middleware('api.auth',['except' =>[/* 'index',*/ 'show',  'index', 'getImage', 'getInicio']]);
    }

    // Listado de recetas
    public function index(Request $request)
    {
        /* $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);
        if ($checkToken) {
        */
            // ->load('user') muestra los datos del usuario de cada receta
            $recetas=Receta::orderByDesc('created_at')->get();
            return response()->json(array(
                'status'=>'success',
                'code' => 200,
                'recetas'=>$recetas
            ), 200);

        /* } else {
            echo "Index de recetas no autenticado";
            die();
        } */
    }
    // Mostrar receta por id
    public function show($id, Request $request){
        // ->load('user') muestra los datos del usuario que ha creado la receta
        $receta=Receta::find($id)->load('user','comentarios.user', 'likes');
        /* var_dump($receta);die(); */
        if(is_object($receta)){
            $data=array(
                'status'=>'success',
                'code'=> 200,
                'receta'=>$receta,
                'likes'=>$receta->likes->count()
            );
        }else{
            $data=array(
                'status'=>'error',
                'code'=> 400,
                'message'=> 'El registro no existe'
            );
        }
        return response()->json($data, $data['code']);
    }
    // Crear mensaje
    public function store(Request $request)
    {
        $json=$request->input('json',null);
        $params=json_decode($json);
        $params_array = json_decode($json, true);

        // Archivos de imagenes y videos
        /* $image1=$request->file('image1');
        $image2=$request->file('image2');
        $image3=$request->file('image3');
        $video1=$request->file('video1');
        $video2=$request->file('video2');
        */

        if(!empty($params_array)){

            $token = $request->header('Authorization', null);
            $jwtAuth = new JwtAuth();

            // Devolver el objeto usuario identificado
            $user = $jwtAuth->checkToken($token, true);

            $validate = \Validator::make($params_array, [
                'nombre' => 'required',
                /* 'ingredientes'=>'required',
                'descripcion' => 'required', */
                /* 'image1'=>'required|image|mimes:jpg,jpeg,png' */
                /* 'image1'=>'required' */
            ]);

            if($validate->fails()){
                $data=array(
                    'code'=>400,
                    'status'=>'error',
                    'message'=>'Error, faltan datos o la validación no es correcta.'
                );
            }else{
                /* $validate = \Validator::make($request->all(), [
                    'image1'=>'required|image|mimes:jpg,jpeg,png',
                    'image2'=>'image|mimes:jpg,jpeg,png',
                    'image3'=>'image|mimes:jpg,jpeg,png',
                    'video1'=>'mimes:mp4,m4v,flv,mov',
                    'video2'=>'mimes:mp4,m4v,flv,mov'
                ]);
                if ($validate->fails()) {
                    $data=array(
                        'code'=>400,
                        'status'=>'error',
                        'message'=>'Error al validar las imágenes o vídeos.'
                    );
                }else{ */
                        /* var_dump($image1);die(); */
                        $receta = new Receta();
                        $receta->id_usuario=$user->sub;
                        $receta->nombre=$params_array['nombre'];
                        $receta->ingredientes=$params_array['ingredientes'];
                        $receta->descripcion=$params_array['descripcion'];
                        $receta->image1=$params_array['image1'];
                        if($params_array['image2']){
                            $receta->image2=$params_array['image2'];
                        }
                        if($params_array['image3']){
                            $receta->image3=$params_array['image3'];
                        }
                        if($params_array['video1']){
                            $receta->video1=$params_array['video1'];
                        }

                        if($params_array['video2']){
                            $receta->video2=$params_array['video2'];
                        }
                    // Comprobar archivos de imagen y vídeo
                    /* if($image1){
                        $image_name=time().$image1->getClientOriginalName();
                        \Storage::disk('recetas')->put($image_name, \File::get($image1));

                        $params_array['image1']=$image_name;
                        $receta->image1=$params_array['image1'];
                    }
                    if($image2){
                        $image_name=time().$image2->getClientOriginalName();
                        \Storage::disk('recetas')->put($image_name, \File::get($image2));

                        $params_array['image2']=$image_name;
                        $receta->image2=$params_array['image2'];
                    }
                    if($image3){
                        $image_name=time().$image3->getClientOriginalName();
                        \Storage::disk('recetas')->put($image_name, \File::get($image3));

                        $params_array['image3']=$image_name;
                        $receta->image3=$params_array['image3'];
                    }
                    if($video1){
                        $video_name=time().$video1->getClientOriginalName();
                        \Storage::disk('recetas')->put($video_name, \File::get($video1));

                        $params_array['video1']=$video_name;
                        $receta->video1=$params_array['video1'];
                    }
                    if($video2){
                        $video_name=time().$video2->getClientOriginalName();
                        \Storage::disk('recetas')->put($video_name, \File::get($video2));

                        $params_array['video2']=$video_name;
                        $receta->video2=$params_array['video2'];
                    } */

                    // $receta->image=$params_array['image'];
                    $receta->save();
                    $data=array(
                        'code'=>200,
                        'status'=>'success',
                        'receta'=>$receta
                    );
                /* } */
            }
        }else{
            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'Error, faltan datos o la validación no es correcta.'
            );
        }
        return response()->json($data, $data['code']);
    }
    // Actualizar
    public function update($id, Request $request){
        /* $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);
        */
        $json=$request->input('json', null);
        $params=json_decode($json);
        $params_array=json_decode($json, true);

        $image1=$request->file('image1');
        $image2=$request->file('image2');
        $image3=$request->file('image3');
        $video1=$request->file('video1');
        $video2=$request->file('video2');

        if (!empty($params_array)) {

            $validate = \Validator::make($params_array, [
                'nombre' => 'required',
                /* 'descripcion' => 'required',
                'ingredientes' => 'required' */
            ]);

            if ($validate->fails()) {
                $data=array(
                    'code'=>400,
                    'status'=>'error',
                    'message'=>'Error, faltan datos o la validación no es correcta.'
                );
            }else{
                /* $validate = \Validator::make($request->all(), [
                    'image1'=>'required|image|mimes:jpg,jpeg,png',
                    'image2'=>'image|mimes:jpg,jpeg,png',
                    'image3'=>'image|mimes:jpg,jpeg,png',
                    'video1'=>'mimes:mp4,m4v,flv,mov',
                    'video2'=>'mimes:mp4,m4v,flv,mov'
                ]);
                if ($validate->fails()) {
                    $data=array(
                        'code'=>400,
                        'status'=>'error',
                        'message'=>'Error al validar las imágenes o vídeos.'
                    );
                }else{ */
                    $receta=Receta::find($id);
                    // Comprobar si hay imagenes o vídeos
                    if($image1){
                        $image_name=time().$image1->getClientOriginalName();
                        \Storage::disk('recetas')->put($image_name, \File::get($image1));

                        \Storage::disk('recetas')->delete($receta->image1);
                        $params_array['image1']=$image_name;
                        $receta->image1=$params_array['image1'];
                    }
                    if($image2){
                        $image_name=time().$image2->getClientOriginalName();
                        \Storage::disk('recetas')->put($image_name, \File::get($image2));

                        \Storage::disk('recetas')->delete($receta->image2);
                        $params_array['image2']=$image_name;
                        $receta->image2=$params_array['image2'];
                    }
                    if($image3){
                        $image_name=time().$image3->getClientOriginalName();
                        \Storage::disk('recetas')->put($image_name, \File::get($image3));

                        \Storage::disk('recetas')->delete($receta->image3);
                        $params_array['image3']=$image_name;
                        $receta->image3=$params_array['image3'];
                    }
                    if($video1){
                        $video_name=time().$video1->getClientOriginalName();
                        \Storage::disk('recetas')->put($video_name, \File::get($video1));

                        \Storage::disk('recetas')->delete($receta->video1);
                        $params_array['video1']=$video_name;
                        $receta->video1=$params_array['video1'];
                    }
                    if($video2){
                        $video_name=time().$video2->getClientOriginalName();
                        \Storage::disk('recetas')->put($video_name, \File::get($video2));

                        \Storage::disk('recetas')->delete($receta->video2);
                        $params_array['video2']=$video_name;
                        $receta->video2=$params_array['video2'];
                    }
                    unset($params_array['id']);
                    unset($params_array['id_usuario']);
                    unset($params_array['created_at']);
                    // Actualizar el registro
                    $receta=Receta::where('id', $id)->update($params_array);

                    // Obtener el registro actualizado
                    $receta=Receta::where('id', $id)->get();

                $data=array(
                    'status'=>'success',
                        'code'=>200,
                        'changes'=>$params_array,
                        'receta'=>$receta
                    );
                }
            }
        /* } else {
            // Devolver error
            $data = array(
                'message' => 'Error al enviar los datos',
                'status' => 'error',
                'code' => 400,
            );
        } */
        return response()->json($data, $data['code']);
    }
    // Eliminar
    public function destroy($id, Request $request){
        // Buscar receta
        $receta=Receta::find($id);
        /* var_dump($receta);die(); */
        if(!empty($receta)){
            // Comprobar usuario autenticado
            $token = $request->header('Authorization', null);
            $jwtAuth = new JwtAuth();
            $user = $jwtAuth->checkToken($token, true);

            /* var_dump($token);die(); */
            $user=User::find($user->sub);
            /* var_dump($user);die(); */
            /* var_dump($user->id);die(); */
            if($user->id==$receta->id_usuario || $user->rol !="usuario"){
                \Storage::disk('recetas')->delete($receta->image1);
                \Storage::disk('recetas')->delete($receta->image2);
                \Storage::disk('recetas')->delete($receta->image3);
                \Storage::disk('recetas')->delete($receta->video1);
                \Storage::disk('recetas')->delete($receta->video2);
                $receta->delete();
                $data=array(
                    'code'=>200,
                    'status'=>'success',
                    'user'=>$receta
                );
            }else{
                $data=array(
                    'code'=>400,
                    'status'=>'error',
                    'message'=>'No puede borrar una receta sin ser administrador o creador de la receta.'
                );
            }
        }else{
            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'Receta no encontrada'
            );
        }
        return response()->json($data,$data['code']);
    }

    // Mostrar imagen
    public function getImage($filename){
        $isset=\Storage::disk('recetas')->exists($filename);
        if($isset){
            $file= \Storage::disk('recetas')->get($filename);
            return new Response($file, 200);
        }else{
            $data=array(
                'status'=>'error',
                'message'=>'La imagen no existe.',
                'code'=>404
            );
            return response()->json($data, $data['code']);
        }
    }

    public function upload(Request $request){

        // Recoger datos de la petición
        $image=$request->file('file0');

        // Validar imagen
        $validate = \Validator::make($request->all(),[
            'file0'=>'required|image|mimes:jpg,jpeg,png'
        ]);
        // Guardar la imagen
        if(!$image || $validate->fails()){
            $data=array(
                'status'=>'error',
                'message'=>'Error al subir la imagen.',
                'code'=>400
            );
        }else{
            $image_name=time().$image->getClientOriginalName();
            \Storage::disk('recetas')->put($image_name, \File::get($image));
            $data=array(
                'status'=>'success',
                'image'=>$image_name,
                'code'=>200
            );
        }

        // Devolver los datos en texto plano
        return response($data, $data['code'])->header('Content-Type', 'text/plain');
    }
    public function uploadVideo(Request $request){

        // Recoger datos de la petición
        $video=$request->file('file0');

        // Validar imagen
        $validate = \Validator::make($request->all(),[
            'file0'=>'required|mimes:mp4,mkv,vk'
        ]);
        // Guardar la imagen
        if(!$video || $validate->fails()){
            $data=array(
                'status'=>'error',
                'message'=>'Error al subir la imagen.',
                'code'=>400
            );
        }else{
            $video_name=time().$video->getClientOriginalName();
            \Storage::disk('recetas')->put($video_name, \File::get($video));
            $data=array(
                'status'=>'success',
                'video'=>$video_name,
                'code'=>200
            );
        }

        // Devolver los datos en texto plano
        return response($data, $data['code'])->header('Content-Type', 'text/plain');
    }

    public function getInicio($id, Request $request){

       /*  $recetas=Receta::select('*')->join('followers', 'id_')

        ->where('recetas.id_usuario','=',$id)
        ->orWhere('recetas.id_usuario','=','followers.id_followed')
        ->get(); */

        /*  */
        /* $recetas=DB::table('recetas')
        ->join('followers', 'recetas.id_usuario','=','followers.id_followed')
        ->select('recetas.*')
        ->where(
            ['followers.id_follower', '=', $id],
            ['followers.followed', '=', 1],
            ['followers.id_followed','=','recetas.id_usuario']
            )
        ->orWhere(
            ['recetas.id_usuario','=',$id]
            )
        ->distinct()
        ->get(); */

        /* $recetas=Receta::all()->whereHas('user.seguidores',function($q){
            $q->where('user.seguidores', 'like', 'foo%');
        }); */
        /* $recetas=Receta::all()->load('user.seguidores')->sortByDesc('created_at') */
        /* ->where('user.seguidores.id','=', 4) */;

        $recetas=DB::select("SELECT * FROM recetas WHERE recetas.id_usuario=$id OR recetas.id_usuario IN (SELECT followers.id_followed FROM followers WHERE followers.id_follower=$id AND followers.followed=1)" );



        // Le he mandado un mensaje a alfonso sobre este cacho de código
        // explicandole por qué no funciona como debería
        /* $recetas=DB::table('recetas')
        ->join('followers', 'recetas.id_usuario','=','followers.id_followed')
        ->select('recetas.*')
        ->where('recetas.id_usuario','=',$id)
        ->orWhere('followers.id_follower','=', $id,
        'AND', 'followers.followed','=',1)
        ->distinct()
        ->get(); */


        $data=array(
            'n'=>count($recetas),
            'status'=>'success',
            'code'=>200,
            'recetas'=>$recetas
        );
        return response()->json($data,$data['code']);
    }

    public function buscar($name){
        $recetas=Receta::where('nombre', 'LIKE', "%{$name}%")
        ->orWhere('ingredientes', 'LIKE', "%{$name}%")->get();
        $data=array(
            'status'=>'success',
            'recetas'=>$recetas,
            'code'=>200
        );

        return response()->json($data,$data['code']);
    }
}
