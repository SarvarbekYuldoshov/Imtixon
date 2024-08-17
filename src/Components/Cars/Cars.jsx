import { Button, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Cars = () => {
    const mytoken = localStorage.getItem('token');

    // State for form fields
    const [formData, setFormData] = useState({
        brandId: '',
        modelId: '',
        categoryId: '',
        locationId: '',
        cityId: '',
        color: '',
        year: '',
        seconds: '',
        maxSpeed: '',
        maxPeople: '',
        transmission: '',
        motor: '',
        driveSide: '',
        petrol: '',
        limitPerDay: '',
        deposit: '',
        premiumProtection: '',
        priceInAed: '',
        priceInUsd: '',
        priceInAedSale: '',
        priceInUsdSale: '',
        inclusive: '',
        image: null,
        description: '',
        carNumber: '',
        carNumber2: '',
    });
    
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [cities, setCities] = useState([]);
    const [cars, setCars] = useState([]);
    const [hover, setHover] = useState(null); // Assuming hover is used for editing

    // Fetch data for dropdowns and car list
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [carsRes, brandsRes, modelsRes, categoriesRes, locationsRes, citiesRes] = await Promise.all([
                    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cars'),
                    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands'),
                    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/models'),
                    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/categories'),
                    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/locations'),
                    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities'),
                ]);
                setCars(carsRes.data.data);
                setBrands(brandsRes.data.data);
                setModels(modelsRes.data.data);
                setCategories(categoriesRes.data.data);
                setLocations(locationsRes.data.data);
                setCities(citiesRes.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    // Handle form submission for adding/updating cars
    const handleSubmit = async () => {
        const url = hover ? `https://autoapi.dezinfeksiyatashkent.uz/api/models/${hover.id}` : 'https://autoapi.dezinfeksiyatashkent.uz/api/models';
        const method = hover ? 'PUT' : 'POST';

        const fd = new FormData();
        Object.keys(formData).forEach(key => {
            fd.append(key, formData[key]);
        });

        try {
            const res = await axios({
                url,
                method,
                headers: {
                    Authorization: `Bearer ${mytoken}`
                },
                data: fd,
            });
            if (res.data.data.success) {
                message.success(hover ? "Updated successfully" : "Added successfully");
                setHover(null); 
                setFormData({
                    brandId: '',
                    modelId: '',
                    categoryId: '',
                    locationId: '',
                    cityId: '',
                    color: '',
                    year: '',
                    seconds: '',
                    maxSpeed: '',
                    maxPeople: '',
                    transmission: '',
                    motor: '',
                    driveSide: '',
                    petrol: '',
                    limitPerDay: '',
                    deposit: '',
                    premiumProtection: '',
                    priceInAed: '',
                    priceInUsd: '',
                    priceInAedSale: '',
                    priceInUsdSale: '',
                    inclusive: '',
                    image: null,
                    description: '',
                    carNumber: '',
                    carNumber2: '',
                });
                await fetchData();
            }
        } catch (err) {
            message.error("Error occurred");
        }
    };
    const deleteCar = async (id) => {
        try {
            await axios({
                url: `https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${mytoken}`
                },
            });
            message.success("Deleted successfully");
            await fetchData(); 
        } catch (err) {
            message.error("Error occurred");
        }
    };

    return (
        <div className='container'>
            <Button>Add</Button>
            <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color"/>
            <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year"/>
            <input type="number" name="seconds" value={formData.seconds} onChange={handleChange} placeholder="Seconds"/>
            <input type="number" name="maxSpeed" value={formData.maxSpeed} onChange={handleChange} placeholder="Max Speed"/>
            <input type="text" name="maxPeople" value={formData.maxPeople} onChange={handleChange} placeholder="Max People"/>
            <input type="text" name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Transmission"/>
            <input type="text" name="motor" value={formData.motor} onChange={handleChange} placeholder="Motor"/>
            <input type="text" name="driveSide" value={formData.driveSide} onChange={handleChange} placeholder="Drive Side"/>
            <input type="text" name="petrol" value={formData.petrol} onChange={handleChange} placeholder="Petrol"/>
            <input type="text" name="limitPerDay" value={formData.limitPerDay} onChange={handleChange} placeholder="Limit Per Day"/>
            <input type="text" name="deposit" value={formData.deposit} onChange={handleChange} placeholder="Deposit"/>
            <input type="text" name="premiumProtection" value={formData.premiumProtection} onChange={handleChange} placeholder="Premium Protection"/>
            <input type="text" name="priceInAed" value={formData.priceInAed} onChange={handleChange} placeholder="Price in AED"/>
            <input type="text" name="priceInUsd" value={formData.priceInUsd} onChange={handleChange} placeholder="Price in USD"/>
            <input type="text" name="priceInAedSale" value={formData.priceInAedSale} onChange={handleChange} placeholder="Price in AED Sale"/>
            <input type="text" name="priceInUsdSale" value={formData.priceInUsdSale} onChange={handleChange} placeholder="Price in USD Sale"/>
            <input type="text" name="inclusive" value={formData.inclusive} onChange={handleChange} placeholder="Inclusive"/>
            <input type="file" name="image" onChange={handleChange} />
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description"/>
            <input type="text" name="carNumber" value={formData.carNumber} onChange={handleChange} placeholder="Car Number"/>
            <input type="text" name="carNumber2" value={formData.carNumber2} onChange={handleChange} placeholder="Car Number 2"/>

            <select name="brandId" onChange={handleChange} value={formData.brandId}>
                <option value="" disabled>Select Brand</option>
                {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.title}</option>
                ))}
            </select>
            <select name="modelId" onChange={handleChange} value={formData.modelId}>
                <option value="" disabled>Select Model</option>
                {models.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                ))}
            </select>
            <select name="categoryId" onChange={handleChange} value={formData.categoryId}>
                <option value="" disabled>Select Category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name_en}</option>
                ))}
            </select>
            <select name="locationId" onChange={handleChange} value={formData.locationId}>
                <option value="" disabled>Select Location</option>
                {locations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                ))}
                </select>
        </div>
   )
}

export default Cars;
