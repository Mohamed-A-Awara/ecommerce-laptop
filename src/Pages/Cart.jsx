import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import "../Styles/Cart.style.css"
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

function Cart({cartItems , setCartItem }) {
    
  const [totalPrice , setTotalPrice] = useState(0)

  const total = useRef()

  const addMore = (id)=>{
    const index = cartItems.findIndex((idx)=> idx.id === id)
    if (index !== -1){
      const updateData = [...cartItems]
      updateData[index] = {
        ...updateData[index],
        qty : updateData[index].qty +1,
      }
      setCartItem(updateData)
    }
  }
  const addLess = (id)=>{
    const index = cartItems.findIndex((idx)=> idx.id === id)
    if (index !== -1){

        if(cartItems[index].qty !==1){
          const updataData = [...cartItems]
          updataData[index] ={
            ...updataData[index],
            qty : updataData[index].qty -1 
          }
          setCartItem(updataData)
        }
        else {
          const updateData = cartItems.filter((item) => item.id !==  id)
          setCartItem(updateData)
        }

      }
    }
  

  const removeProduct = (id)=>{
    const updateData = cartItems.filter((item )=> item.id !== id)
    setCartItem(updateData)
  }

  useEffect(()=>{
    const SetTotal = cartItems.reduce((total , item) => total + (item.price * item.qty) , 0)
    setTotalPrice(SetTotal)

  } , [cartItems])

  return (
    <>
      <Container style={{minHeight : "50vh"}}>
        <Row className='d-flex justify-content-evenly m-auto mt-5'> 
          {
            cartItems.map((item)=> (
              <Col lg='5' md='12' className='  mb-4' style={{minHeight:"250px" }}>
                <Card style={{height: "100%" , width :"100%"}} className='cart-parent'>
                  <div className='cart-img'>
                    <Card.Img src={require(`../${item.image}`)}  className='img-thumbnail' />
                  </div>

                  <div className='cart-content ms-2 '>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text className='text-muted'>{item.specs}</Card.Text>
                      <Card.Title style={{fontSize : "22px" , fontWeight: "700"}}>$ {item.price}</Card.Title>
                      <div className='w-50  d-flex justify-content-between align-content-center mt-3' style={{height : "40px"}}>
                        <Button variant='danger' className='qty-icon' onClick={()=> addLess(item.id)}> <FiMinus/> </Button>
                        <Card.Text style={{fontSize : "20px" , fontWeight : "800" , textAlign : "center"}}> {item.qty} </Card.Text>
                        <Button variant='success' className='qty-icon' onClick={()=> addMore(item.id)}> <FaPlus/> </Button>
                      </div>
                    </Card.Body>
                    <Card.Footer style={{background : "none"}}>
                      <Button variant='danger' className='w-100 mt-2 mb-2 p-2' onClick={()=> removeProduct(item.id)} >Remove</Button>
                    </Card.Footer>
                  </div>
                </Card>
              </Col>
            ))
          }
        </Row>
        <div>
          <h1 className='text-center text-success mt-4' style={{fontWeight:"700"}}>Total Price is : {totalPrice} <span ref={total}></span></h1>
        </div>
      </Container>
    </>
  )
}

export default Cart