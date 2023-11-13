<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\expense;
use App\Models\month_total;
use App\Models\year_total;
use App\Models\category_month_total;
use App\Models\category_year_total;
use App\Models\category;
use App\Http\Requests\ExpenseRequest;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ExpenseController extends Controller
{
    public function index(Expense $expense)
    {
        return Inertia::render("Expense/Index", ["expenses" => $expense->get()]);
    }
    
    public function create(Category $category)
    {
        return Inertia::render("Expense/Create", ["categories" => $category->get()]);
    }
    
    public function home()
    {
        
        return Inertia::render("Expense/Home");
    }
    
    public function store(ExpenseRequest $request, Expense $expense)
    {
        // ユーザー入力から月を取得
        $expenseDate = Carbon::parse($request->expense_at);
        $Month = $expenseDate->startOfMonth()->format('m');
        $Year = $expenseDate->startOfMonth()->format('y');
        $userId = $request->user()->id;
        $categoryId = $request->category_id;
        
        // month_totalの取得または作成
        $monthTotal = month_total::firstOrNew([
            'user_id' => $userId,
            'year' => $Year,
            'month' => $Month,
        ]);
    
        // カラムに金額を加算
        $monthTotal->expense_total += $request->amount;
        
        //カテゴリーテーブルから対応したidのweightを取得
        $category = Category::find($categoryId);
        $weight = $category->weight;

        // カラムに重さを加算
        $monthTotal->weight_total += floor($weight * $request->amount);
    
        // データベースに保存
        $monthTotal->save();
        
        //year_totalの取得または作成
        $yearTotal = year_total::firstOrNew([
            'user_id' => $userId,
            'year' => $Year,
        ]);
        
        $yearTotal->expense_total += $request->amount;
        $yearTotal->weight_total += floor($weight * $request->amount);
        
        $yearTotal->save();
        
        //category_month_totalの取得または作成
        $CmonthTotal = category_month_total::firstOrNew([
            'user_id' => $userId,
            'category_id' => $categoryId,
            'year' => $Year,
            'month' => $Month,
        ]);
        
        $CmonthTotal->expense_total += $request->amount;
        $CmonthTotal->weight_total += floor($weight * $request->amount);
        $CmonthTotal->category_id = $categoryId;
        
        $CmonthTotal->save();
        
        
        //category_year_totalの取得または作成
        $CyearTotal = category_year_total::firstOrNew([
            'user_id' => $userId,
            'category_id' => $categoryId,
            'year' => $Year,
        ]);
        
        $CyearTotal->expense_total += $request->amount;
        $CyearTotal->weight_total += floor($weight * $request->amount);
        $CyearTotal->category_id = $categoryId;
        
        $CyearTotal->save();
    
        // $expenseモデルにデータを代入して保存
        $expense->user_id = $userId;
        $expense->expense_at = $request->expense_at;
        $expense->amount = $request->amount;
        $expense->description = $request->description;
        $expense->category_id = $request->category_id;
        
        $expense->save();
    
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
