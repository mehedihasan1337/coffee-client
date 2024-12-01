import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';


const SignUp = () => {

  const { createUser } = useContext(AuthContext)
  const handleSignUp = e => {
    e.preventDefault()

    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    console.log('form sign up', email, password)
    createUser(email, password, name)
      .then(result => {
        console.log('user created at fb',result.user)
        const createAt = result?. user?.metadata?.creationTime
        const newUser={name,email, createAt}
        fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body:JSON.stringify(newUser)
        })
          .then(res => res.json())
          .then (data => {
             if(data.insertedId){
              console.log('user created to db')
             }
          })
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  return (
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login now!</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignUp} class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input type="text" placeholder="name" name='name' class="input input-bordered" required />
            </div>
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
              <button class="btn btn-primary">Login</button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;