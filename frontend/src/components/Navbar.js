import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>
                    <p className="display-3" >Blog</p>
                </Link>
                <div className="navbar-nav">
                    <Link to="/" className="nav-link" >
                        <p className="h3" >Home</p>
                    </Link>
                    <Link to="/create" className="nav-link" >
                        <p className="h3" >Create</p>
                    </Link>
                </div>
            </div>
            </nav>
        </div>
    );
};
export default Navbar;
