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
use App\Http\Requests\CategoryRequest;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ExpenseController extends Controller
{
    public function index(Expense $expense)
    {
        $userId = Auth::id();
        
        $expenses = expense::where('user_id', $userId)->get();

    
        // MonthTotalモデルから月ごとの合計値を取得
        $CmonthTotals = category_month_total::where('user_id', $userId)->get();
        $categories = category::where('user_id', $userId)->get();
        
        return Inertia::render("Expense/Index", [
            "expenses" => $expenses,
            "CmonthTotals" => $CmonthTotals,
            "categories" => $categories
        ]);
    }
        
    public function create(Category $category)
    {
        $userId = Auth::id();
        $category = category::where('user_id', $userId)->get();
        return Inertia::render("Expense/Create", ["categories" => $category]);
    }
    
    public function home()
    {
        $userId = Auth::id();
        
        $expenses = expense::where('user_id', $userId)->get();
        $category = category::where('user_id', $userId)->get();
        
        
        return Inertia::render("Expense/Home", [
            'expenses' => $expenses,
            "categories" => $category
        ]);
    }
    
    public function store(ExpenseRequest $request, Expense $expense)
    {
        // ユーザー入力から月を取得
        $expenseDate = Carbon::parse($request->expense_at);
        $Month = $expenseDate->startOfMonth()->format('m');
        $Year = $expenseDate->startOfMonth()->format('Y');
        $userId = $request->user()->id;
        $categoryId = $request->category_id;
        $Amount = $request->amount;
        
        // month_totalの取得または作成
        $monthTotal = month_total::firstOrNew([
            'user_id' => $userId,
            'year' => $Year,
            'month' => $Month,
        ]);
    
        // カラムに金額を加算
        $monthTotal->expense_total += $Amount;
        
        //カテゴリーテーブルから対応したidのweightを取得
        $category = Category::find($categoryId);
        $weight = $category->weight;

        // カラムに重さを加算
        $monthTotal->weight_total += floor($weight * $Amount);
    
        // データベースに保存
        $monthTotal->save();
        
        //year_totalの取得または作成
        $yearTotal = year_total::firstOrNew([
            'user_id' => $userId,
            'year' => $Year,
        ]);
        
        $yearTotal->expense_total += $request->amount;
        $yearTotal->weight_total += floor($weight * $Amount);
        
        $yearTotal->save();
        
        //category_month_totalの取得または作成
        $CmonthTotal = category_month_total::firstOrNew([
            'user_id' => $userId,
            'category_id' => $categoryId,
            'year' => $Year,
            'month' => $Month,
        ]);
        
        $CmonthTotal->expense_total += $Amount;
        $CmonthTotal->weight_total += floor($weight * $Amount);
        $CmonthTotal->category_id = $categoryId;
        
        $CmonthTotal->save();
        
        
        //category_year_totalの取得または作成
        $CyearTotal = category_year_total::firstOrNew([
            'user_id' => $userId,
            'category_id' => $categoryId,
            'year' => $Year,
        ]);
        
        $CyearTotal->expense_total += $Amount;
        $CyearTotal->weight_total += floor($weight * $Amount);
        $CyearTotal->category_id = $categoryId;
        
        $CyearTotal->save();
    
        // $expenseモデルにデータを代入して保存
        $expense->user_id = $userId;
        $expense->expense_at = $request->expense_at;
        $expense->amount = $Amount;
        $expense->description = $request->description;
        $expense->category_id = $categoryId;
        
        $expense->save();
    
        return redirect("/home/expenses");
    }

    
    public function edit(Expense $expense)
    {
        $userId = Auth::id();
        $categories = category::where('user_id', $userId)->get();
        return Inertia::render("Expense/Edit", [
            "expense" => $expense,
            "categories" => $categories
            ]);
    }
    
    public function update(ExpenseRequest $request, Expense $expense)
    {
        $expenseId = $expense->id;
        $original = expense::findOrFail($expenseId);
        
         // ユーザー入力から月を取得
        $originalDate = Carbon::parse($original->expense_at);
        $originalMonth = $originalDate->startOfMonth()->format('m');
        $originalYear = $originalDate->startOfMonth()->format('Y');
        $userId = $request->user()->id;
        $originalcategoryId = $original->category_id;
        $originalAmount = $original->amount;
    
        // month_totalの取得または作成
        $originalmonthTotal = month_total::firstOrNew([
            'user_id' => $userId,
            'year' => $originalYear,
            'month' => $originalMonth,
        ]);
    
        // カラムに金額を加算
        $originalmonthTotal->expense_total -= $originalAmount;
    
        //カテゴリーテーブルから対応したidのweightを取得
        $originalcategory = Category::find($originalcategoryId);
        $originalweight = $originalcategory->weight;
    
        // カラムに重さを加算
        $originalmonthTotal->weight_total -= floor($originalweight * $originalAmount);
    
        // データベースに保存
        $originalmonthTotal->save();
    
        //year_totalの取得または作成
        $originalyearTotal = year_total::firstOrNew([
            'user_id' => $userId,
            'year' => $originalYear,
        ]);
    
        $originalyearTotal->expense_total -= $originalAmount;
        $originalyearTotal->weight_total -= floor($originalweight * $originalAmount);
    
        $originalyearTotal->save();
    
        //category_month_totalの取得または作成
        $originalCmonthTotal = category_month_total::firstOrNew([
            'user_id' => $userId,
            'category_id' => $originalcategoryId,
            'year' => $originalYear,
            'month' => $originalMonth,
        ]);
    
        $originalCmonthTotal->expense_total -= $originalAmount;
        $originalCmonthTotal->weight_total -= floor($originalweight * $originalAmount);
        $originalCmonthTotal->category_id = $originalcategoryId;
    
        $originalCmonthTotal->save();
    
        //category_year_totalの取得または作成
        $originalCyearTotal = category_year_total::firstOrNew([
            'user_id' => $userId,
            'category_id' => $originalcategoryId,
            'year' => $originalYear,
        ]);
    
        $originalCyearTotal->expense_total -= $originalAmount;
        $originalCyearTotal->weight_total -= floor($originalweight * $originalAmount);
        $originalCyearTotal->category_id = $originalcategoryId;
    
        $originalCyearTotal->save();
        
         // ユーザー入力から月を取得
        $expenseDate = Carbon::parse($request->expense_at);
        $Month = $expenseDate->startOfMonth()->format('m');
        $Year = $expenseDate->startOfMonth()->format('Y');
        $categoryId = $request->category_id;
        $userId = $request->user()->id;
        $Amount = $request->amount;
        
        // month_totalの取得または作成
        $monthTotal = month_total::firstOrNew([
            'user_id' => $userId,
            'year' => $Year,
            'month' => $Month,
        ]);
    
        // カラムに金額を加算
        $monthTotal->expense_total += $Amount;
        
        //カテゴリーテーブルから対応したidのweightを取得
        $category = Category::find($categoryId);
        $weight = $category->weight;

        // カラムに重さを加算
        $monthTotal->weight_total += floor($weight * $Amount);
    
        // データベースに保存
        $monthTotal->save();
        
        //year_totalの取得または作成
        $yearTotal = year_total::firstOrNew([
            'user_id' => $userId,
            'year' => $Year,
        ]);
        
        $yearTotal->expense_total += $request->amount;
        $yearTotal->weight_total += floor($weight * $Amount);
        
        $yearTotal->save();
        
        //category_month_totalの取得または作成
        $CmonthTotal = category_month_total::firstOrNew([
            'user_id' => $userId,
            'category_id' => $categoryId,
            'year' => $Year,
            'month' => $Month,
        ]);
        
        $CmonthTotal->expense_total += $Amount;
        $CmonthTotal->weight_total += floor($weight * $Amount);
        $CmonthTotal->category_id = $categoryId;
        
        $CmonthTotal->save();
        
        
        //category_year_totalの取得または作成
        $CyearTotal = category_year_total::firstOrNew([
            'user_id' => $userId,
            'category_id' => $categoryId,
            'year' => $Year,
        ]);
        
        $CyearTotal->expense_total += $Amount;
        $CyearTotal->weight_total += floor($weight * $Amount);
        $CyearTotal->category_id = $categoryId;
        
        $CyearTotal->save();
    
        // $expenseモデルにデータを代入して保存
        $expense->user_id = $userId;
        $expense->expense_at = $request->expense_at;
        $expense->amount = $Amount;
        $expense->description = $request->description;
        $expense->category_id = $categoryId;
        
        $expense->save();
    
        return redirect("/home/expenses/");
    }
    
    public function delete(Expense $expense)
    {
        // ユーザー入力から月を取得
        $expenseDate = Carbon::parse($expense->expense_at);
        $Month = $expenseDate->startOfMonth()->format('m');
        $Year = $expenseDate->startOfMonth()->format('Y');
        $userId = Auth::id();
        $categoryId = $expense->category_id;
        $Amount = $expense->amount;
    
        // エクスペンスを削除
        $expense->delete();
    
        // month_totalの取得または作成
        $monthTotal = month_total::firstOrNew([
            'user_id' => $userId,
            'year' => $Year,
            'month' => $Month,
        ]);
    
        // カラムに金額を減算
        $monthTotal->expense_total -= $Amount;
    
        //カテゴリーテーブルから対応したidのweightを取得
        $category = Category::find($categoryId);
        $weight = $category->weight;
    
        // カラムに重さを減算
        $monthTotal->weight_total -= floor($weight * $Amount);
    
        // データベースに保存
        $monthTotal->save();
    
        //year_totalの取得または作成
        $yearTotal = year_total::firstOrNew([
            'user_id' => $userId,
            'year' => $Year,
        ]);
    
        $yearTotal->expense_total -= $Amount;
        $yearTotal->weight_total -= floor($weight * $Amount);
    
        $yearTotal->save();
    
        //category_month_totalの取得または作成
        $CmonthTotal = category_month_total::firstOrNew([
            'user_id' => $userId,
            'category_id' => $categoryId,
            'year' => $Year,
            'month' => $Month,
        ]);
    
        $CmonthTotal->expense_total -= $Amount;
        $CmonthTotal->weight_total -= floor($weight * $Amount);
        $CmonthTotal->category_id = $categoryId;
    
        $CmonthTotal->save();
    
        //category_year_totalの取得または作成
        $CyearTotal = category_year_total::firstOrNew([
            'user_id' => $userId,
            'category_id' => $categoryId,
            'year' => $Year,
        ]);
    
        $CyearTotal->expense_total -= $Amount;
        $CyearTotal->weight_total -= floor($weight * $Amount);
        $CyearTotal->category_id = $categoryId;
    
        $CyearTotal->save();
    
        return redirect("/home/expenses");
    }
    
    public function category()
    {
        $userId = Auth::id();
        
        $category = category::where('user_id', $userId)->get();
        return Inertia::render("Expense/Category", ["categories" => $category]);
    }
    
    public function cedit(Category $category)
    {
        return Inertia::render("Expense/Cedit", [
            "categories" => $category
            ]);
    }
        
    public function cupdate(CategoryRequest $request, Category $category)
    {
        $input = $request->all();
        $category->fill($input)->save();
        return redirect("/home/category/");
    }
    
    public function cdelete(Category $category){
        $category->delete();
        return redirect("/home/category");
    }
    
    public function categorycreate()
    {
        return Inertia::render("Expense/Ccreate");
    }
    
    public function cstore(CategoryRequest $request, Category $category)
    {
        $userId = Auth::id();
        $input = $request->all();
        $input['user_id'] = $userId;
        $category->fill($input)->save();
        return redirect("/home/category");
    }
    
}

