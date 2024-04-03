import React from 'react'
import "../Styles/Home.style.css"
import { useNavigate } from 'react-router-dom';
import {  HomeData, ProductsDate } from '../DB/Product.DB';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';


// Imports Swiper Lab
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



function Home() {
    // const smallScreen = window.matchMedia("(max-width: 991px)").matches;
    const navigate = useNavigate()
  return (
    
    <>
      {/* Start Main Section */}
        <main className='main-style'>
          
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
          >
            {
              HomeData.map((item) => (
                <SwiperSlide className='main-content'>
                <div className='design2'></div>
                  <Row style={{zIndex : 1000000}}>
                      <Col lg='6' md='10' className=' main-content-data  '>
                        <h1 className='text-dark'>{item.name} Laptop</h1>
                        <h2>{item.brand} </h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, quas.</p>
                        <Button variant='outline-primary' onClick={()=> navigate('/products')}> View Product</Button>
                        
                      </Col>
                      <Col lg='6' md='10' className='main-content-img'>
                        <img src={require(`../${item.imgLink}`)} alt="" />
                        <div className='design'></div>
                      </Col>
                  </Row>  
              </SwiperSlide>
              ))
            }

            {/* <SwiperSlide>Slide 2</SwiperSlide> */}
          </Swiper>
        </main>
      {/* End Main Section */}

      <section className='best-products'>
      <h2 className='p-5 text-center '>Best Products</h2>
      <div className='best-products-content'>
        <Container>
          <Row>
            
            {
              ProductsDate.map((item )=> (
                <Col lg='3' md='6' sm='10' className='mb-3 '>
                <Card style={{height : "50vh"}} className='best-cards'>
                  <Card.Img variant='top' src={require(`../${item.image1}`)} style={{height : "55%"}}></Card.Img>
                  <Card.Body>
                    <Card.Title style={{fontSize : "18px" , fontWeight : "800"}}>{item.title}</Card.Title>
                    <Card.Text style={{fontSize :"16px"}}>{item.specs}</Card.Text>
                  </Card.Body>
                  <Card.Footer className=''>
                    <Button variant='outline-success' onClick={()=> navigate('/products')} className='w-100'>Show Product</Button>
                  </Card.Footer>
                </Card>
            </Col>
              ))
            }
          </Row>
        </Container>
      </div>
      </section>
      <hr />
        
        
    </>
  )
}

export default Home

