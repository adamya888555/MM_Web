'use client';

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight} from 'lucide-react';
import { useRouter } from "next/navigation";

export default function AuthForm(){
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isLogin) {
            if (formData.password.length < 8) {
                alert("Password must be 8 characters long");
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
        }

        setLoading(true);

        try{
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const body = isLogin
                ? {
                    email: formData.email,
                    password: formData.password,
                }
                : {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });


            const data = await response.json();

            if(!response.ok){
                alert(data.error || 'Something went wrong');
                setLoading(false);
                return;
            }

            //JWT TOKEN KO STORE KRNA

            if (data.token){
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                alert(isLogin? 'Login Succesful' : 'Account created ');
                

                //Yahan PAR HAVE TO ADD THE LOGIN SO THAT IF IT IS A ADMIN THEN HE CAN GET THE OPTION TO SEE THE DASHBOARD

                // if (data.user.role === 'admin'|| data.user.role === 'client') {
                //     router.push('/dashboard');
                // } else {
                //     router.push('/');
                // }
            }
        }
        catch (error){
            console.error('Auth Error', error);
            alert("Network error. please check if the server is running");
        } finally{
        setLoading(false);
        }
    };


const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({name:'', email:'',password:'',confirmPassword:''});
};


const slidingPanelClass = isLogin 
    ? 'translate-x-0' 
    : 'translate-x-full';
  
  const loginFormClass = isLogin 
    ? 'opacity-100 pointer-events-auto' 
    : 'opacity-0 pointer-events-none';
  
  const signupFormClass = isLogin 
    ? 'opacity-0 pointer-events-none' 
    : 'opacity-100 pointer-events-auto';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-400 to-black p-4">
      <div className="relative w-full max-w-4xl h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Sliding Overlay Panel */}
        <div className={`absolute top-0 h-full w-1/2 bg-gradient-to-br from-black to-green-600 transition-transform duration-700 ease-in-out z-20 flex items-center justify-center ${slidingPanelClass}`}>
          <div className="text-center px-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              {isLogin ? 'Hello, Friend!' : 'Welcome Back!'}
            </h2>
            <p className="mb-8 opacity-90">
              {isLogin
                ? 'Enter your personal details and start your journey with us'
                : 'To keep connected with us please login with your personal info'}
            </p>
            <button
              type="button"
              onClick={toggleMode}
              className="px-10 py-3 border-2 border-white rounded-full font-semibold text-white hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>

        <div className="h-full">
          
          {/* Login Form - Right Side */}
          <div className={`absolute top-0 right-0 h-full w-1/2 flex items-center justify-center transition-opacity duration-500 ${loginFormClass}`}>
            <div className="w-full px-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
              <p className="text-gray-600 mb-8">Use your account</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-800 placeholder:text-gray-500"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-800 placeholder:text-gray-500"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-black text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </div>
          </div>

          {/* Signup Form - Left Side */}
          <div className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center transition-opacity duration-500 ${signupFormClass}`}>
            <div className="w-full px-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-600 mb-6">Sign up to get started</p>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-800 placeholder:text-gray-500"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-800 placeholder:text-gray-500"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-800 placeholder:text-gray-500"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-800 placeholder:text-gray-500"
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-black text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};