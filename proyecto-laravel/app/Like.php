<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    //
    protected $table="megustas";

    public function receta(){
        return $this->belongsTo('App\Receta', 'id_receta');
    }
    public function user(){
        return $this->belongsTo('App\User', 'id_usuario');
    }
}
