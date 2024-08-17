import React, { useEffect, useState } from 'react';
import "./Cars.css";
import axios from 'axios';
import { message, Button, Table, Modal, Form, Input } from 'antd';

const Cars = () => {
    const [brandId, setBrandId] = useState('');
    const [modelId, setModelId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [cityId, setCityId] = useState('');
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [currentCity, setCurrentCity] = useState(null);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

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
            .then(res => setLocations(res.data.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getModels();
        getBrands();
        getCars();
        getCategories();
        getLocations();
    }, []);

    const addCar = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('color', color);
        formData.append('year', year);
        formData.append('seconds', seconds);
        formData.append('max_speed', maxSpeed);
        formData.append('max_people', maxPeople);
        formData.append('transmission', transmission);
        formData.append('motor', motor);
        formData.append('drive_side', driveSide);
        formData.append('petrol', petrol);
        formData.append('limitperday', limitPerDay);
        formData.append('deposit', deposit);
        formData.append('premium_protection', premiumProtection);
        formData.append('price_in_aed', priceInAed);
        formData.append('price_in_usd', priceInUsd);
        formData.append('price_in_aed_sale', priceInAedSale);
        formData.append('price_in_usd_sale', priceInUsdSale);
        formData.append('inclusive', inclusive);
        formData.append('brand_id', brandId);
        formData.append('model_id', modelId);
        formData.append('category_id', categoryId);
        formData.append('location_id', locationId);
        formData.append('city_id', cityId);

        const url = hover ? `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${hover.id}` : `https://autoapi.dezinfeksiyatashkent.uz/api/cars`;
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
                message.success(hover ? "Updated successfully" : "Added successfully");
                setHover(null); 
                setName(''); 
                setBrandId(''); 
                getCars();
                setOpen(false); 
            }
        })
        .catch(err => {
            message.error("Error occurred");
        });
    };

    const deleteCar = (id) => {
        axios({
            url: `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => {
            message.success("Deleted successfully");
            getCars();
        })
        .catch(err => {
            message.error("Error occurred");
        });
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('text', values.text);

        axios({
            url: currentCity 
                ? `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${currentCity.id}` 
                : 'https://autoapi.dezinfeksiyatashkent.uz/api/cities',
            method: currentCity ? 'PUT' : 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: formData,
        })
        .then(res => {
            if (res.data.success) {
                message.success(currentCity ? "Updated successfully" : "Added successfully");
                setOpen(false);
                getCars();
                form.resetFields();
                setCurrentCity(null);
            }
        })
        .catch(err => console.log(err));
    };

    const showModal = (item) => {
        setOpen(true);
        setCurrentCity(item);
        form.setFieldsValue(item);
    };

    const closeModal = () => {
        setOpen(false);
        setCurrentCity(null);
        form.resetFields();
    };

    return (
        <div className='model'>
            <ul className='home-list'>
                <Button type='primary' className='home-btn' onClick={() => setOpen(true)}>Add</Button>
            </ul>
            <Modal open={open} footer={null} onCancel={closeModal}>
                <Form form={form} className='home-form' onFinish={handleSubmit}>
                    <Form.Item name="brand_id" label="Brand">
                        <select className='model-select' value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                            <option value="">Brand</option>{
                                brands && brands.map((brand, index) => (<option key={index} value={brand.id}>{brand.title}</option>))}
                        </select>
                    </Form.Item>
                    <Form.Item name="model_id" label="Model">
                        <select className='model-select' value={modelId} onChange={(e) => setModelId(e.target.value)}>
                            <option value="">Model</option>{
                                models && models.map((model, index) => (<option key={index} value={model.id}>{model.title}</option>))}
                        </select>
                    </Form.Item>
                    <Form.Item name="category_id" label="Category">
                        <select className='model-select' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                            <option value="">Category</option>{
                                categories && categories.map((category, index) => (<option key={index} value={category.id}>{category.title}</option>))}
                        </select>
                    </Form.Item>
                    <Form.Item name="location_id" label="Location">
                        <select className='model-select' value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                            <option value="">Location</option>{
                                locations && locations.map((location, index) => (<option key={index} value={location.id}>{location.title}</option>))}
                        </select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className='home-btn-a' type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={cars} rowKey="id">
                <Table.Column title="Brand" dataIndex="brand_title" key="brand_title" />
                <Table.Column title="Model" dataIndex="name" key="name" />
                <Table.Column title="Categories" dataIndex="category_title" key="category_title" />
                <Table.Column title="Locations" dataIndex="location_title" key="location_title" />
                <Table.Column 
                    title="Actions" 
                    key="actions"
                    render={(text, record) => (
                        <>
                            <Button className='model-btn-a' onClick={() => showModal(record)}>Edit</Button> 
                            <Button className='model-btn-b' onClick={() => deleteCar(record.id)}>Delete</Button>
                        </>
                    )}
                />
            </Table>
        </div>
    );
};

export default Cars;
