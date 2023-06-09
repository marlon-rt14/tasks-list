import React, { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { Button, InputPicker } from "rsuite";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useToaster, Message } from "rsuite";
import { authAdmin, authGuest } from "../../helpers/Auth8Base";
import { useErrorHandler } from "../../hooks/useErrorHandler";

const INITIAL_SIGNUP = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  role: "admin" as "admin" | "guest",
};

export const SignupPage = () => {
  const navigate = useNavigate();
  const toaster = useToaster();
  const { validateError } = useErrorHandler();
  const {
    form: { email, password, firstName, lastName, role },
    onChange,
  } = useForm(INITIAL_SIGNUP);

  const handleClickSignup = async () => {
    try {
      let response;
      if (role === "admin") {
        response = await authAdmin.signUp(
          { email, firstName, lastName, status: "active" },
          password
        );
      }
      if (role === "guest") {
        response = await authGuest.signUp(
          { email, firstName, lastName, status: "active" },
          password
        );
      }
      if (response) {
        toaster.push(
          <Message closable showIcon type="success">
            Successfully signed up
          </Message>
        );
        navigate("/auth/signin");
      }
    } catch (error) {
      validateError(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row col-md-5 mx-auto">
        <div className="card margin-auto">
          <div className="card-header text-center bg-transparent border-0 py-5">
            <h5>SIGN UP</h5>
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
                name="firstName"
                value={firstName}
                onChange={(evt) => onChange(evt.target.value, "firstName")}
                placeholder="First Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={lastName}
                onChange={(evt) => onChange(evt.target.value, "lastName")}
                placeholder="Last Name"
              />
            </div>
            <div className="mb-3">
              <InputPicker
                data={[
                  { label: "Admin", value: "admin" },
                  { label: "Guest", value: "guest" },
                ]}
                name="role"
                className="w-100"
                cleanable={false}
                value={role}
                onChange={(evt) => onChange(evt.target.value, "role")}
                placeholder="Role"
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
              <Button appearance="default" onClick={() => navigate("/auth/signin")}>
                Go Back
              </Button>
              <Button appearance="primary" onClick={handleClickSignup}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
