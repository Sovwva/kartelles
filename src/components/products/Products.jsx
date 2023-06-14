import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInfoModal from './ProductInfoModal';
import ProductEditModal from './ProductEditModal';
import { BaseUrlLot } from '../../config';

const endpointMapping = {
    'All Lots': '/api/auction',
    'User Lots': '/api/auction/auth-user-auctions',
    'Participated Lots': '/api/auction/auth-participant-auctions',
    'Paid Lots': '/api/auction/auth-purchased-auctions',
};

const Products = ({ productType }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isOwned, setIsOwned] = useState(false);

    const fetchData = async () => {
        try {
            console.log('Fetching data from server...');
            const token = localStorage.getItem('accessToken'); // Получение токена из локального хранилища
            const response = await axios.get(BaseUrlLot + endpointMapping[productType], {
                headers: {
                    Authorization: `Bearer ${token}` // Передача токена в заголовке запроса
                }
            });
            setProductsData(response.data);
            checkOwnership(productType);
            console.log('Data fetched successfully:', response.data);
        } catch (error) {
            console.error('Error fetching lots:', error);
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
        setIsEditing(false);
    };

    const checkOwnership = (selectedType) => {
        const isOwnedLots = selectedType === 'User Lots';
        setIsOwned(isOwnedLots);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
    };

    useEffect(() => {
        fetchData();
    }, [productType]);


    if (isEditing) {
        return (
            <ProductEditModal product={selectedProduct} closeModal={closeModal} />
        );
    } else {
        return (
            <div>
                <ul>
                    {productsData.map((product) => (
                        <li key={product.id} onClick={() => openModal(product)}>
                            {product.name}
                            {isOwned && (
                                <button onClick={() => handleEdit(product)}>Edit</button>
                            )}
                        </li>
                    ))}
                </ul>
                {showModal && (
                    <ProductInfoModal
                        product={selectedProduct}
                        closeModal={closeModal}
                        isOwned={isOwned}
                    />
                )}
            </div>
        );
    }
};

export default Products;
