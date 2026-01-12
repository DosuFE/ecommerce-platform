'use client'
import { useState } from 'react'
import '../../styles/registerForm.css'
import '../../styles/loginForm.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    })
    const [ error, setError] = useState('')
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/dashboard');
            } else {
                const data = await response.json();
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div className='container_registerform'>
                <h2>Sign In</h2>

                {error && (
                    <div className='error_container'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input Field */}
                    <div>
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input                                 
                           type="email" 
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter your Email Address'
                            required
                        />
                    </div>

                    {/* Password Input Field */}
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>

                        <input                                 
                           type="password" 
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            required
                        />
                    </div>

                    {/* CHECKBOX */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="checkbox_input"
                            />
                            <label htmlFor="remember" className="checkbox_label">
                                Remember me
                            </label>
                        </div>

                        <Link href="/forgetPassword" className="text-sm text-blue-600 hover:text-blue-700">
                            Forgot password?
                        </Link>
                    </div>
                
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn_submit"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don`&apos;`t have an account?{' '}
                        <Link href="/register" className="btn_create">
                            Create one here
                        </Link>
                    </p>
                </div>

                {/* Social login options */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="btn_google"
                        >
                            <span className="sr-only">Sign in with Google</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="btn_facebook"
                        >
                            <span className="sr-only">Sign in with Facebook</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-极狐.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}