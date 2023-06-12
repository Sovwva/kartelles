import React, { useState, useEffect } from 'react';
import { BaseUrlLot } from '../../config';
import ProductTypeButtons from './ProductTypeButtons';

const Products = ({ searchResults }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [productType, setProductType] = useState('all');

    const productTypeUrls = {
        all: `${BaseUrlLot}/api/auction`,
        user: `${BaseUrlLot}/api/auction/auth-user-auctions`,
        bidded: `${BaseUrlLot}/api/auction/auth-bidded-auctions`,
        won: `${BaseUrlLot}/api/auction/auth-won-auctions`,
        paid: `${BaseUrlLot}/api/auction/auth-purchased-auctions`,
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const url = productTypeUrls[productType];

                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const data = await response.json();
                    setProducts(data);
                    setError(null);
                } else {
                    const errorMessage = await response.text();
                    console.log(errorMessage);
                    throw new Error('Server Error');
                }
            } catch (error) {
                console.error(error);
                setProducts([]);
                setError('Failed to connect to the server. Please try again later.');
            }
        };

        fetchProducts();
    }, [productType]);

    useEffect(() => {
        if (searchResults && searchResults.length > 0) {
            const filteredProducts = products.filter((product) =>
                searchResults.includes(product.id)
            );
            setProducts(filteredProducts);
        }
    }, [searchResults, products]);

    const handleProductTypeChange = (type) => {
        setProductType(type);
    };

    return (
        <div className="products-container">
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <h2>Products</h2>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">{product.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Products;
