'use client'

import { useState } from 'react'
import '../../styles/forgetPassword.css'
import Link from 'next/link';

export default function ForgetPasswordPage() {
    const [ email, setEmail ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ error, setError ] = useState('');
    const [ step, setStep ] = useState <'email' | 'code' | 'reset'>('email');
    const [ resetCode, setResetCode ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const handleSendResetCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');   

        if( !email ) {
            setError('Please enter your email address');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Reset code sent to your email. Please check your email inbox');
                setStep('code');
            } else {
                setError(data.message || 'Failed to send reset code');
            }
        } catch (error) {
            setError('An error occured. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!resetCode) {
      setError('Please enter the reset code');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/verify-reset-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: resetCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Code verified successfully. You can now reset your password.');
        setStep('reset');
        } else {
            setError(data.message || 'Invalid reset code');
        }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
        setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!newPassword || !confirmPassword) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
        }

        if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
        }

        if (newPassword.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
        }

        try {
        const response = await fetch('http://localhost:5000/auth/reset-password', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code: resetCode, newPassword }),
            });

        const data = await response.json();

        if (response.ok) {
            setMessage('Password reset successfully! You can now login with your new password.');
            setTimeout(() => {
            window.location.href = '/login';
            }, 2000);
        } else {
            setError(data.message || 'Failed to reset password');
        }
        } catch (error) {
        setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="forgetpassword_container">
                <div className="max-w-md w-full space-y-8">
                    <div className='text-center'>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {step === 'email' && 'Reset Your Password'}
                            {step === 'code' && 'Enter Reset Code'}
                            {step === 'reset' && 'Create New Password'}
                        </h1>
                        <p className="text-gray-600">
                            {step === 'email' && 'Enter your email to receive a reset code'}
                            {step === 'code' && 'Check your email for the 6-digit code'}
                            {step === 'reset' && 'Enter your new password'}
                        </p>
                    </div>

                    {error && (
                        <div className="error_container">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="message_container">
                            {message}
                        </div>
                    )}

                    {step === 'email' && (
                        <form onSubmit={handleSendResetCode} className='form_container'>
                            <div>
                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className=""
                                    placeholder="Enter your email"
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn_reset"
                                    >
                                    {isLoading ? 'Sending...' : 'Send Reset Code'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 'code' && (
                        <form onSubmit={handleVerifyCode}>
                            <div>
                                <label htmlFor="code">
                                    Reset Code
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    value={resetCode}
                                    onChange={(e) => setResetCode(e.target.value)}
                                    required
                                    placeholder="Enter 6-digit code"
                                    maxLength={6}
                                />
                                <p className="text-sm text-gray-600 my-1"> 
                                    Check your email for the reset code
                                </p>
                            </div>

                            <button
                            type="submit"
                            disabled={isLoading}
                            className=".btn_reset"
                            >
                                {isLoading ? 'Verifying...' : 'Verify Code '}
                            </button>

                            <button
                            type="button"
                            onClick={() => setStep('email')}  
                            className="btn_email"
                            >
                                Back to Email
                            </button>
                        </form>
                    )}

                    {step === 'reset' && (
                        <form onSubmit={handleResetPassword} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                            <div>
                                <label htmlFor="newPassword">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <button
                            type="submit"
                            disabled={isLoading}
                            className=" .btn_reset"
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </button>

                            <button
                            type="button"
                            onClick={() => setStep('code')}
                            className="btn_email"
                            >
                             Back to Code Verification
                            </button>
                        </form>
                    )}

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Remember your password?{' '}
                            <Link 
                            href="/login" 
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link 
                            href="/register" 
                            className="text-blue-600 hover:text-blue-700 font-medium">
                                Create one here
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}