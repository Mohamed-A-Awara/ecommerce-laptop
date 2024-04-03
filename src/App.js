import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router  , Routes , Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Header from './Components/Navbar'
import Products from './Pages/products'
import './App.css'

// Lab Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Cart from './Pages/Cart'
import Fav from './Pages/Fav'

function App() {

  const [cartCount , setCartCount] = useState(0)

  const [cartItems , setCartItem] = useState(()=>{
    const storedItem = localStorage.getItem('Cart') 
    return storedItem  ? JSON.parse(storedItem) : []
  })

  const [favItems , setFavItems ] = useState(()=>{
    const storedFav = localStorage.getItem('Favorites')
    return storedFav ? [].concat(JSON.parse(storedFav)) : []
  })


  useEffect (()=>{
    localStorage.setItem('Cart' , JSON.stringify(cartItems))
  } , [cartItems])

  useEffect(()=>{
    localStorage.setItem('Favorites' , JSON.stringify(favItems))
  } , [favItems])


  return (
    <>
        <Header cartCount={cartCount} setCartCount={setCartCount} cartItems={cartItems}/> 
        <Router>
          <Routes>
            <Route index element={<Home/>} /> 
            <Route path='/' element={<Home/>} /> 
            <Route path='/home' element={<Home/>} /> 
            <Route path='/login' element={<Login/>} /> 
            <Route path='/register' element={<Register/>} /> 
            <Route path='/cart' element={<Cart cartItems={cartItems} setCartItem={setCartItem} cartCount ={cartCount} setCartCount={setCartCount} />} /> 
            <Route path='/products' element={<Products cartItems={cartItems} favItems={favItems} setCartItem={setCartItem} setFavItems={setFavItems}  cartCount ={cartCount} setCartCount={setCartCount} />} /> 
            <Route path='/Favorites' element={<Fav cartItems={cartItems} setCartItem={setCartItem} favItems={favItems} setFavItems={setFavItems} cartCount={cartCount} setCartCount={setCartCount}  />}  /> 
          </Routes>
        </Router>
    </>
  )
}

export default App