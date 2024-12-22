import ClobiLogo from "../../../Assets/Images/clobi-logo.jpg";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Menu from "../Menu/Menu";
import "./Header.css";
import Clock from "react-live-clock";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <div className="left-header">
        <img src={ClobiLogo} alt="Clobi Logo" />
        <Menu />
      </div>

      <div className="center-header">
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Berlin'} />
      </div>

      <div className="right-header">
        <AuthMenu />
      </div>
    </div>
  );
}

export default Header;
