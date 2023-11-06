<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\expence;

class ExpenceController extends Controller
{
    public function index(expence $expence)
    {
        return Inertia::render("Expence/Index", ["expences" => $expence->get()]);
    }
    
    public function create()
    {
         return Inertia::render("Expence/Create");
    }
}
