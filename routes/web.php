<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ExpenseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get("/home", [ExpenseController::class, "home"]);
    Route::get("/home/expenses", [ExpenseController::class, "index"]);
    Route::get("/home/create", [ExpenseController::class, "create"]);
    Route::get("home/transition", [ExpenseController::class, "transition"]);
    Route::post("/home/expenses", [ExpenseController::class, "store"]);
    Route::get('/home/expenses/{expense}', [ExpenseController::class, "edit"]);
    Route::put('/home/expenses/{expense}', [ExpenseController::class, "update"]);
    Route::delete('/home/expenses/{expense}', [ExpenseController::class, "delete"]);
    Route::get('/home/category', [ExpenseController::class, "category"]);
    Route::get("/home/category/create", [ExpenseController::class, "categorycreate"]);
    Route::get('/home/category/{category}', [ExpenseController::class, "cedit"]);
    Route::put('/home/category/{category}', [ExpenseController::class, "cupdate"]);
    Route::delete('/home/category/{category}', [ExpenseController::class, "cdelete"]);
    Route::post("/home/category", [ExpenseController::class, "cstore"]);
});

require __DIR__.'/auth.php';
