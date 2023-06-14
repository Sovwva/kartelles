import React from 'react';

const PaymentPage = ({ paymentLink }) => {
    return (
        <div className="payment-page-container">
            <h2>Payment</h2>
            <div className="payment-instructions">
                <p>Please click the button below to complete your payment:</p>
                <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="payment-button">
                    Complete Payment
                </a>
            </div>
        </div>
    );
};

export default PaymentPage;
