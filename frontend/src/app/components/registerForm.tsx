'use client'
import { useState } from 'react';
import '../../styles/registerForm.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function RegisterForm () {
    const [ formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [ error, setError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if(formData.password !== formData.confirmPassword) {
            setError('Password do not match');
            setIsLoading(false);
            return;
        }
        // { formData.password !== formData.confirmPassword ? setError('Password do not match') : setIsLoading(false)}
        
        if(formData.password.length < 8) {
            setError('Password must atleast be 8 character');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                }),
            });
            if (response.ok) {
            router.push('/login?message=Registration successful! Please sign in.');
            } else {
                const data = await response.json();
                setError(data.message || 'Registration failed');
            }
        } catch (error) {
        setError('An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <>
            <div className="container_registerform">
                <h2>Create Account</h2>

                {error && (
                    <div className='error_container'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        {/* First Name Input Field */}
                        <div>
                            <label htmlFor="firstName">
                                First Name
                            </label>

                            <input 
                                type="text" 
                                id='firstName'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder='Enter your first name'
                                required
                            />
                        </div>

                        {/* Last Name Input Field */}
                        <div>
                            <label htmlFor="lastName">
                                Last Name
                            </label>

                            <input 
                                type="text" 
                                id='lastName'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder='Enter your last name'
                                required
                            />
                        </div>
                    </div>    
                    {/* Email Address Input Field */}
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
                            placeholder='Enter your email'
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

                    {/* Confirm Password input Field */}
                    <div>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            id='confirmPassword'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='Confirm your Password'                                required
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className='btn_submit' 
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="link_navigation">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
};