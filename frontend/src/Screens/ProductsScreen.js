import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { listProducts, saveProduct, deleteProduct } from '../actions/productActions';
import { Redirect } from 'react-router-dom';
import HomeScreen from './HomeScreen';



function ProductsScreen (props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList)
    const {loading, products, error} = productList;

    const productSave = useSelector((state) => state.productSave || {});
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector((state) => state.productDelete || {});
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    useEffect(() => {
        if(successSave || successDelete){
            setModalVisible(false);

        } else {
            //
        }
        dispatch(listProducts());
        
        return () => {
          //
        };
      }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
    }


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name, 
            price, 
            image, 
            brand, 
            category, 
            countInStock, 
            description
        })
        );

    };

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id))
    }

    return<div className="content content-margined">

        <div className="product-header">
            <h3>Products</h3>
            <button className = "button primary" onClick={() => openModal({})}>Create Product</button>
        </div>
        {modalVisible &&
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>{id ? "Update Product" : "Create Product"}</h2>
                        </li>
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                        </li>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input 
                            type="text"
                            placeholder="Required" 
                            name="name"
                            value={name} 
                            id="name" 
                            onChange={(e) => setName(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="price">Price</label>
                            <input 
                            type="text"
                            placeholder="Required" 
                            name="price"
                            value={price} 
                            id="price" 
                            onChange={(e) => setPrice(e.target.value)}>   
                            </input>
                        </li>
                        <li>
                            <label htmlFor="image">Image</label>
                            <input 
                            type="text"
                            placeholder="Required" 
                            name="image"
                            value={image} 
                            id="image" 
                            onChange={(e) => setImage(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="brand">Brand</label>
                            <input 
                            type="text"
                            placeholder="Required" 
                            name="brand"
                            value={brand} 
                            id="brand" 
                            onChange={(e) => setBrand(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="category">Category</label>
                            <input 
                            type="text" 
                            placeholder="Required"
                            name="category"
                            value={category} 
                            id="category" 
                            onChange={(e) => setCategory(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input 
                            type="text"
                            placeholder="Required"
                            name="countInStock"
                            value={countInStock} 
                            id="countInStock" 
                            onChange={(e) => setCountInStock(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="description">Description</label>
                            <textarea 
                            name="description"
                            placeholder="Required"
                            value={description} 
                            id="description" 
                            onChange={(e) => setDescription(e.target.value)}> 
                            </textarea>
                        </li>
                        <li>
                            <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
                        </li>
                        <li>
                            <button type="button" className="button secondary" onClick={() => setModalVisible(false)}>Back</button>
                        </li>
                    </ul>
                </form>
            </div>
        }

        <div className="product-list">
            <table className = "table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) =>(
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <button className="button" onClick={() => openModal(product)}>Edit</button>
                            {' '}
                            <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    </div>

}

export default ProductsScreen;
