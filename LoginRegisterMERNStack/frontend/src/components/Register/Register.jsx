import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./register.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const RegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return RegEx.test(email);
  };

  const isValidNumber = (phoneNumber) => {
    const RegEx = /^[789]\d{9}$/;
    return RegEx.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    const RegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return RegEx.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "Please enter your first name.";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Please enter your last name.";
    }
    if (!formData.birthday.trim()) {
      errors.birthday = "Please select your birthday.";
    }
    if (!formData.gender) {
      errors.gender = "Please select your gender.";
    }
    if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!isValidNumber(formData.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number.";
    }
    if (!isValidPassword(formData.password)) {
      errors.password =
        "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          firstName: formData.firstName,
        lastName: formData.lastName,
          birthday: formData.birthday,
          gender: formData.gender,
        email: formData.email,
          phoneNumber: formData.phoneNumber,
        password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError({ form: res.data.message });
        return;
      }

      Swal.fire({
        title: "Success!",
        text: "Registration successful",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error.message);
      setError({ form: error.message });
    }
  };

  const handleClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with this action?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center align-items-center vh-100 my-2">
        <div className="card w-75 p-5 bg-light">
          <h1 className="text-center mb-4">Registration Form</h1>
          <div className="row">
            <div className="form-label mb-3 col">
              <label htmlFor="firstName">First Name: </label>
              <input
                value={formData.firstName}
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="e.g., Vamsikrishna"
                onChange={handleChange}
              />
              {error.firstName && (
                <p className="text-danger">{error.firstName}</p>
              )}
            </div>
            <div className="form-label mb-3 col">
              <label htmlFor="lastName">Last Name: </label>
              <input
                value={formData.lastName}
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="e.g., Dudyala"
                onChange={handleChange}
              />
              {error.lastName && (
                <p className="text-danger">{error.lastName}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="form-label mb-3 col">
              <label htmlFor="birthday">Birthday: </label>
              <input
                value={formData.birthday}
                type="date"
                className="form-control"
                id="birthday"
                name="birthday"
                onChange={handleChange}
              />
              {error.birthday && (
                <p className="text-danger">{error.birthday}</p>
              )}
            </div>
            <div className="mb-3 col">
              <label>Gender: </label>
              <div className="d-flex">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    className="form-check-input"
                    id="genderMale"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="genderMale">
                    Male
                  </label>
                </div>
                <div className="form-check me-3">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    className="form-check-input"
                    id="genderFemale"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="genderFemale">
                    Female
                  </label>
                </div>
                <div className="form-check me-3">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    className="form-check-input"
                    id="genderOther"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="genderOther">
                    Other
                  </label>
                </div>
              </div>
              {error.gender && <p className="text-danger">{error.gender}</p>}
            </div>
          </div>
          <div className="row">
            <div className="form-label mb-3 col">
              <label htmlFor="email">Email Address: </label>
              <input
                value={formData.email}
                className="form-control"
                id="email"
                name="email"
                placeholder="e.g., vamsi@gmail.com"
                onChange={handleChange}
              />
              {error.email && <p className="text-danger">{error.email}</p>}
            </div>
            <div className="form-label mb-3 col">
              <label htmlFor="phoneNumber">Phone Number: </label>
              <input
                value={formData.phoneNumber}
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+9193911*****"
                onChange={handleChange}
              />
              {error.phoneNumber && (
                <p className="text-danger">{error.phoneNumber}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="form-label mb-3 col">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                value={formData.password}
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              {error.password && (
                <p className="text-danger">{error.password}</p>
              )}
            </div>
            <div className="form-label mb-3 col">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <input
                type="password"
                value={formData.confirmPassword}
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                onChange={handleChange}
              />
              {error.confirmPassword && (
                <p className="text-danger">{error.confirmPassword}</p>
              )}
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-3"
              onClick={handleClick}
            >
              Cancel
            </button>
          </div>
          {error.form && <p className="text-danger mt-3">{error.form}</p>}
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
