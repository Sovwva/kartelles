import React from 'react';

const ProductTypeButtons = ({ productTypes, selectedProductType, onSelectProductType }) => {
    return (
        <div className="product-type-buttons">
            {productTypes.map((type) => (
                <button
                    key={type}
                    onClick={() => onSelectProductType(type)}
                    className={selectedProductType === type ? 'active' : ''}
                >
                    {type}
                </button>
            ))}
        </div>
    );
};

export default ProductTypeButtons;
