<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Receta extends Model
{
    //

    protected $table="recetas";

    protected $fillable = [
        'nombre', 'ingredientes', 'descripcion', 'image1', 'image2','image3','video1','video2'
    ];

    public function comentarios(){
        return $this->hasMany("App\Comentario", 'id_receta')->orderBy('created_at');
    }
    public function likes(){
        return $this->hasMany("App\Like", 'id_receta')->where('gustado','=','1');
    }
    public function user(){
        // 'user_id' tiene que ser el campo de esta tabla que sea el id del usuario
        return $this->belongsTo('App\User', 'id_usuario');
    }

    public function numberOfLikes(){
        return $this->hasMany("App\Like", 'id_receta')->count('gustado','=','1');
    }

}
