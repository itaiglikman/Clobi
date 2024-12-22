import "./Layout.css";
// import styled from "styled-components";
// import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
// import clocksService from "../../../Services/ClocksService";

function Layout(): JSX.Element {

   return (
    <div className="Layout">
        <Header />
      <div className="routing">
        <Routing />
      </div>
        <Footer />
    </div>
  );
}

export default Layout;
