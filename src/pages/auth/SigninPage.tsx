import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { Button, InputPicker } from "rsuite";
import { authAdmin } from "../../helpers/Auth8Base";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import useForm from "../../hooks/useForm";
import { IUserLogged } from "../../interfaces/IUser";
import { useAuthStore } from "../../store/AuthStore";
import { useUserLogged } from "../../hooks/useUserLogged";

const INITIAL_LOGIN = {
  email: "",
  password: "",
};

export const SigninPage = () => {
  const navigate = useNavigate();
  const { validateError } = useErrorHandler();
  const { signin } = useAuthStore();
  const { saveUserLogged } = useUserLogged();

  const {
    form: { email, password },
    onChange,
  } = useForm(INITIAL_LOGIN);

  const handleClickSignin = async () => {
    try {
      const response = await authAdmin.signIn(email, password);
      /* This code block is handling the response from the `auth.signIn` function. If the response is
      truthy (i.e., not null, undefined, 0, false, or an empty string), it sets the `idToken`
      property of the response in the local storage using `localStorage.setItem`. It then decodes
      the `idToken` using the `decodeToken` function from the `react-jwt` library, with the type
      parameter `IUserLogged` specifying the expected decoded token format. If the decoded token is
      truthy, it calls the `signin` function from the `useAuthStore` hook with the decoded token as
      an argument. Finally, it navigates to the "/home" page using the `navigate` function from the
      `react-router-dom` library. */
      if (response) {
        localStorage.setItem("token", response.idToken);
        const decoded = decodeToken<IUserLogged>(response.idToken);
        if (decoded) await saveUserLogged(decoded?.email);
        navigate("/home");
      }
    } catch (error) {
      validateError(error);
    }
  };

  try {
  } catch (error) {}

  return (
    <div className="container mt-5">
      <div className="row col-md-5 mx-auto">
        <div className="card margin-auto">
          <div className="card-header text-center bg-transparent border-0 py-5">
            <h5>TASK LIST</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={(evt) => onChange(evt.target.value, "email")}
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="password"
                value={password}
                onChange={(evt) => onChange(evt.target.value, "password")}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="card-footer py-3 bg-transparent border-0">
            <div className="d-flex gap-4 justify-content-end">
              <Button appearance="default" onClick={() => navigate("/auth/signup")}>
                Sign Up
              </Button>
              <Button appearance="primary" onClick={handleClickSignin}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
