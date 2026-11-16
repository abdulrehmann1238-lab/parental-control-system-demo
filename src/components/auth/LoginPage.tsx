import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Lock, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState<'parent' | 'admin'>('parent');
  const [email, setEmail] = useState('parent@demo.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRoleSwitch = (selectedRole: 'parent' | 'admin') => {
    setRole(selectedRole);
    setError(null);
    if (selectedRole === 'parent') {
      setEmail('parent@demo.com');
      setPassword('demo123');
    } else {
      setEmail('admin@demo.com');
      setPassword('admin123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email || !email.includes('@')) {
      setError('Please provide a valid demonstration email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    // Check credentials simulation
    const isValidParent = role === 'parent' && email === 'parent@demo.com' && password === 'demo123';
    const isValidAdmin = role === 'admin' && email === 'admin@demo.com' && password === 'admin123';

    if (!isValidParent && !isValidAdmin) {
      setError(`Invalid demo credentials. For ${role}, use ${role === 'parent' ? 'parent@demo.com / demo123' : 'admin@demo.com / admin123'}.`);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      login(role, email);

      setTimeout(() => {
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/parent');
        }
      }, 700);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Ambient background blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage-100/70 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sand-200/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Return to website link */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-sage-700 transition-colors"
        >
          <ArrowLeft size={14} />
          Return to Website
        </Link>
        <span className="text-[11px] font-medium text-sage-700 bg-sage-100 px-2.5 py-0.5 rounded-full border border-sage-200">
          Demo Environment
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-card-lg border border-charcoal-100 shadow-modal p-6 sm:p-8">
        
        {/* Brand */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <BrandLogo />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-charcoal-800 tracking-tight">
            Sign In to Platform
          </h2>
          <p className="text-xs text-charcoal-500 mt-1">
            Choose an environment below to test role-based access
          </p>
        </div>

        {/* Environment Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-ivory-200 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => handleRoleSwitch('parent')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              role === 'parent'
                ? 'bg-white text-sage-800 shadow-xs'
                : 'text-charcoal-600 hover:text-charcoal-800'
            }`}
          >
            Parent Account
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch('admin')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              role === 'admin'
                ? 'bg-white text-sage-800 shadow-xs'
                : 'text-charcoal-600 hover:text-charcoal-800'
            }`}
          >
            Owner Admin
          </button>
        </div>

        {/* Demo Credentials Quick-Fill Alert */}
        <div className="mb-6 p-3 rounded-xl bg-ivory-100 border border-ivory-300 flex items-center justify-between text-xs text-charcoal-600">
          <div>
            <p className="font-semibold text-charcoal-800 text-[11px] uppercase tracking-wider">
              {role === 'parent' ? 'Parent Demo Credentials' : 'Admin Demo Credentials'}
            </p>
            <p className="text-[11px] font-mono mt-0.5">
              {role === 'parent' ? 'parent@demo.com / demo123' : 'admin@demo.com / admin123'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (role === 'parent') {
                setEmail('parent@demo.com');
                setPassword('demo123');
              } else {
                setEmail('admin@demo.com');
                setPassword('admin123');
              }
              setError(null);
            }}
            className="text-[11px] font-semibold text-sage-600 hover:text-sage-800 bg-white px-2 py-1 rounded-md border border-charcoal-100 shadow-xs"
          >
            Auto Fill
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-status-critical-bg border border-status-critical/30 text-status-critical flex items-start gap-2.5 text-xs">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-4 p-3 rounded-xl bg-status-success-bg border border-status-success/30 text-status-success flex items-center gap-2.5 text-xs font-semibold">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>Authenticated successfully. Redirecting...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 pl-10 text-xs sm:text-sm bg-ivory-50 border border-charcoal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all"
                placeholder="name@example.com"
              />
              <Mail size={16} className="absolute left-3.5 top-3 text-charcoal-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 pl-10 pr-10 text-xs sm:text-sm bg-ivory-50 border border-charcoal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all"
                placeholder="••••••••"
              />
              <Lock size={16} className="absolute left-3.5 top-3 text-charcoal-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-charcoal-400 hover:text-charcoal-700 focus:outline-none"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-charcoal-300 text-sage-600 focus:ring-sage-500"
              />
              <span className="text-charcoal-600">Remember this device</span>
            </label>
            <span className="text-sage-600 hover:underline cursor-pointer">
              Forgot demo key?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full mt-4 py-3 bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white font-semibold text-sm rounded-xl shadow-soft hover:shadow-lift transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle2 size={16} />
                <span>Access Granted</span>
              </>
            ) : (
              <span>Sign In to {role === 'parent' ? 'Parent Dashboard' : 'Owner Admin'}</span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-ivory-200 text-center text-[11px] text-charcoal-500">
          Want to test the child phone experience directly?{' '}
          <Link to="/child" className="text-sage-700 font-semibold hover:underline">
            Open Child Companion
          </Link>
        </div>

      </div>
    </div>
  );
};
