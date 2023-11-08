<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\expense;
use App\Http\Requests\ExpenseRequest;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function index(Expense $expense)
    {
        return Inertia::render("Expense/Index", ["expenses" => $expense->get()]);
    }
    
    public function create()
    {
        return Inertia::render("Expense/Create");
    }
    
    public function home()
    {
        return Inertia::render("Expense/Home");
    }
    
    public function store(ExpenseRequest $request, Expense $expense)
    {
        $input = $request->all();
        $input += ['user_id' => $request->user()->id];
        $expense->fill($input)->save();
        return redirect("/home/expenses");
    }
    
    public function edit(Expense $expense)
    {
        return Inertia::render("Expense/Edit", ["expense" => $expense]);
    }
    
    public function update(ExpenseRequest $request, Expense $expense)
    {
        $input = $request->all();
        $input += ['user_id' => $request->user()->id];
        $expense->fill($input)->save();
        return redirect("/home/expenses/" . $expense->id);
    }
    
    public function delete(Expense $expense)
    {
        $expense->delete();
        return redirect("/home/expenses");
    }
}
