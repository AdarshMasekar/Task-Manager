import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, selectUser,setErrors } from '../store/reducers/userReducer';
import {z} from 'zod';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector(selectUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const userSchema = z.object(
            {
                email:z.string().email(),
                password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&]{8,}$/,"Password must be at least 8 characters long and include an uppercase,a lowercase, a number, and a special character.")
            }
        )
        userSchema.parse({email,password});
        await dispatch(loginUser({ email, password })).unwrap();
        toast.success("Logged in successfully!");
        navigate("/");
    }
    catch(err){
        const errorMessages = err.issues ? err.issues.map(issue => issue.message) : err;
        errorMessages.forEach(message => {
            toast(message, { type: "error" });
        });
    };

}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12 -mt-28">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
          <div className="flex flex-col items-center mb-8">
            <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error?.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-xl p-3">
               {Array.isArray(error) ? error.join(',').split(',').map((err, index) => (
                  <p key={index} className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {err}
                  </p>
                )) : (
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {error}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
