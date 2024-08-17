import React, { useEffect, useState } from 'react'
import "./Cars.css"
import axios from 'axios'
const Cars = () => {
    const [cars,setCars] = useState([]);
    const [brands,setBrands] = useState([]);
    const [categories,setCategories] = useState([]);
    const [lacotions,setLocations] = useState([]);
    const getCars = () =>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cars')
        .then(res=>setCars(res.data.data))
        .catch(err=>console.log(err))
    }
    const getBarnds = () =>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cars')
        .then(res=>setCars(res.data.data))
        .catch(err=>console.log(err))
    }
    const getModles = () =>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cars')
        .then(res=>setCars(res.data.data))
        .catch(err=>console.log(err))
    }
    const getCategories = () =>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cars')
        .then(res=>setCars(res.data.data))
        .catch(err=>console.log(err))
    }
    const getLacotions = () =>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cars')
        .then(res=>setCars(res.data.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getCars()
    },[])
  return (
    <div className='cars'>
      <div className='container cars-container'>
        <ul className='cars-list'>
            <h1 className='cars-title'>Brand</h1>
            <h2 className='cars-title'>Model</h2>
            <h3 className='cars-title'>Categories</h3>
            <h4 className='cars-title'>Lacations</h4>
            <h5 className='cars-title'>Actions</h5>
        </ul>
        <ul>
            {
                cars && cars.map((item,index)=>(
                    <div key={index}>
                        {
                            item.brand && <h1>{item.brand}</h1>
                        }
                    </div>
                ))
            }
        </ul>
      </div>
    </div>
  )
}

export default Cars






