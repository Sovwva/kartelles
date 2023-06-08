//img imports
import home from "../assets/img/home.png"
import logo from "../assets/img/logo.png"
import reg from "../assets/img/registration.png"
import profile from "../assets/img/profile.png"
import cart from "../assets/img/cart.png"

import {Link} from "react-router-dom";

function Header() {
    const isLoggedIn = false; // Здесь вы должны использовать фактическую логику для определения, вошел ли пользователь в систему

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
                        <Link to={"/error"} className={"nav-item"}>
                                <img src={reg} alt={"reg"} className={"img"}/>
                                <span className="nav-label">log out</span>
                        </Link>

                        <Link to={"/profile"} className={"nav-item"}>
                            <img src={profile} alt={"profile"} className={"img"}/>
                            <span className="nav-label">profile</span>
                        </Link>

                        <Link to={"/cart"} className={"nav-item"}>
                            <img src={cart} alt={"cart"} className={"img"}/>
                            <span className="nav-label">Cart</span>
                        </Link>

                    </>
                ) : (
                    <Link to={"/Registration"} className={"nav-item"}>
                        <img src={reg} alt={"registration"} className={"img"}/>
                        <span className="nav-label">Register</span>
                    </Link>
                )}
                </div>
            </div>
    );
}

export default Header;