import Image from 'next/image';
import {useState, useEffect} from "react";
import {useRouter} from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { serverHost, registerUser, cookieTest } from '../pages/api/utils';
import { useCookies } from "react-cookie"

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function SignIn() {
    
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["access_token"])
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const body = {
        username,
        password,
    }

    
    const handleSubmit = async (e: any) => {
        const url = `${serverHost}${registerUser}`;
        e.preventDefault();

        console.log(body)
        // try {
        //     const response = await authAPI.login(body);
        //     console.log(response);
        //     const cookies = response.headers["set-cookie"];
        //     console.log("Cookie:"+cookies);
        // } catch (err) {
        //     console.error(err);
        // }
        try{
            const response = await fetch(url, {
                body: new URLSearchParams(body),
                credentials: 'include',
                // mode:  'cors',
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: 'POST',
                });           
            const data = await response.json();
            console.log(data)
            if (response.status != 200){
                router.push('/')
                toast(`${JSON.stringify(data['detail'])}`, { hideProgressBar: false, autoClose: 5000, type: 'error' })
            }else{
                router.push('/register')
                // setCookie("access_token", data['access_token'], {
                //   path: "/",
                //   maxAge: 3600, // Expires after 1hr
                //   sameSite: true,
                // })
                toast('Success', { hideProgressBar: false, autoClose: 5000, type: 'success' })
            }
        } catch (err) {
            router.push('/')
            toast('Failed to fetch!', { hideProgressBar: false, autoClose: 5000, type: 'error' })
        }
    
    }
    
    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="relative w-24 h-24 mx-auto ">
                <Image
                className="rounded-full"
                src="/cat1.jpg"
                alt="Your Company"
                layout="fill" 
                />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign Up
              </a>
            </p>
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {/* <form className="space-y-6" action="/sign-in-please" method="POST"> */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      onChange={e => setUsername(e.target.value)}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={e => setPassword(e.target.value)}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
  
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
          <ToastContainer />
        </div>
    )
  }