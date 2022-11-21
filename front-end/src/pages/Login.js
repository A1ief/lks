import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
   const [email, SetEmail] = useState("");
   const [password, SetPassword] = useState("");

   const [validation, SetValidation] = useState([]);

   const navigate = useNavigate();

   useEffect(() =>{
      if(localStorage.getItem('token')){
         navigate('/home')
      }
      },[])

   const loginHandler = async (e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);

      await axios
         .post("http://127.0.0.1:8000/api/auth/login", formData)
         .then((response) => {
            console.log(response.data.access_token);
            localStorage.setItem("token", response.data.access_token);

            navigate("/home");
         })
         .catch((error) => {
            console.log(error.response.data);
            SetValidation(error.response.data);
         });
   };

   return (
      <div>
         <div className="account-pages pt-5 mt-3 pt-sm-5 pb-4 pb-sm-5">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-xxl-4 col-md-6">
                     <div className="card shadow">
                        {/* Logo */}
                        <div className="card-header pt-4 text-center bg-primary">
                           <div className="text-center w-75 m-auto">
                              <h4 className="text-white text-center pb-0 fw-bold">Login</h4>
                              <p className="text-white mb-4">Enter your email and password to access</p>
                           </div>
                        </div>
                        <div className="card-body">
                           {validation.error && (
                              <div className="alert alert-danger text-center" role="alert">
                                 {validation.error}
                              </div>
                           )}
                           <form onSubmit={loginHandler}>
                              <div className="mb-3 ">
                                 <label htmlFor="emailaddress" className="form-label">
                                    Email address
                                 </label>
                                 <input className="form-control" type="email" id="email" value={email} onChange={(e) => SetEmail(e.target.value)} required placeholder="Enter your email" />
                                 {validation.email && <small className="text-danger">{validation.email[0]}</small>}
                              </div>
                              <div className="mb-3 pt-2">
                                 <label htmlFor="password" className="form-label">
                                    Password
                                 </label>
                                 <div className="input-group input-group-merge">
                                    <input type="password" id="password" value={password} onChange={(e) => SetPassword(e.target.value)} className="form-control" placeholder="Enter your password" />
                                 </div>
                                 {validation.password && <small className="text-danger">{validation.password[0]}</small>}
                              </div>
                              <div className="mb-3 mb-0 pt-1 text-end">
                                 <button className="btn btn-primary" type="submit">
                                    {" "}
                                    Log In{" "}
                                 </button>
                              </div>
                           </form>
                        </div>{" "}
                        {/* end card-body */}
                     </div>
                     {/* end card */}
                     <div className="row mt-3">
                        <div className="col-12 text-center">
                           <p className="text-muted">
                              Don't have an account?
                              <a href="pages-register.html" className="text-muted ms-1 text-decoration-none">
                                 <b>Register</b>
                              </a>
                           </p>
                        </div>{" "}
                        {/* end col */}
                     </div>
                     {/* end row */}
                  </div>{" "}
                  {/* end col */}
               </div>
               {/* end row */}
            </div>
            {/* end container */}
         </div>
         {/* bundle */}
      </div>
   );
}

export default Login;
