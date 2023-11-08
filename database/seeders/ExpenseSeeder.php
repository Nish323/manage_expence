<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('expenses')->insert([
            'description' => 'テスト',
            'amount' => '1500',
            'expense_at' => '2023-11-03',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
            'category_id' => '1',
            'user_id' => '1',
        ]);
         
    }
}
