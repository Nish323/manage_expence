<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\expence;
use App\Http\Requests\ExpenceRequest;
use Illuminate\Support\Facades\Auth;

class ExpenceController extends Controller
{
    public function index(Expence $expence)
    {
        return Inertia::render("Expence/Index", ["expences" => $expence->get()]);
    }
    
    public function create()
    {
        return Inertia::render("Expence/Create");
    }
    
        public function home()
    {
        return Inertia::render("Expence/Home");
    }
    
    public function store(ExpenceRequest $request, Expence $expence)
    {
        $input = $request->all();
        $input += ['user_id' => $request->user()->id];
        $expence->fill($input)->save();
        return redirect("/home/expences");
    }
    
    public function edit(Expence $expence)
    {
        return Inertia::render("Expence/Edit", ["expence" => $expence]);
    }
    
    public function update(ExpenceRequest $request, Expence $expence)
    {
        $input = $request->all();
        $input += ['user_id' => $request->user()->id];
        $expence->fill($input)->save();
        return redirect("/home/expences/" . $expence->id);
    }
    
    public function delete(Expence $expence)
    {
    $expence->delete();
    return redirect("/home/expences");
    }
}
