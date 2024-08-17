import React, { useEffect, useState } from 'react'
import "./Cars.css"
import axios from 'axios';
import { Button, Form, Input, Modal, Table, message } from 'antd';
const Brands = () => {
    const [brands,setBrands] = useState([]);
    const [openMoodal,setOpenModal] = useState(false)
    const [image,setImage] = useState(null)
    const getBrands = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
        .then((res)=>setBrands(res.data.data))
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        getBrands();
    })
    const showModal = () =>{
        setOpenModal(true)
    }
    const closeModal = () => {
        setOpenModal(false)
    }
    const columns = [
        {
            title:"Number",
            dataIndex:"number",
        },
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
           title: 'Images',
           dataIndex: 'images',
        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
    ]
    const Data = brands.map((item,index)=>(
        {
            key:index,
            number:index+1,
            id:item.id,
            title:item.title,
            images: (<img
            width={150}
            src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
            alt={item.name}
          />
        ),
        action: (
          <>
            <Button  className="home-btn-a">Edit</Button>
            <Button  className="home-btn-b">Delete</Button>
          </>
        )
            
        }
    ))

   const handleSubmit = (values) =>{
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('id',values.id)
    formData.append('images',image);
    axios({
        url:'https://autoapi.dezinfeksiyatashkent.uz/api/brands',
        method:'POST',
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        data:formData
    })
    .then(res=>{
        if(res.data.data.success){
            message.success
            setOpenModal(false)
            getBrands()
        }
    })
   }

  return (
    <div className='brands'>
      <div className='container brands-container'>
        <Button onClick={showModal}>Brand Qushish</Button>
        <Table columns={columns} dataSource={Data}/>
        <Modal open={openMoodal} footer={null} onCancel={closeModal}>
            <Form onFinish={handleSubmit}>
                <Form.Item label="Title" name="title">
                    <Input placeholder='Title' />
                </Form.Item>
                <Form.Item label="ID" name="id">
                    <Input placeholder='Id' />
                </Form.Item>
                <Form.Item label="Images" name="images">
                    <Input type='file' placeholder='Images' onChange={(e)=>setImage(e.target.files[0])} />
                </Form.Item>
                <Form.Item label="Name">
                    <Button>Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
      </div>
    </div>
  )
}

export default Brands
