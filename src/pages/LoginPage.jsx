import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signInWithEmailAndPassword } from '../services/firebaseService';
import { validateEmail, validateName } from '../utils/validation';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (isSignUp) {
      if (!name.trim()) {
        setError('Name is required.');
        return;
      }
      if (!validateName(name)) {
        setError('Please enter a valid name (at least 2 letters, only letters and spaces).');
        return;
      }
    }

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      const userObject = isSignUp && name 
        ? { ...userCredential, displayName: name }
        : userCredential;

      login(userObject.user || userObject);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Unable to complete authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-shell grid min-h-[calc(100vh-109px)] items-center gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="ink-panel hidden rounded-[8px] p-10 lg:block">
        <p className="eyebrow text-[#f2b84b]">{isSignUp ? 'New account' : 'Client access'}</p>
        <h1 className="mt-4 font-display text-6xl font-bold leading-none">
          {isSignUp ? 'Create your spatial harmony plan.' : 'Continue your spatial harmony plan.'}
        </h1>
        <p className="mt-5 max-w-xl leading-8 text-white/70">
          Authentication is mocked for this prototype, so any account creation or login will sign you in instantly while the real auth backend resolves.
        </p>
      </div>

      <div className="soft-card mx-auto w-full max-w-md rounded-[8px] p-6 sm:p-8">
        <Link to="/" className="mb-6 inline-flex text-sm font-extrabold text-[#0f766e] hover:underline">
          Back to home
        </Link>
        
        {/* Toggle Mode Switcher */}
        <div className="flex bg-[#ebe4d8]/40 dark:bg-[#111715] p-1 rounded-full border border-black/5 dark:border-white/5 shadow-inner mb-6 font-mono text-[10px] font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setError(''); }}
            className={`flex-1 py-2 text-center rounded-full transition-all ${
              !isSignUp
                ? 'bg-[#080c0b] dark:bg-[#f0ede8] text-white dark:text-[#080c0b] shadow-sm font-extrabold'
                : 'text-[#6e8078] hover:text-[#080c0b] dark:hover:text-[#f0ede8]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setError(''); }}
            className={`flex-1 py-2 text-center rounded-full transition-all ${
              isSignUp
                ? 'bg-[#080c0b] dark:bg-[#f0ede8] text-white dark:text-[#080c0b] shadow-sm font-extrabold'
                : 'text-[#6e8078] hover:text-[#080c0b] dark:hover:text-[#f0ede8]'
            }`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-bold leading-none">
          {isSignUp ? 'Create Account' : 'Welcome back'}
        </h2>
        <p className="mt-2 text-[#68736d] text-sm">
          {isSignUp ? 'Register to align your energy and space.' : 'Sign in to continue to Hareshvar Exim Pvt Ltd.'}
        </p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <label className="font-bold text-sm">
              Full name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="mt-1.5 w-full rounded-[8px] border border-[#111715]/20 bg-white px-4 py-2.5 text-sm"
                placeholder="John Doe"
              />
            </label>
          )}
          <label className="font-bold text-sm">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-1.5 w-full rounded-[8px] border border-[#111715]/20 bg-white px-4 py-2.5 text-sm"
              placeholder="you@example.com"
            />
          </label>
          <label className="font-bold text-sm">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-1.5 w-full rounded-[8px] border border-[#111715]/20 bg-white px-4 py-2.5 text-sm"
              placeholder="Enter password"
            />
          </label>
          {isSignUp && (
            <label className="font-bold text-sm">
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                className="mt-1.5 w-full rounded-[8px] border border-[#111715]/20 bg-white px-4 py-2.5 text-sm"
                placeholder="Repeat password"
              />
            </label>
          )}
          {error && <div className="rounded-[8px] bg-red-50 p-4 text-xs font-semibold text-red-700">{error}</div>}
          <button type="submit" disabled={loading} className="btn-gold w-full mt-2 py-3 text-xs font-mono uppercase tracking-wider">
            {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
