'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiUser } from 'react-icons/hi2';
import { IoKey } from 'react-icons/io5';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { dummyUsers } from '@/app/dummyUsers';
import { supabase } from '@/app/lib/supabase';

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const found = dummyUsers.find((u) => u.username === username);
    if (!found) {
      setError('Wrong Email or password!');
      return;
    }

    const { email, role, kmhm_name } = found;

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError('Wrong Email or password!');
    } else {
      setError('');
      // kirim kmhm_name via router state
      const target = role === 'page-a' ? '/DASHBOARD/managerDashboard' : '/DASHBOARD/adminDashboard';
      router.push(`${target}?kmhm=${encodeURIComponent(kmhm_name ?? '')}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen font-sofia">
      <div className="w-[446px] flex flex-col gap-6">
        <h1 className="text-[60px] text-[#1D2225] text-center font-[400] drop-shadow-md"
          style={{ fontFamily: 'Snowstorm, sans-serif' }}
        >
          Sign In
        </h1>

        {/* Username */}
        <div className="flex flex-col gap-[11px]">
          <label className="flex items-center gap-2 text-[24px] font-extrabold text-[#1D2225]">
            <HiUser className="w-[31px] h-[31px]" />
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username kamu"
            className="w-full h-[56px] px-7 py-3 bg-[#F5F5F5] rounded-[32px] shadow-md text-[20px] font-semibold placeholder:text-[#B6B7BA] focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-[11px]">
          <label className="flex items-center gap-2 text-[24px] font-extrabold text-[#1D2225]">
            <IoKey className="w-[28px] h-[28px]" />
            Password
          </label>
          <div className="relative flex items-center bg-[#F5F5F5] rounded-[59px] shadow-md h-[56px] px-5 py-3">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password kamu"
              className="flex-1 bg-transparent text-[20px] font-semibold placeholder:text-[#B6B7BA] focus:outline-none"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <HiEyeOff className="text-[#806037] w-6 h-6" />
              ) : (
                <HiEye className="text-[#806037] w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {error && <p className="text-red-600 text-center font-medium -mt-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="mt-2 w-full bg-[#806037] text-[#FBEBD2] rounded-[32px] py-2 text-[20px] font-semibold shadow-md hover:opacity-70 transition-all"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
