import React, { useEffect, useState } from 'react';
import "./Cars.css";
import axios from 'axios';
import { message, Button } from 'antd';

const Model = () => {
    const [brandId, setBrandId] = useState('')
    const [modelId, setModelId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [locationId, setLocationId] = useState('')
    const [color, setColor] = useState('')
     

    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]); 
    const [models, setModels] = useState([]);
    const [categories,setCategories] = useState([]);
    const [locations,setLacations] = useState([]);
    const [name, setName] = useState('');
    const [brandid, setBrandid] = useState('');
    const [hover, setHover] = useState(null);

    const getCars = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cars')
            .then(res => setCars(res.data.data))
            .catch(err => console.error(err));
    };

    const getBrands = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
            .then(res => setBrands(res.data.data))
            .catch(err => console.error(err));
    };
    const getModels = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/models')
            .then(res => setModels(res.data.data))
            .catch(err => console.error(err));
    };
    const getCategories = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
            .then(res => setCategories(res.data.data))
            .catch(err => console.error(err));
    };
    const getLocations = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/locations')
            .then(res => setLacations(res.data.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getCars();
        getBrands();
        getModels();
        getCategories();
        getLocations();
    }, []);

    const addModel = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('color', color)
        formData.append('brand_id', brandId)
        formData.append('model_id', modelId)
        formData.append('category_id', categoryId)
        formData.append('location_id', locationId)

        const url = hover ? `https://autoapi.dezinfeksiyatashkent.uz/api/models/${hover.id}` : `https://autoapi.dezinfeksiyatashkent.uz/api/models`;
        const method = hover ? 'PUT' : 'POST';

        axios({
            url,
            method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: formData,
        })
        .then(res => {
            if (res.data.success) {
                hover ? message.success("Updated successfully") : message.success("Added successfully");
                setHover(null); 
                setName(''); 
                setBrandid(''); 
                getModels();
            }
        })
        .catch(err => {
            message.error("Error occurred");
        });
    };

    const deleteModel = (id) => {
        axios({
            url: `https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => {
            message.success("Deleted successfully");
            getModels();
        })
        .catch(err => {
            message.error("Error occurred");
        });
    };

    const showModal = (item) => {
        setHover(item);
        setName(item.name);
        setBrandid(item.brand_id);
    };

    return (
        <div className='model'>
            {/* ----------------------------------------------Brand----------------------------------------------------------------- */}
                  <select onChange={(e) => setBrandId(e.target.value)} defaultValue="">
            <option value="" disabled style={{display:"none"}}>Brand</option>
            {
                brands && brands.map((brand,index)=>(
                    <option key={index} value={brand.id}>{brand.title}</option>
                ))
            }
        </select>
        <select onChange={(e) => setModelId(e.target.value)} defaultValue="">
            <option value="" disabled style={{display:"none"}}>Model</option>
            {
                models && models.map((model,index)=>(
                    <option key={index} value={model.id}>{model.name}</option>
                ))
            }
        </select>
        <select onChange={(e) => setCategoryId(e.target.value)} defaultValue="">
            <option value="" disabled style={{display:"none"}}>Category</option>
            {
                categories && categories.map((category,index)=>(
                    <option key={index} value={category.id}>{category.name_en}</option>
                ))
            }
        </select>
        <select onChange={(e) => setLocationId(e.target.value)} defaultValue="">
            <option value="" disabled style={{display:"none"}}>Location</option>
            {
                locations && locations.map((location,index)=>(
                    <option key={index} value={location.id}>{location.name}</option>
                ))
            }
        </select>
            {/* --------------------------------------------------Button------------------------------------------------------------ */}
            <button className='model-btn' onClick={addModel}>
                {hover ? 'Update' : 'Add'}
            </button>
            <table>
                <thead>
                    <tr>
                        <th className='th-a'>Model</th>
                        <th className='th-b'>Brand</th>
                        <th className='th-c'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        models && models.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.brand_title}</td>
                                <td className='td'>
                                    <Button className='model-btn-a'onClick={() => showModal(item)}>Edit</Button> 
                                    <Button className='model-btn-b'onClick={() => deleteModel(item.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Model;





