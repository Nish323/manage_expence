<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class expense extends Model
{
    use HasFactory;
    
    protected $fillable = [
        "user_id",
        "category_id",
        "description",
        "amount",
        "created_at",
        "updated_at",
        "expense_at"
    ];
}
