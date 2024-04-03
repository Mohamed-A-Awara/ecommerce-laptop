import React, { useRef, useState } from 'react'
import '../Styles/Register.style.css'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const [error , setError ] = useState("")

    const toLogin = useNavigate()
    function handleRegister (){
        if (! username.current.value || !password.current.value || ! email.current.value || ! confirmPassword.current.value){
            setError('Please Complete your Data ...😊')
        } 
        else if ( password.current.value !== confirmPassword.current.value){
            setError('Password Not Matched ...🤦‍♂️')
        }
        else {
            localStorage.setItem('username' , username.current.value)
            localStorage.setItem('email' , email.current.value)
            localStorage.setItem('password' , password.current.value)
            setError("")
            toLogin('/login')
        }
    }

    return (

        <>
            
            <section className='container register-style'>
                <div className='parent'>
                    <Card className='w-75'>
                        <Card.Body>
                            <h2 className='w-100 text-center text-primary'>Register</h2>
                            <Form onSubmit={()=> handleRegister()}>
                                {error && <Alert variant='danger' >{error} </Alert> }
                                <div className='w-100'>
                                <div className='labelIcon'>
                                    <FaUser className='icon'/>
                                    <Form.Label htmlFor='name'>  Enter Your Name : </Form.Label>
                                </div>
                                <Form.Control type='text' placeholder='Mohamed' ref={username} name='name'/> 
                                </div>
                                <div className='w-100 mt-2'>
                                <div className='labelIcon'>
                                    <MdEmail className='icon'/>
                                    <Form.Label htmlFor='email'>  Enter Your Email : </Form.Label>
                                </div>
                                <Form.Control type='text' placeholder='mohamed@gmail.com' ref={email} name='email'/> 
                                </div>
                                <div className='w-100 mt-2' >
                                <div className='labelIcon'>
                                    <RiLockPasswordFill className='icon'/>
                                    <Form.Label htmlFor='pass'>  Enter Your Password : </Form.Label>
                                </div>
                                <Form.Control type='password' placeholder='' ref={password} name='pass'/> 
                                </div>
                                <div className='w-100 mt-2'>
                                <div className='labelIcon'>
                                    <RiLockPasswordFill className='icon'/>
                                    <Form.Label htmlFor='Cpass'>  Confirm Your Password : </Form.Label>
                                </div>                                
                                <Form.Control type='password'  ref={confirmPassword} name='Cpass'/> 
                                </div>
                                <Button variant='outline-success' className=' w-100 mt-5' onClick={()=> handleRegister() }>Register</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-3'  >
                        <p>
                            Already have an account ! <a href="/login"  style={{textDecoration : "none" }} > Login </a>
                        </p>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Register


