import React from "react";
//import './LoginSuccess.css';

function LoginSuccess() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-3 text-center mt-2">Login Successful.....</h1>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ62GQBvufgsdN8loqI-Mq2HH7ZBSyhSODkw&s"
        alt="Success"
        className="img-fluid mt-4"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}

export default LoginSuccess;
