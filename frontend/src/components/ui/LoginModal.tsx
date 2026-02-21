'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from './Button';

interface LoginModalContentProps {
  onClose: () => void;
}

export function LoginModalContent({ onClose }: LoginModalContentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    onClose(); // Close the modal after attempting to log in
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Đăng nhập</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="w-full rounded-md bg-rgba-black-60 px-3 py-2 text-sm outline-none ring-1 ring-rgba-white-10 border border-rgba-white-5"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-neutral-300 mb-1"
        >
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-md bg-rgba-black-60 px-3 py-2 text-sm outline-none ring-1 ring-rgba-white-10 border border-rgba-white-5"
          required
        />
      </div>
      <Button type="submit" variant="primary" className="mt-2">
        Đăng nhập
      </Button>
    </form>
  );
}
