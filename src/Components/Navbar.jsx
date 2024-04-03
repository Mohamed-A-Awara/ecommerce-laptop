import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Styles/Navbar.style.css"
import { IoCartSharp } from "react-icons/io5";
import { Button } from 'react-bootstrap';
import { CiLogin } from "react-icons/ci";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";

function Header( { cartCount , setCartCount , cartItems} ) {
    const [loggedin , setLoggedin] = useState(false)
    const counter = useRef()

    const handleLogOut = ()=>{
        localStorage.removeItem('loginUser')
        localStorage.removeItem('Cart')
        localStorage.removeItem('Favorites')
        setLoggedin(false)
    }

    useEffect(()=>{
        const loggedin = localStorage.getItem('loginUser')
        setLoggedin(loggedin)
    } , [])

    useEffect(()=>{
        const countItem = cartItems.reduce((num , item ) => num + item.qty , 0)
        setCartCount(countItem) 

    } , [ cartItems ])



    return (
        // Start desgin
        <>
            <nav className='navbar navbar-expand-lg  navbar-style bg-dark'>
                <div className='container-fluid'>
                    <img src={require('../Imgs/logo.png')} alt="logo" className='logo'/>


                    {/* Responsive Button */}
                    <button className="navbar-toggler btn-responsive collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="toggler-icon top-bar"></span>
                    <span className="toggler-icon middle-bar"></span>
                    <span className="toggler-icon bottom-bar"></span>
                    </button>


                    <div className="collapse navbar-collapse small-style" id="navbarSupportedContent">
                        <ul className={`navbar-nav  mb-2 mb-lg-0 ${loggedin === "UserAdded" ? "me-auto" : "m-auto"}`}>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/products">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/products">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/products">Contact Us</a>
                            </li>
                        </ul>
                    <div>                      
                        
                        {!loggedin ? (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-btns ">
                                <li className="nav-item me-3">
                                    <Button variant='outline-secondary' href='/login' className='sm-sty'>
                                        <span> <CiLogin/> Login</span>
                                    </Button>
                                </li>
                                <li className="nav-item ml-2">
                                    <Button variant='outline-success' href='/Register' className=''>
                                    <span><IoPersonAddSharp/> Register </span>
                                    </Button>
                                </li>
                                
                            </ul>
                            
                        ) : loggedin === "UserAdded"? (
                            <ul className="navbar-nav me-auto  mb-lg-0  loginStyle">

                                <li className="nav-item  ">
                                    <p className="text-capitalize text-white pt-3 me-3" >
                                        <span><FaUser /> {localStorage.getItem('username')} </span>  
                                    </p>
                                </li>
                                <li className="nav-item">
                                    <Button variant='outline-primary'  href="/Favorites" className='p-2'>
                                        <span><FaHeart className='text-danger'/> Favorite </span>
                                    </Button>
                                </li>
                                <div className="cart-container">
                                    <li className="nav-item">
                                        <Button variant='outline-primary' className="mx-3 p-2 sm-view-mar" href="/cart" style={{width : "125px"}}>
                                            <span><IoCartSharp style={{fontSize : "20px"}}/>  Cart 
                                            <span ref={counter} style={{display: cartCount === 0 ? 'none' : 'inline'}}> : {cartCount}</span>
                                            </span> 
                                        </Button>
                                    </li>
                                    {/* <span ref={counter} className="cartCounter text-light" style={{ display: cartCount === 0 ? 'none' : 'block' }}>{cartCount}</span> */}
                                </div>

                                <li className="nav-item">
                                    <Button variant='outline-danger' className="logoutStyle p-2" onClick={ handleLogOut }  >
                                        <span><CgLogOut/> Logout</span>
                                    </Button>
                                </li>
                            </ul>
                        ) : (<h1>No User</h1>) 
                        }
                    </div>
                    </div>
                </div>
            </nav>
        </>
        // End Design
    )
}

export default Header