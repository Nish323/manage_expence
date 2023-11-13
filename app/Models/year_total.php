<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class year_total extends Model
{
    use HasFactory;
    
    protected $fillable = [
        "user_id",
        "year",
        "expense_total",
        "weight_total",
        "updated_at",
        "created_at"
    ];    

}
