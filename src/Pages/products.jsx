import React, { useRef } from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap'
import "../Styles/products.style.css"
import { ProductElement } from '../DB/Product.DB'
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Products({cartItems , favItems , setCartItem , setFavItems }) {

    const navigate = useNavigate()
    const heartRef = useRef([])
    
    const addToCart = (id)=>{
        let user = localStorage.getItem('loginUser')
        if (user){
            const product = ProductElement.find((ele) => ele.id === id)
            if (product){
                const foundItem = cartItems.find((item)=> item.id === id)
                if (foundItem ){
                    foundItem.qty += 1
                    setCartItem([...cartItems])
                }
                else {
                    product.qty = 1 
                    setCartItem(prev => [...prev ,product ])
                }
            }

            
        }
        else {
            navigate('/login')
            window.scrollTo(0,0)
        }
    }

    const addToFav = (id)=>{
        let user = localStorage.getItem('loginUser')
        if (user){
            const product = ProductElement.find((ele)=> ele.id === id)
            if (product){
                const heartFav = heartRef.current[id -1]
                const foundItem = favItems.find((item)=> item.id === id)
                if (foundItem){
                    heartFav.style.color = 'rgb(161,16,161)'
                    setFavItems(prev => prev.filter(ele => ele.id !== id ))
                }
                else {
                    heartFav.style.color = 'red'
                    setFavItems(prev => [...prev , product])
                }
            }
        }
        else {
            navigate('/login')
            window.scrollTo(0,0)
        }
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
                    <h1 className='w-100 text-center p-4 '>Our Products </h1>
                    <hr className='line'/>
                </Container>
            </section>

            <section className='products-data'  >
                <Container>
                    <Row className='d-flex justify-content-around  m-auto '>
                        {
                            ProductElement.map((item , index)=>(
                                <Card className='my-3 prod-crd  ' style={{width : "19rem"}} key={index}>
                                    <button className='heart-icon' onClick={()=> addToFav(item.id) } ref={heart => heartRef.current[index] = heart}>
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
                                                addToCart(item.id) 
                                                notify()
                                        
                                            }  
                                        }

                                        >
                                            Add to cart
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

export default Products

