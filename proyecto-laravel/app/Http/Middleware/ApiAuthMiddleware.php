<?php

namespace App\Http\Middleware;

use Closure;


class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Comprobar si el usuario está identificado
        $token=$request->header('Authorization');
        $jwtAuth=new \JwtAuth();
        $checkToken=$jwtAuth->checkToken($token);
        /* $checkToken=false;
        var_dump($checkToken); */
        /* var_dump($checkToken);die(); */
        if($checkToken){
           /*  var_dump($request); */
            return $next($request);
        }else{
            $data=array(
                'status'=>'error',
                'message'=>'El usuario no está identificado.',
                'code'=>400
            );
            return response()->json($data, $data['code']);
        }

    }
}
