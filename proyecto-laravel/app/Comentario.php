<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    //
    protected $table="comentarios";

    public function user(){
        // 'user_id' tiene que ser el campo de esta tabla que sea el id del usuario
        return $this->belongsTo('App\User', 'id_usuario');
    }
    public function receta(){
        // 'user_id' tiene que ser el campo de esta tabla que sea el id del usuario
        return $this->belongsTo('App\Receta', 'id_receta');
    }
}
