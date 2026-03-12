import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {

  const [form, setForm] = useState({
    email: "",
    password: "",
    passkey: ""
  });

  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault()

    try{

      const res = await fetch(
        "https://truhome-backend-8.onrender.com/admin/login",
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(form)
        }
      )

      const data = await res.json()

      if(res.ok){

        alert("Admin login success")

        // store token
        localStorage.setItem("token", data.token)

        // mark admin logged in
        localStorage.setItem("adminLoggedIn","true")

        onLogin(true)

      }else{
        alert(data.message)
      }

    }catch(error){
      console.error(error)
      alert("Server error")
    }
  }

  return(
    <form onSubmit={handleSubmit}>

      <h2>Admin Login</h2>

      <input
      name="email"
      placeholder="Email"
      onChange={handleChange}
      required
      />

      <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      required
      />

      <input
      name="passkey"
      placeholder="Passkey"
      onChange={handleChange}
      required
      />

      <button type="submit">Login</button>

    </form>
  )
}