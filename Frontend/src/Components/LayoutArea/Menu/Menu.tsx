import { Home, List, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {

    return (
        <div className="Menu">
            <NavLink to="/home" title="home"><Home /></NavLink>
            <NavLink to="/vacations" title="vacations list"><List /></NavLink>
            {/* <NavLink to="/vacations/add-vacation" title="add"><PlusCircle /></NavLink> */}
        </div>
    );
}

export default Menu;
