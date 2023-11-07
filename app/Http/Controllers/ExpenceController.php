<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\expence;
use App\Http\Requests\ExpenceRequest;

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
    
    public function store(ExpenceRequest $request, Expence $expence)
    {
        $input = $request->all();
        $input += ['user_id' => $request->user()->id];
        $expence->fill($input)->save();
        return redirect("/expences");
    }
}
