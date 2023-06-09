import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useAuthStore } from "../store/AuthStore";
import { IUserLogged, IUserSigned } from "../interfaces/IUser";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { apiAdmin, authAdmin, authGuest } from "../helpers/Auth8Base";
import { useUserLogged } from "../hooks/useUserLogged";

export const NavBar = () => {
  // CUSTOM HOOKS
  const { user }: { user: IUserSigned } = useAuthStore();
  const { validateError } = useErrorHandler();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      if (user?.roles.items.find((role) => role.name === "Admin")) {
        await authAdmin.signOut();
      } else if (user?.roles.items.find((role) => role.name === "Guest")) {
        await authGuest.signOut();
      }
    } catch (error) {
      validateError(error);
    }
  };

  // useEffect(() => {
  //     (async () => {
  //         const response = await auth.getAuthorizedData()
  //         console.log('response', response)
  //     })();
  // }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            TASK LIST
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul> */}
            <div className="w-100 d-flex justify-content-center flex-column align-items-center">
              <h5>{`${user?.firstName} ${user?.lastName}`}</h5>
              <p>{user?.roles.items.map((role) => role.name).join(", ")}</p>
            </div>
            <form className="d-flex w-25 justify-content-center" role="search">
              {/* <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              /> */}
              <button className="btn btn-outline-success" type="submit" onClick={handleLogout}>
                Log out
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
