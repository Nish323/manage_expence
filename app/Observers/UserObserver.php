<?php

namespace App\Observers;

use App\Models\User;
use App\Models\category;

class UserObserver
{
    /**
     * Handle the User "created" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function created(User $user)
    {
        Category::create([
            'user_id' => $user->id,
            'name' => '自己投資',
            'weight' => '0.5',
            'description' => '自分を成長させるために使った支出',
        ]);

        Category::create([
            'user_id' => $user->id,
            'name' => '生活必需品',
            'weight' => '1.0',
            'description' => '生活に必要なものに使った支出',
        ]);

        Category::create([
            'user_id' => $user->id,
            'name' => '娯楽',
            'weight' => '1.5',
            'description' => '娯楽のために使った支出',
        ]);
    }

    /**
     * Handle the User "updated" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function updated(User $user)
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function deleted(User $user)
    {
        //
    }

    /**
     * Handle the User "restored" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function restored(User $user)
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function forceDeleted(User $user)
    {
        //
    }
}
