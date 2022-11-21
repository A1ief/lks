import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
   const [name, SetName] = useState("");
   const [email, SetEmail] = useState("");
   const [password, SetPassword] = useState("");
   const [passwordConfirmation, SetPasswordConfirmation] = useState("");

   //validation
   const [validation, SetValidation] = useState([]);

   const navigate = useNavigate();

   useEffect(() =>{
      if(localStorage.getItem('token')){
         navigate('/home')
      }
      },[])

   const registerHandler = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirmation);

      await axios
         .post("http://127.0.0.1:8000/api/auth/register", formData)
         .then(() => {
            navigate("/");
         })
         .catch((error) => {
            console.log(error.response.data);
            SetValidation(error.response.data);
         });
   };

   return (
      <div>
         <div className=" pt-4 pt-sm-3 pb-4 pb-sm-5">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-xxl-4 col-md-6">
                     <div className="card shadow">
                        <div className="card-header pt-4 text-center bg-primary">
                           <div className="text-center w-75 m-auto">
                              <h4 className="text-white text-center pb-0 fw-bold">Register</h4>
                              <p className="text-white mb-4">Don't have an account? Create your account, it takes less than a minute</p>
                           </div>
                        </div>
                        <div className="card-body">
                           <form onSubmit={registerHandler}>
                              <div className="mb-3">
                                 <label htmlFor="name" className="form-label">
                                    Name
                                 </label>
                                 <input className="form-control" type="text" id="name" value={name} onChange={(e) => SetName(e.target.value)} placeholder="Example" />
                                 {validation.name && <small className="text-danger">{validation.name[0]}</small>}
                              </div>
                              <div className="mb-3">
                                 <label htmlFor="email" className="form-label">
                                    Email address
                                 </label>
                                 <input className="form-control" type="email" id="email" value={email} onChange={(e) => SetEmail(e.target.value)} placeholder="example@gmail.com" />
                                 {validation.email && <small className="text-danger">{validation.email[0]}</small>}
                              </div>
                              <div className="mb-3">
                                 <label htmlFor="password" className="form-label">
                                    Password
                                 </label>
                                 <div className="input-group input-group-merge">
                                    <input type="password" id="password" value={password} onChange={(e) => SetPassword(e.target.value)} className="form-control" placeholder="********" />
                                 </div>
                                 {validation.password && <small className="text-danger">{validation.password[0]}</small>}
                              </div>
                              <div className="mb-3">
                                 <label htmlFor="passwordConfirmation" className="form-label">
                                    Password confirm
                                 </label>
                                 <div className="input-group input-group-merge">
                                    <input
                                       type="password"
                                       id="password_confirmation"
                                       value={passwordConfirmation}
                                       onChange={(e) => SetPasswordConfirmation(e.target.value)}
                                       className="form-control"
                                       placeholder="********"
                                    />
                                 </div>
                              </div>

                              <div className="mb-3 mb-0 pt-1 text-end">
                                 <button className="btn btn-primary" type="submit">
                                    {" "}
                                    Submit{" "}
                                 </button>
                              </div>
                           </form>
                        </div>{" "}
                        {/* end card-body */}
                     </div>
                     {/* end card */}
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

export default Register;
