<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Receta;
use App\Helpers\JwtAuth;
// use App\Http\Controllers\Response;

class UserController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth',['except' =>['index', 'show',  'login', 'store', 'getImage', 'updateRol']]);
    }
    // Crear usuario
    public function store(Request $request)
    {

        // Recoger post
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);


        if(!empty($params) && !empty($params_array)){
            // Limpiar datos
            $params_array=array_map('trim', $params_array);

            $validate=\Validator::make($params_array, [
                'name'=>'required|min:1|max:20',
                'surname'=>'required|min:1|max:20',
                'password'=>'required|min:8|max:15',
                'email'=>'required|email|unique:users'
            ]);

            if($validate->fails()){
                $data=array(
                    'status'=>'',
                    'code'=> 404,
                    'message'=>'Error al crear al usuario',
                    'errors'=>$validate->errors()
                );


            }else{

                // Cifrar contraseña
                /* $pwd=password_hash($params_array['password'], PASSWORD_BCRYPT, ['cost'=>4]); */
                $pwd=hash('sha256',$params_array['password']);

                // Crear usuario
                $user=new User();
                $user->name=$params_array['name'];
                $user->surname=$params_array['surname'];
                $user->email=$params_array['email'];
                $user->password=$pwd;
                $user->rol='usuario';
                $user->avatar='usuario.png';
                // Guardar usuario
                $user->save();

                /* var_dump($user);die(); */
                $data=array(
                    'status'=>'success',
                    'code'=> 200,
                    'message'=>'El usuario se ha creado correctamente',
                    'user'=>$user
                );
            }
        }else{
            $data=array(
                'status'=>'error',
                'code'=> 404,
                'message'=>'Los datos enviados no son correctos'
            );
        }
        /* var_dump($data);die(); */
        return response()->json($data, $data['code']);

    }
    // Listado de usuarios
    public function index(Request $request){

        $users=User::orderByDesc('created_at')->get();
        return response()->json(array(
            'users'=>$users,
            'status'=>'success'
        ), 200);
    }

    // Mostrar usuario por id
    public function show($id, Request $request){

        // Obtener mensajes recibidos o enviados por el usuario
        // $user=DB::table('mensajes')->where('id_usuario_e', '=', $id)->orWhere('id_usuario_r', '=', $id)->orderBy('created_at')->get();
        $receta=Receta::where('id_usuario', $id)->get();
        if(is_object($receta)){
            $user=User::find($id)->load('seguidores', 'seguidos', 'recetas');
        }else{
            $user=User::find($id)->load('seguidores', 'seguidos');
        }

        if(is_object($user)){
            $data=array(
                'status'=>'success',
                'user'=>$user,
                'code'=>200
            );
        }else{
            $data=array(
                'status'=>'error',
                'message'=>'El usuario no existe.',
                'code'=>404
            );
        }
        return response()->json($data, $data['code']);
    }
    // Login
    public function login(Request $request){
        $jwtAuth = new JwtAuth();

        // Recibir los datos por POST

        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);


        // Validar datos
        $validate=\Validator::make($params_array, [
                        'email'=>'required|email',
                        'password'=>'required|min:8|max:15'
        ]);

        if($validate->fails()){
            $signup=array(
                'status'=>'error',
                'code'=>404,
                'message'=>'El usuario no se ha podido identificar',
                'errors'=>$validate->errors()
            );
        }else{
            // Cifrar password
            /* $pwd=password_hash($params_array['password'], PASSWORD_BCRYPT, ['cost'=>4]); */

            $pwd=hash('sha256',$params_array['password']);
            // Devolver token o datos
            $signup=$jwtAuth->signup($params_array['email'], $pwd);

            if(!empty($params->gettoken)){
                $signup=$jwtAuth->signup($params_array['email'], $pwd, true);
            }

        }

        return response()->json($signup, 200);

        /* $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;
        $getToken = (!is_null($json) && isset($params->gettoken)) ? $params->gettoken : null;

        // Cifrar la password
        $pwd = hash('sha256', $password);
        if (!is_null($email) && !is_null($password) && ($getToken==null || $getToken=='false')) {
            $signup = $jwtAuth->signup($email, $pwd);
        }elseif($getToken!=null){
            $signup = $jwtAuth->signup($email, $pwd, $getToken);
        }else{
            $signup=array(
                'status'=>'error',
                'message'=>'Envia tus datos por post'
            );
        }

        return response()->json($signup, 200); */
    }
    // Mostrar imagen
    public function getImage($filename){
        $isset=\Storage::disk('users')->exists($filename);
        if($isset){
            $file= \Storage::disk('users')->get($filename);
            return new Response($file, 200);
        }else{
            $data=array(
                'status'=>'error',
                'message'=>'La imagen no existe.',
                'code'=>404
            );
            return response()->json($data, $data['code']);
        }



        // Codificamos el archivo en base64 para poder enviarlo en un json
        //$file="data:image/png;base64,".base64_encode($file);

        /* $file='http://proyectolaravel.com.devel/api/user/avatar/'.$filename; */
        // return response()->json($file,200);

        /* $exists = \Storage::disk('users')->get($filename);
        var_dump($exists);die(); */
    }
    // Eliminar
    public function destroy($id, Request $request){
         // Buscar usuario
        $user=User::find($id);
         /* var_dump($receta);die(); */
        if(!empty($user)){
             // Comprobar usuario autenticado
            $token = $request->header('Authorization', null);
            $jwtAuth = new JwtAuth();
            $userAuth = $jwtAuth->checkToken($token, true);
             /* var_dump($user);die(); */
            $userAuth=User::find($userAuth->sub);
             /* var_dump($user);die(); */
            if($user->sub==$userAuth->id || $userAuth->rol !="usuario"){
                $user->delete();
                $data=array(
                    'code'=>200,
                    'status'=>'success',
                    'user'=>$user
                );
            }else{
                $data=array(
                    'code'=>400,
                    'status'=>'error',
                    'message'=>'No puede borrar un usuario sin ser administrador o creador de la cuenta.'
                );
            }
        }else{
            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'Usuario no encontrado'
            );
        }
        return response()->json($data,$data['code']);
    }
    // Actualizar
    public function update(Request $request){
        $token=$request->header('Authorization');
        $jwtAuth=new JwtAuth();
        $checkToken=$jwtAuth->checkToken($token);
        $json=$request->input('json', null);
        // $image=$request->file('file0');
        $params=json_decode($json);
        $params_array=json_decode($json,true);

        /* var_dump($params);die(); */

        if($checkToken && !empty($params_array)){

           /*  $avatar=$request->file('photo',null); */

            // Obtener usuario identificado
            $user=$jwtAuth->checkToken($token,true);
            /* var_dump($user);die(); */

            // Validar datos
            $validate=\Validator::make($params_array, [
                'name'=>'required|min:1|max:20',
                'surname'=>'required|min:1|max:20',
                'password'=>'required|min:8|max:15',
                'email'=>'required|email|unique:users,email, '.$user->sub

            ]);
            /*  */

            if($validate->fails()){
                $data=array(
                    'status'=>'error',
                    'message'=>'Los datos no se han validado correctamente.',
                    'code'=>400
                );
            }else{
                /* // Validamos la imagen
                $validate=\Validator::make($request->all(), [
                    'file0'=>'required|image|mimes:jpg,jpeg,png'
                ]);
                if($validate->fails()){
                    $data=array(
                        'status'=>'error',
                        'message'=>'Error al validar la imagen',
                        'code'=>400
                    );
                }else{
                    if($image){
                        $image_name=time().$image->getClientOriginalName();
                        \Storage::disk('users')->put($image_name, \File::get($image));

                        $params_array['avatar']=$image_name;
                    } */
                    // Quitamos los campos que no queremos actualizar


                    unset($params_array['rol']);
                    unset($params_array['created_at']);
                    unset($params_array['remember_token']);

                    // Codificamos la contraseña
                    $params_array['password']=hash('sha256',$params_array['password']);

                    $params_array['updated_at']=new \DateTime();


                    // Actualizar usuario en la bbdd
                    $user_update=User::where('id', $params_array['id'])->update($params_array);


                    // Devolver array con el resultado
                    $data=array(
                        'status'=>'success',
                        'user'=>$user,
                        'changes'=>$params_array,
                        'code'=>200
                    );
                //}

            }
        }else{
            $data=array(
                'status'=>'error',
                'message'=>'El usuario no está identificado.',
                'code'=>400
            );
        }

        return response()->json($data,$data['code'])/* ->header('Content-Type', 'text/plain') */;

    }
    // Subir imagen
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
            \Storage::disk('users')->put($image_name, \File::get($image));
            $data=array(
                'status'=>'success',
                'image'=>$image_name,
                'code'=>200
            );
        }

        // Devolver los datos en texto plano
        return response($data, $data['code'])->header('Content-Type', 'text/plain');
    }

    public function buscar($name){
        /* $name= $name+'%'; */
       /*  $name='%'.$name.'%'; */
        /* var_dump($name);die(); */
        $users=User::where('name', 'LIKE', "%{$name}%")
        ->orWhere('surname', 'LIKE', "%{$name}%")->get();
        $data=array(
            'status'=>'success',
            'users'=>$users,
            'code'=>200
        );

        return response()->json($data,$data['code']);
    }

    // Mejorar, autenticación.
    public function updateRol(Request $request, $id){

        // Conseguir usuario
        $user=User::find($id);
        if($user){
            // Cambiar el atributo rol
            if($user->rol=='administrador'){
                $user->rol='usuario';
            }else{
                $user->rol='administrador';
            }
            // Actualizar
            $user->update();

            $data=array(
                'status'=>'success',
                'user'=>$user,
                'code'=>200
            );
        }else{
            $data=array(
                'status'=>'error',
                'message'=>'No existe.',
                'code'=>400
            );
        }
        return response()->json($data, $data['code']);
    }
}
