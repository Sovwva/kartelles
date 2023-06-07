//img imports
import home from "../assets/img/home.png"
import logo from "../assets/img/logo.png"
import reg from "../assets/img/registration.png"
import profile from "../assets/img/profile.png"
import cart from "../assets/img/cart.png"

function Header() {
    const isLoggedIn = true; // Здесь вы должны использовать фактическую логику для определения, вошел ли пользователь в систему

    return (
            <div className="header">
                <div className="logo" id="logo">
                    <img src={logo} alt="logo" className="img" />
                    <span className={"nav-label"}>Kartelles</span>
                </div>
                <div className="nav-links">
                    <div className={"nav-item"}>
                        <img src={home} alt="Home" className="img" />
                        <span className="nav-label">Home</span>
                    </div>
                {isLoggedIn ? (
                    <>
                        <div className={"nav-item"}>
                            <img src={reg} alt={"reg"} className={"img"}/>
                            <span className="nav-label">log out</span>
                        </div>
                        <div className={"nav-item"}>
                            <img src={profile} alt={"profile"} className={"img"}/>
                            <span className="nav-label">profile</span>
                        </div>
                        <div className={"nav-item"}>
                            <img src={cart} alt={"cart"} className={"img"}/>
                            <span className="nav-label">Cart</span>
                        </div>
                    </>
                ) : (
                    <div className="nav-item">
                        <img src={reg} alt={"registration"} className={"img"}/>
                        <span className="nav-label">Register</span>
                    </div>
                )}
                </div>
            </div>
    );
}

export default Header;