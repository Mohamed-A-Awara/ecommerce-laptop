import React from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap'
// import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Fav({cartItems , setCartItem , favItems , setFavItems}) {
    const moveToCart = (id)=>{
        const product = favItems.find((item)=> item.id === id)
        if (product){
            const cartProduct = cartItems.find((item)=> item.id === id)
            
            if (cartProduct){
                const updateData = cartItems.map((item)=> {
                    if (item.id === id){
                        return {
                            ...cartItems ,
                            qty : cartItems.qty +1
                        }
                    }
                    return cartItems
                })
                const updateFav = favItems.filter((favItem)=> favItem.id !== id)
                setCartItem(updateData)
                setFavItems(updateFav)
            }
            else {
                const updataData = [...cartItems , {...product , qty :1}]
                const updateFav = favItems.filter((item)=> item.id !== id)
                setCartItem(updataData)
                setFavItems(updateFav)
            }
        }
    }

    const removeItem = (id)=>{
        let product = favItems.filter((item)=> item.id !== id)
        setFavItems(product)
    }

    const notify = () => toast.success('Product Added To Cart ❤️', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
        });


    return (
        <>
            <section className='products-header'>
                <Container>
                    <h1 className='w-100 text-center p-4 '>Your Favorite Products </h1>
                    <hr className='line'/>
                </Container>
            </section>

            <section className='products-data'  >
                <Container>
                    <Row className='d-flex justify-content-around  m-auto '>
                        {
                            favItems.map((item , index)=>(
                                <Card className='my-3 prod-crd  ' style={{width : "19rem"}} key={index}>
                                    <button className='heart-icon' onClick={()=> removeItem(item.id)}>
                                        <FaHeart className={`favIcon ${favItems.find((ele)=>ele.id === item.id ) ? 'red-heart' : 'grey-heart'}`}  ></FaHeart>
                                    </button>
                                    <div className='img-wrapper' style={{height : "auto"}}>
                                        <Card.Img src={require(`../${item.image}`)} variant='top' /> 
                                        <Card.Img src={require(`../${item.image1}`)} variant='top' className='img-overlay'/> 
                                    </div>
                                    <Card.Body className='product-body' >
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>{item.specs}</Card.Text>
                                        <Card.Text style={{fontSize: "22px" , fontWeight : "700"}}>${item.price}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button className='btn btn-dark w-100 p-2 mt-2 mb-2' 
                                        onClick={()=> {
                                                moveToCart(item.id)
                                                notify()
                                            }  
                                        }

                                        >
                                            Move to cart
                                        </Button>
                                    </Card.Footer>
                                </Card>

                                
                            ))
                        }
                    </Row>
                </Container>
                <ToastContainer />
                        
            </section>
        </>
    )
}

export default Fav