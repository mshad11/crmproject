import React, { useState } from 'react'
import {Dropdown, DropdownButton } from 'react-bootstrap';
import { userSignin, userSignup } from '../api/Auth';


function Login() {
  const [signUp, setshowsignUp] = useState(false);
  const [userType, setuserType] = useState("CUSTOMER");
  const [userSignupData, setUserSignupData] = useState({});
  const [message, setMessage] = useState(""); 
  const toggleSignUp = () => {
    setshowsignUp(!signUp);
  };
    
      //for Dropdown button
  
   const handleSelect = (e) => {setuserType(e)}


   //for fetching data from user and giving it to api
   //const[userSignupData, setuserSignupData] = useState({}) // I put inside it empty object and want 
                                                            //want to put everything data in it
   //step1: grab and update the data when user click on the input box
   // for that we use setuserSignupData on every single input box
   // and we use it in the below function

      const updateSignupData = (e) => {
     userSignupData[e.target.id] = e.target.value //e.target.id will be key of tht input box & e.target.value its value 
     console.log(userSignupData);                 // [] means user index
   }
   //i am calling this fn on every input box


   const signupFn = (e) => {
    const username = userSignupData.username;
    const userId = userSignupData.userId;
    const email = userSignupData.email;
    const password = userSignupData.password;
   
   //sending data
   const data = {
     name: username,
     userId: userId,
     email: email,
     password: password,
     userType: userType 
     
   }
    console.log('Data',data)

   e.preventDefault()


   //userSignup is api function in auth.js which takes data and send tht to url
   //we want to do this with tht response
   userSignup(data).then(function(response){
   if(response.status == 201){
     window.location.href = '/'
    }
   })
   .catch(function(error){
     if(error.response.status == 400){
      setMessage(error.response.data.message)
     }
     else{
       console.log(error)
     }

   }
   
   )}

   const  loginFn = (e) =>{
   const userId = document.getElementById('userId').value
   const password = document.getElementById('password').value  
    
    const data = {
     userId:userId,
     password:password,

   }
    console.log('DATA',data)
    e.preventDefault()

    //fetching the login api from auth.js
    userSignin(data).then(function(response){
      console.log(response)
     if(response.status === 200){
       localStorage.setItem('name', response.data.name);
       localStorage.setItem('userId' , response.data.userId);
       localStorage.setItem('email', response.data.email)
     }
      if(response.userType === "CUSTOMER"){
        window.location.href = "/customer"
      }
    }).catch(function(error){
      if(error.response.status=== 401){
        setMessage(error.response.data.message)
      }
      else{console.log(error)}
    })



   } 
  










  return (
    <div className='bg-primary d-flex justify-content-center align-items-center vh-100'>
        <div className='card m-5 p-5'>
        {!signUp ? 
        (<div className='login'>
            <h3>Welocome To CRM </h3>
            <h4>Login Page</h4>
            
                 <form onSubmit={loginFn}>
                 <div className='input-group'>
                 <input type='text' className='form-control p-1 m-1' placeholder='User ID' id='userId'/>
                 </div>

                 <div className='input-group'>
                 <input type='password' className='form-control p-1 m-1' placeholder='Password' id='password'/>
                 </div>

                 <div className='input-group'>
                 <input type= 'submit'  className='form-control p-1 m-1 btn btn-primary' value= 'Login'/>
                     </div>

                 <div className='text text-center text-info' onClick={toggleSignUp}>Not a user? SignUp Now </div>
                 
                 </form>

            

            </div>) 
                 :
        (<div className='signUp '>
           
                <h4>Welcome To CRM</h4>
                <h5>Please signUp</h5>
                
                <form onSubmit={signupFn}>
                 
                 <input type='text' className='form-control p-1 m-1' placeholder='User ID' id = 'userid' onChange={updateSignupData}/>
                 

                
                 <input type='text' className='form-control p-1 m-1' placeholder='Username' id = 'username' onChange={updateSignupData}/>
            

                
                 <input type='email' className='form-control p-1 m-1' placeholder='Email' id='email' onChange={updateSignupData} />
                  

                 
                 <input type='password' className='form-control p-1 m-1' placeholder='Password' id='password' onChange={updateSignupData} />
                

                 <div className='input-group'>
                 <span className='text-muted m-1 p-1'>User Type</span>
                 <DropdownButton
                 align = 'end'
                 title = {userType}
                 onSelect = {handleSelect}
                 variant = 'light'
                 className = 'mx-1'>
                   <Dropdown.Item eventKey= "CUSTOMER">CUSTOMER</Dropdown.Item>
                   <Dropdown.Item eventKey= "ENGINEER">ENGINEER</Dropdown.Item>
                 </DropdownButton> 
                 
                 </div>



                 <div className='input-group'>
                 <input type= 'submit'  className='form-control p-1 m-1 btn btn-primary' value= 'Signup'/>
                     </div>

                 <div className='text text-center text-info' onClick={toggleSignUp}>Already Registered? Login </div>
                 <div className='text'>{message}</div>
                 </form>
            
          </div>)}
        </div>
      
      

    </div>
  )
}

export default Login;
