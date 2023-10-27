import { Outlet, Link } from "react-router-dom";
export default function Header(){
  return (
    <div>
    <nav class="container navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <Link to="/home"><p class="navbar-brand" href="#">Navbar</p></Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link to="/home"><p class="nav-link active" aria-current="page">Home</p></Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/admin"><p class="nav-link active" aria-current="page">Admin</p></Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/login"><p class="nav-link active" aria-current="page">Login</p></Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/register"><p class="nav-link active" aria-current="page">Register</p></Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <Outlet/>
    </div>
  )
};