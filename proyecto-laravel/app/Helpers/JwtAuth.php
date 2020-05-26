<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\User;
use DomainException;
use UnexpectedValueException;

class JwtAuth
{

    public $key;
    public function __construct()
    {
        $this->key = 'esta-es-mi-clave-secreta-23532';
    }


    // Buscar si el usuario existe

    public function signup($email, $password, $getToken = null)
    {

        $user = User::where(
            array(
                'email' => $email,
                'password' => $password
            )
        )->first();

        $signup = false;
        if (is_object($user)) {
            $signup = true;
        }
        if ($signup) {
            // Generar token
            $token = array(
                'sub' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'surname' => $user->surname,
                'avatar'=>$user->avatar,
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60)
            );

            $jwt = JWT::encode($token, $this->key, 'HS256');
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));

            if (is_null($getToken)) {
                $data= $jwt;
            } else {
                $data= $decoded;
            }
        } else {
            $data= array(
                'status' => 'error',
                'message' => 'Login incorrecto'
            );
        }
        return $data;
    }

    public function checkToken($jwt, $getIdentity = false)
    {
        $auth = false;

        try {

            // Quitamos las comillas del token
            $jwt=str_replace('"','',$jwt);

            $decoded = JWT::decode($jwt, $this->key, array('HS256'));

            /* echo("adios");
            var_dump($decoded); die(); */

        } catch (\UnexpectedValueException $e) {
            $auth = false;
        } catch (\DomainException $e) {
            $auth = false;
        }

        if (!empty($decoded) && is_object($decoded) && isset($decoded->sub)) {
            $auth = true;
        } else {
            $auth = false;
        }

        if ($getIdentity) {
            return $decoded;
        }

        return $auth;
    }
}
