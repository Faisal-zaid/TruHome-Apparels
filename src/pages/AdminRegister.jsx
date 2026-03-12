import React,{useState} from "react"

export default function AdminRegister(){

const [form,setForm]=useState({
firstName:"",
lastName:"",
email:"",
password:"",
confirmPassword:""
})

function handleChange(e){
setForm({...form,[e.target.name]:e.target.value})
}

async function handleSubmit(e){

e.preventDefault()

const res = await fetch(
"https://truhome-backend-8.onrender.com/admin/register",
{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(form)
}
)

const data = await res.json()

alert(data.message)
}

return(

<form onSubmit={handleSubmit}>

<h2>Admin Register</h2>

<input name="firstName" placeholder="First Name" onChange={handleChange} required/>

<input name="lastName" placeholder="Last Name" onChange={handleChange} required/>

<input name="email" placeholder="Email" onChange={handleChange} required/>

<input type="password" name="password" placeholder="Password" onChange={handleChange} required/>

<input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/>

<button type="submit">Register</button>

</form>

)

}