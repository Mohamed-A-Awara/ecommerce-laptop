import React, { useRef, useState } from 'react'
import '../Styles/Register.style.css'
import { Alert, Button, Card, Form } from 'react-bootstrap'
// import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';



function Login() {
    const email = useRef()
    const password = useRef()
    const toHome = useNavigate()
    const [error , setError ] = useState()
    const handleSubmit = ()=>{
        let userEmail = localStorage.getItem('email')
        let userPass = localStorage.getItem('password')
        if (! email.current.value || !password.current.value){
            setError("Complete Your Login Data")
        }
        else if (email.current.value === userEmail && password.current.value === userPass) {
            localStorage.setItem('loginUser' , "UserAdded")
            setError("")
            toHome('/home')
        }
        else {
            setError("Invalid Email or Password !! ")
        }
    }
    return (
        <>
            <section className='container register-style'>
                <div className='parent'>
                    <Card className='w-75'>
                        <Card.Body>
                            <h2 className='w-100 text-center text-primary'>Login</h2>
                            <Form onSubmit={()=> handleSubmit()}>
                                {error && <Alert variant='danger' >{error} </Alert> }
                                <div className='w-100 mt-2'>
                                <div className='labelIcon'>
                                    <MdEmail className='icon'/>
                                    <Form.Label htmlFor='email'>  Enter Your Email : </Form.Label>
                                </div>
                                <Form.Control type='text' placeholder='' ref={email} name='email'/> 
                                </div>
                                <div className='w-100 mt-2' >
                                <div className='labelIcon'>
                                    <RiLockPasswordFill className='icon'/>
                                    <Form.Label htmlFor='pass'>  Enter Your Password : </Form.Label>
                                </div>
                                <Form.Control type='password' placeholder='' ref={password} name='pass'/> 
                                </div>
                                
                                <Button variant='outline-success' className=' w-100 mt-5' onClick={()=> handleSubmit() }>Login</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-3'  >
                        <p>
                            Create New Account !! <a href="/register"  style={{textDecoration : "none" }} > Register </a>
                        </p>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Login