import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

function Home() {
   const [user, setUser] = useState({});

   const navigate = useNavigate();

   const token = localStorage.getItem("token");

   const fetchData = async () => {
      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
      await axios.post("http://127.0.0.1:8000/api/auth/me").then((response) => {
         setUser(response.data);
      });
   };
   

   useEffect(() => {
      if (!token) {
         navigate("/");
      }
      fetchData();
   }, []);

   const logoutHandler = async () => {
      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
      await axios.post("http://127.0.0.1:8000/api/auth/logout").then(() => {
         localStorage.removeItem("token");
         navigate("/");
      });
   };

   return (
      <div>
         <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
            <div className="container">
               <a className="navbar-brand" href="">
                  Player <span className="text-warning">football </span>
               </a>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
               </button>
               <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                     <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="">
                           Profile player
                        </a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="">
                           List player
                        </a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="">
                           Data player
                        </a>
                     </li>
                     <Button variant="secondary" onClick={logoutHandler}>
                        logout
                     </Button>{" "}
                  </ul>
               </div>
            </div>
         </nav>
         <div className="row">
         <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEheDziZB0w3-93ju0uU-vH1SuKzKJK6NE7cX7JAzXvihnonHq9CxP_NTz-UkAFAwBJ1mgyuMg726Utb0nouE7QcoXUv_iT6DqqDEJtQdvZI6bAmV2fy1YtZEMmcxNJWuw0BI4MFAraMouznlzjsLbvnCT7I4Br_4CXT05y0ZK_KiKieh4rT5qeh1gax/s564/pp%20wa%20kosong-18.jpg"
            className="rounded-circle mx-auto align-center d-flex" style={{ width: "500px"}}
            alt="...."
         />
         </div>
         
      </div>
   );
}

export default Home;
