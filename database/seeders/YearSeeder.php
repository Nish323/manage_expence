<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;


class YearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('year_totals')->insert([
            'user_id' => '1',
            'year' => '2023',
            'expence_total' => '1500',
            'weight_total' => '750',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
    }
}
