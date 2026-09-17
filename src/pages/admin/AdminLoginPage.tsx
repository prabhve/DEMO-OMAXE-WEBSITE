import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { LoginSchema } from '../../lib/api/schemas';
import { LoginCredentials } from '../../lib/api/types';
import { useAuthStore } from '../../lib/admin/auth-store';
import { SEED_USERS } from '../../lib/api/seed-data';

export const AdminLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = useAuthStore((s) => s.login);
  const verify2FA = useAuthStore((s) => s.verify2FA);
  const twoFactorPending = useAuthStore((s) => s.twoFactorPending);
  const pendingEmail = useAuthStore((s) => s.pendingEmail);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema) as any,
    defaultValues: {
      email: 'prabhve5@gmail.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    setLoginError(null);
    setIsSubmitting(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setLoginError(err.message || 'Invalid administrator credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!twoFactorCode || twoFactorCode.length < 6) {
      setLoginError('Please enter a valid 6-digit authentication token');
      return;
    }

    const success = verify2FA(twoFactorCode);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setLoginError('Invalid 2FA code. (Hint: Use 123456 for demo)');
    }
  };

  const handleSelectDemoUser = (userEmail: string) => {
    setValue('email', userEmail);
    setValue('password', 'password123');
    setLoginError(null);
  };

  return (
    <div className="min-h-screen flex bg-neutral-900 text-neutral-100 font-sans">
      {/* Left Side: Brand Visual Atmosphere */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-neutral-950 border-r border-neutral-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

        {/* Top Brand Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#A8823C] text-neutral-950 flex items-center justify-center font-serif font-bold text-lg">
            O
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest uppercase text-white font-serif">
              OMAXE LIMITED
            </h1>
            <p className="text-[10px] text-neutral-400 tracking-wider">Enterprise Administration Hub</p>
          </div>
        </div>

        {/* Center Quote & Craft Statement */}
        <div className="relative z-10 max-w-md space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#A8823C] bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/50">
            <Sparkles className="w-3 h-3" />
            Digital Governance 2026
          </span>
          <h2 className="text-2xl font-serif font-light text-neutral-100 leading-snug">
            Orchestrating India's Premier Township Portfolio & Investor Relations
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Directly govern real-time property inventory, CRM lead pipelines, RERA regulatory filings, and editorial media across 31 operational cities.
          </p>
        </div>

        {/* Footer Security Badges */}
        <div className="relative z-10 flex items-center gap-4 text-[11px] text-neutral-500 pt-6 border-t border-neutral-800/80">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A8823C]" />
            RBAC 6-Tier Permission Matrix
          </span>
          <span>·</span>
          <span>IndexedDB Persistent Data Store</span>
        </div>
      </div>

      {/* Right Side: Login & 2FA Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <div className="w-full max-w-md space-y-6">
          {!twoFactorPending ? (
            <>
              {/* Header */}
              <div className="space-y-1.5 text-left">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                  Sign in to Administrator Portal
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Please enter your authorized enterprise credentials to access Omaxe Control.
                </p>
              </div>

              {/* Error Alert */}
              {loginError && (
                <div className="p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
                  {loginError}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Administrator Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="admin@omaxe.com"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A8823C] focus:border-[#A8823C]"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Demo password is: password123')}
                      className="text-[11px] text-[#A8823C] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A8823C] focus:border-[#A8823C]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      {...register('rememberMe')}
                      type="checkbox"
                      className="rounded text-[#A8823C] focus:ring-[#A8823C] w-3.5 h-3.5"
                    />
                    <span className="text-neutral-600 dark:text-neutral-400">Remember session for 30 days</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#A8823C] hover:bg-[#8e6d2f] rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Quick Demo Impersonation Shortcuts */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider text-center">
                  Quick Demo Accounts
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {SEED_USERS.map((u) => (
                    <button
                      key={u.email}
                      type="button"
                      onClick={() => handleSelectDemoUser(u.email)}
                      className="flex flex-col p-2 text-left rounded border border-neutral-200 dark:border-neutral-800 hover:border-[#A8823C] bg-neutral-50 dark:bg-neutral-900 transition-colors"
                    >
                      <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                        {u.name}
                      </span>
                      <span className="text-[10px] text-[#A8823C] font-medium">{u.role}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* 2-Factor Authentication Code Step */
            <div className="space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="space-y-1 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/60 text-[#A8823C] flex items-center justify-center mb-2">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Two-Factor Authentication
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  A verification code has been sent to <strong>{pendingEmail}</strong>.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 text-xs text-center">
                  {loginError}
                </div>
              )}

              <form onSubmit={handle2FASubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-center text-neutral-700 dark:text-neutral-300">
                    Enter 6-Digit Authenticator Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full text-center text-xl tracking-[0.5em] font-mono py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A8823C]"
                    autoFocus
                  />
                  <p className="text-[11px] text-neutral-400 text-center">
                    Demo bypass: Enter <span className="font-mono text-neutral-600 dark:text-neutral-300 font-semibold">123456</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#A8823C] hover:bg-[#8e6d2f] rounded-md transition-colors shadow-xs"
                >
                  Verify & Launch Admin
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
