import React, { useState } from 'react';
import NavigationComponent from '../components/profile/NavigationComponent';
import NewAuctionForm from '../components/profile/NewAuctionForm';
import EditProfileForm from '../components/profile/EditProfileForm';
import ViewLots from '../components/profile/ViewLots';

function Profile() {
    const [currentPage, setCurrentPage] = useState('newAuction');

    const renderPage = () => {
        if (currentPage === 'newAuction') {
            return <NewAuctionForm />;
        } else if (currentPage === 'editProfile') {
            return <EditProfileForm />;
        } else if (currentPage === 'viewLots') {
            return <ViewLots currentPage={currentPage} />;
        }
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <NavigationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {renderPage()}
        </div>
    );
}

export default Profile;
