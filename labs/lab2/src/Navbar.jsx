import { Link } from "react-router-dom";
export default function Navbar() {
    return (
    <ul className="nav nav-tabs">
        <li className="nav-item">
            <Link className="nav-link text-black" to="/">
                Hem
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-black" to="/compose-salad">
                Komponera din sallad
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-black" to="/view-order">
                Varukorgen
            </Link>
        </li>
    </ul>);
}