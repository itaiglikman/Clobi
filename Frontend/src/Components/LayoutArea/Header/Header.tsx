// import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Menu from "../Menu/Menu";
import "./Header.css";
import ClobiLogo from "../../../Assets/Images/clobi-logo.jpg";


function Header(): JSX.Element {

    return (
        <div className="Header">
            <div className="left-header">
                {/* <h1>Globe Trekker</h1> */}
                <img src={ClobiLogo} alt="Clobi Logo" />
                <Menu />
            </div>

            <div className="right-header">
                {/* <AuthMenu /> */}
                auth menu
            </div>

        </div>
    );
}

export default Header;
