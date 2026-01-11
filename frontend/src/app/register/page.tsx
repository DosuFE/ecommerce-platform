import RegisterForm from "../components/registerForm";

export default function RegisterPage() {
  return (
    <div 
        className="min-h-screen bg-gray-50 flex items-center justify-center 
        py-12 px-4 mt-10 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us and start shopping today</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}