import React, { useEffect, useState } from 'react';
import "./Cars.css";
import axios from 'axios';
import { message, Button, Modal, Form, Input } from 'antd';

const Cars = () => {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]); 
    const [categories, setCategories] = useState([]); 
    const [locations, setLocations] = useState([]); 
    const [name, setName] = useState('');
    const [brandId, setBrandId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [hover, setHover] = useState(null);
    const [open, setOpen] = useState(false);

    const getModels = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cars')
            .then(res => setModels(res.data.data))
            .catch(err => console.error(err));
    };

    const getBrands = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
            .then(res => setBrands(res.data.data))
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
        getCategories();
        getLocations();
    }, []);

    const addModel = (values) => {
        const formData = new FormData();
        formData.append('number', values.number);
        formData.append('model_id', values.name);
        formData.append('brand_id', values.brandId);
        formData.append('categories_id', values.categoryId);
        formData.append('locations_name', values.locationId);

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
                hover ? message.success("Updated successfully") : message.success("Added successfully");
                setHover(null); 
                setName(''); 
                setBrandId(''); 
                setCategoryId('');
                setLocationId('');
                setOpen(false);
                getModels();
            }
        })
        .catch(err => {
            message.error("Error occurred");
        });
    };

    const deleteModel = (id) => {
        axios({
            url: `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`,
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

    const showModal = (item = null) => {
        if (item) {
            setHover(item);
            setName(item.name);
            setBrandId(item.brand_id);
            setCategoryId(item.category_id);
            setLocationId(item.location_id);
        } else {
            setHover(null);
            setName('');
            setBrandId('');
            setCategoryId('');
            setLocationId('');
        }
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setHover(null);
        setName('');
        setBrandId('');
        setCategoryId('');
        setLocationId('');
    };

    return (
        <div className='model'>
            <Button className="home-btn" onClick={() => showModal()}>Shahar Qushish</Button>
            <Modal open={open} footer={null} onCancel={closeModal}>
                <Form onFinish={addModel} initialValues={hover || {}}>
                    <Form.Item
                        className="home-item-a"
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input className="home-input-a" placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        className="home-item-b"
                        label="Brand"
                        name="brandId"
                        rules={[{ required: true, message: 'Please select a brand!' }]}
                    >
                        <Input className="home-input-b" placeholder="Brand ID" />
                    </Form.Item>
                    <Form.Item
                        className="home-item-b"
                        label="Model"
                        name="brandId"
                        rules={[{ required: true, message: 'Please select a brand!' }]}
                    >
                        <Input className="home-input-b" placeholder="Model ID" />
                    </Form.Item>
                    <Form.Item
                        className="home-item-c"
                        label="Category"
                        name="categoryId"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                    >
                        <Input className="home-input-c" placeholder="Category ID" />
                    </Form.Item>
                    <Form.Item
                        className="home-item-d"
                        label="Location"
                        name="locationId"
                        rules={[{ required: true, message: 'Please select a location!' }]}
                    >
                        <Input className="home-input-d" placeholder="Location ID" />
                    </Form.Item>
                    <Form.Item className="home-item-e">
                        <Button htmlType="submit" className="home-btn-d">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <table>
                <thead>
                    <tr>
                        <th className='th-b'>Brand</th>
                        <th className='th-a'>Model</th>
                        <th className='th-b'>Kategoriya</th>
                        <th className='th-b'>Lokatsiya</th>
                        <th className='th-c'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        models && models.map((item, index) => (
                            <tr key={index}>
                                <td>{item.brand_id}</td>
                                <td>{item.model_id}</td>
                                <td>{item.category_id}</td>
                                <td>{item.location_id}</td>
                                <td className='td'>
                                    <Button className='model-btn-a' onClick={() => showModal(item)}>Edit</Button> 
                                    <Button className='model-btn-b' onClick={() => deleteModel(item.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Cars;
