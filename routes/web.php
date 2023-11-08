<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ExpenceController;

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
    Route::get("/home", [ExpenceController::class, "home"]);
    Route::get("/home/expences", [ExpenceController::class, "index"]);
    Route::get("/home/create", [ExpenceController::class, "create"]);
    Route::post("/home/expences", [ExpenceController::class, "store"]);
    Route::get('/home/expences/{expence}', [ExpenceController::class, "edit"]);
    Route::put('/home/expences/{expence}', [ExpenceController::class, "update"]);
    Route::delete("/home/expences/{expence}", [ExpenceController::class, "delete"]);
});

require __DIR__.'/auth.php';
