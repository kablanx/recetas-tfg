<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    //
    protected $table="mensajes";
    public function userEnviado(){
        return $this->belongsTo('App\User', 'id_usuario_e');
    }
    public function userRecibido(){
        return $this->belongsTo('App\User', 'id_usuario_r');
    }
}
