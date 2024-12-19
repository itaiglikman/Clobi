import "./Layout.css";
// import styled from "styled-components";
// import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import Footer from "../Footer/Footer";
// import clocksService from "../../../Services/ClocksService";
import germanyTimeService from "../../../Services/GermanyTimeService";

function Layout(): JSX.Element {

    // async function getAllClocks() {
    //     const clocks = await clocksService.getAllClocks();
    // };
    // getAllClocks();

    async function getGermany() {
        const clocks = await germanyTimeService.germanyTime();
    };
    getGermany();

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
