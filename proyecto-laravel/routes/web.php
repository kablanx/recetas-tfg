<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Cargar clases
use App\Http\Middleware\ApiAuthMiddleware;



Route::get('/', function () {
    return view('welcome');
});

Route::get('api/recetas/inicio/{id}', 'RecetaController@getInicio');
Route::get('api/user/buscar/{name}', 'UserController@buscar');
// Ruta para el logueo
Route::post('/api/login', 'UserController@login');

// Update, no uso ruta por defecto ya que el id se lo paso en la request en vez de en la url como parámetro
Route::put('/api/user/update', 'UserController@update');

Route::post('/api/recetas/update/{id}', 'RecetaController@update');
// Cargar avatar usuario
Route::post('/api/user/upload', 'UserController@upload')->middleware(ApiAuthMiddleware::class);
Route::post('/api/receta/upload', 'RecetaController@upload')->middleware(ApiAuthMiddleware::class);
Route::post('/api/receta/uploadVideo', 'RecetaController@uploadVideo')->middleware(ApiAuthMiddleware::class);

// Para coger imágenes del servidor
Route::get('api/user/avatar/{filename}', 'UserController@getImage');
Route::get('api/recetas/image/{filename}', 'RecetaController@getImage');

Route::get('api/mensaje/user/{id}', 'MensajeController@getMensajesUser');
Route::get('api/mensaje/user/{id_e}/{id_r}', 'MensajeController@getMensajesToUserByUser');
Route::get('api/like/{id_usuario}/{id_receta}', 'LikeController@getLike');
Route::get('api/follower/{id_follower}/{id_followed}', 'FollowerController@getFollower');
Route::get('api/follower/exist/{id_follower}/{id_followed}', 'FollowerController@exist');

// Rutas automáticas
Route::resource('/api/user', 'UserController');
Route::resource('/api/recetas', 'RecetaController');
Route::resource('/api/mensaje', 'MensajeController')->middleware(ApiAuthMiddleware::class);
Route::resource('/api/follower', 'FollowerController')->middleware(ApiAuthMiddleware::class);
Route::resource('/api/comentario', 'ComentarioController')->middleware(ApiAuthMiddleware::class);
Route::resource('/api/like', 'LikeController')->middleware(ApiAuthMiddleware::class);



