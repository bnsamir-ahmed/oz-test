import { NavLink } from "react-router-dom";

const LoginNav =({showBlackNav})=>{

    return(
        <>
            <div className="d-flex justify-content-between">
                <NavLink
                    className="nav-link links-margin"
                    to={"/contactus"}
                >inquire</NavLink>
                <svg
                    width="2"
                    height="34"
                    viewBox="0 0 2 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1 0L0.999999 34"
                        stroke={`${showBlackNav ? 'white' : 'black'}`}
                        stroke-width="0.5"
                        className="log-border"
                    />
                </svg>
                <NavLink
                className="nav-link links-margin"
                to={"/login"}
                >Login</NavLink>
            </div>
        </>
    )
}
export default LoginNav;