<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    //
    protected $table="followers";

    /* protected $fillable=['id_follower', 'id_followed', 'followed']; */
    protected $id_follower;
    protected $id_followed;
    protected $followed;


    public function user(){

        return $this->belongsTo('App\User', 'id_follower');
    }


    public function users(){

        return $this->belongsTo('App\User', 'id_followed');
    }
}
