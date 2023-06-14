//img imports
import home from "../assets/img/home.png";
import logo from "../assets/img/logo.png";
import reg from "../assets/img/registration.png";
import profile from "../assets/img/profile.png";
import cart from "../assets/img/cart.png";

import { Link } from "react-router-dom";
import {BaseUrlUser} from "../config";

function Header() {
    const isLoggedIn = localStorage.getItem('accessToken') !== null;
    const accessToken = localStorage.getItem('accessToken');

    const handleLogout = async () => {
        if (accessToken === 'testAccsesToken') {
            localStorage.removeItem('accessToken')
            window.location.reload()
        }
        try {
            const response = await fetch(BaseUrlUser + '/api/user/logout', {
                method: 'GET',
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem('accessToken');
                // Add any additional logic after successful logout
                console.log('User logged out successfully');
                window.location.reload()
            } else {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || 'Failed to logout');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="header">
            <div className="logo" id="logo">
                <img src={logo} alt="logo" className="img" />
                <span className={"nav-label"}>Kartelles</span>
            </div>
            <div className="nav-links">
                <Link to={"/"} className={"nav-item"}>
                    <img src={home} alt="Home" className="img" />
                    <span className="nav-label">Home</span>
                </Link>
                {isLoggedIn ? (
                    <>
                        <button className={"nav-item"} onClick={handleLogout} >
                            <img src={reg} alt={"logout"} className={"img"} />
                            <span className="nav-label">logout</span>
                        </button>

                        <Link to={"/profile"} className={"nav-item"}>
                            <img src={profile} alt={"profile"} className={"img"} />
                            <span className="nav-label">profile</span>
                        </Link>

                        <Link to={"/cart"} className={"nav-item"}>
                            <img src={cart} alt={"cart"} className={"img"} />
                            <span className="nav-label">Cart</span>
                        </Link>
                    </>
                ) : (
                    <Link to={"/login"} className={"nav-item"}>
                        <img src={reg} alt={"login"} className={"img"} />
                        <span className="nav-label">login</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
