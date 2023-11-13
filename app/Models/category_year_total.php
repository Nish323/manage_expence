<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class category_year_total extends Model
{
    use HasFactory;
    
        protected $fillable = [
        "user_id",
        "category_id",
        "year",
        "expense_total",
        "weight_total",
        "updated_at",
        "created_at"
    ];   
}
