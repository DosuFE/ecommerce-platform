'use client'

import { useState } from "react"

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        console.log({
        email,
        password,
        });
    }

    return (
        <>
            <form onSubmit={handleLogin} className="space-y-4">
                <h2>Sign In</h2>

                <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input 
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded"
                >
                    Login
                </button>
            </form>
        </>
    )
}