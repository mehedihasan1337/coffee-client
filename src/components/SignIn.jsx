import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { data } from 'autoprefixer';
import { Link } from 'react-router-dom';

const SignIn = () => {
 const {signInUser}= useContext(AuthContext)
    const handleSignIn= e=>{
        e.preventDefault()

        
        const email = e.target.email.value
        const password = e.target.password.value
        console.log( email, password)
        signInUser(email, password)
        .then(result => {
          console.log(result.user)
        //   update last login time
        const lastSignInTime = result?.user?.metadata?.lastSignInTime
        const loginInfo = {email, lastSignInTime}
        fetch(`http://localhost:5000/users`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(loginInfo)
        })
        .then(res=> res.json())
        .then(data=>{
            console.log('sign in info update', data)
        })
        })
        .catch(error => {
          console.log(error)
        })
    }
    return (
        <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Sign In now!</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} class="card-body">
            
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" name='email' class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" name='password' class="input input-bordered" required />
              <label class="label">
                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary">Sign In</button>
            </div>
            <p>New to coffee drinker: <Link className='text-sky-600' to="/signup">Sign up</Link></p>
          </form>
        </div>
      </div>
    </div>
    );
};

export default SignIn;