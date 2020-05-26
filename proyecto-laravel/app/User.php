<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'rol', 'name', 'surname', 'email', 'avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Obtener usuarios que sigue
    public function seguidores(){
        // Muestra los seguidores por antiguedad
        return $this->hasMany("App\Follower", "id_followed")->where('followed', '1')->orderBy('created_at', 'desc');
    }

    // Obtener usuarios que le siguen
    public function seguidos(){
        //
        return $this->hasMany("App\Follower", "id_follower")->where('followed', '1')->orderBy('created_at', 'desc');
    }

    // Obtener mensajes enviados
    public function mensajesEnviados(){
        return $this->hasMany("App\Mensaje", "id_usuario_e");
    }
    public function mensajesRecibidos(){
        return $this->hasMany("App\Mensaje", "id_usuario_r");
    }

    public function comentarios(){
        return $this->hasMany("App\Comentario", "id_usuario");
    }

    public function recetas(){
        return $this->hasMany("App\Receta", "id_usuario");
    }

    public function likes(){
        return $this->hasMany("App\Like", "id_usuario");
    }

}
