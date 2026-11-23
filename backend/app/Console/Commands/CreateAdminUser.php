<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;

#[Signature('cms:create-super-admin')]
#[Description('Create the first CMS Super Admin account')]
class CreateAdminUser extends Command
{
    public function handle(): int
    {
        if (User::where('role', User::ROLE_ADMIN)->exists()) {
            $this->error('Super Admin sudah tersedia. Command bootstrap dibatalkan.');

            return self::FAILURE;
        }

        $name = trim((string) $this->ask('Nama Super Admin'));
        $email = strtolower(trim((string) $this->ask('Email kantor')));
        $password = (string) $this->secret('Password (input tersembunyi)');
        $passwordConfirmation = (string) $this->secret('Konfirmasi password');

        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $passwordConfirmation,
        ], [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:10', 'confirmed'],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return self::FAILURE;
        }

        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = $password;
        $user->role = User::ROLE_ADMIN;
        $user->customer_id = null;
        $user->save();

        $this->newLine();
        $this->info('Akun Super Admin berhasil dibuat.');
        $this->line('Nama: '.$user->name);
        $this->line('Email: '.$user->email);
        $this->line('Role: '.$user->role);

        return self::SUCCESS;
    }
}
