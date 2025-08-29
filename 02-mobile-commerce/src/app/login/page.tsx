'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message || '오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google 로그인 실패');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl shadow-lg mb-4">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">QuickMart</h1>
          <p className="text-gray-600 mt-2">30분 내 초고속 배송</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isSignUp ? '회원가입' : '로그인'}
          </h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="홍길동"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="example@email.com"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '처리 중...' : isSignUp ? '회원가입' : '로그인'}
            </button>
          </form>

          {/* 구분선 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">또는</span>
            </div>
          </div>

          {/* 소셜 로그인 */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google로 계속하기
          </button>

          {/* 회원가입/로그인 전환 */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignUp ? '이미 계정이 있으신가요?' : '아직 회원이 아니신가요?'}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="ml-2 text-orange-600 font-semibold hover:text-orange-700"
            >
              {isSignUp ? '로그인' : '회원가입'}
            </button>
          </p>
        </div>

        {/* 게스트 모드 */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 text-sm underline"
          >
            로그인 없이 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}