<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'name' => '自己投資',
            'weight' => '0.5',
            'discription' => '自分を成長させるために使った支出',
        ]);
        
        DB::table('categories')->insert([
            'name' => '生活必需品',
            'weight' => '1.0',
            'discription' => '生活に必要なものに使った支出',
        ]);
        
        DB::table('categories')->insert([
            'name' => '娯楽',
            'weight' => '1.5',
            'discription' => '娯楽のために使った支出',
        ]);
    }
}
