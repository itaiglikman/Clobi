import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "../../AuthArea/Login/Login";
// import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

    return (
        <Routes>
            {/* register route */}
            {/* <Route path="/register" element={<Register />} /> */}

            {/* login route */}
            {/* <Route path="/login" element={<Login />} /> */}

            {/* admin route */}
            
            {/* user route */}

            {/* Landing Page Route: */}
            <Route path="/home" element={<Home />} />

            {/* default route: */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* page not found rout: */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;

