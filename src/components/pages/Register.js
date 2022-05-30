import React from "react";
import { useFormik } from "formik"; // for handling form
import * as Yup from "yup"; // for form validation

// handling validation
const formSchema = Yup.object({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  email: Yup.string().required("Email is Required"),
  password: Yup.string().required("Password is Required"),
  passwowrdConfirm: Yup.string().required("Password do not Match"),
});

export const Register = () => {
  // Handling form Initial Values using formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwowrdConfirm: "",
    },

    onSubmit: (values) => {
      console.log(values);
    },

    validationSchema: formSchema,
  });
  return (
    <>
      <div className="form-heading">
        <h1>Registration page</h1>
      </div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form__group">
          <input
            value={formik.values.firstName}
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            className="form__input"
            placeholder="First Name"
          />
          <div className="errorMsg">
            {formik.touched.firstName && formik.errors.firstName}
          </div>
        </div>

        <div className="form__group">
          <input
            value={formik.values.lastName}
            onChange={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            className="form__input"
            placeholder="Last Name"
          />

          <div className="errorMsg">
            {formik.touched.lastName && formik.errors.lastName}
          </div>
        </div>

        <div className="form__group">
          <input
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            className="form__input"
            placeholder="Enter your Email Address"
          />

          <div className="errorMsg">
            {formik.touched.email && formik.errors.email}
          </div>
        </div>

        <div className="form__group">
          <input
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            className="form__input"
            placeholder="Enter Password"
          />

          <div className="errorMsg">
            {formik.touched.password && formik.errors.password}
          </div>
        </div>

        <div className="form__group">
          <input
            value={formik.values.passwowrdConfirm}
            onChange={formik.handleChange("passwowrdConfirm")}
            onBlur={formik.handleBlur("passwowrdConfirm")}
            className="form__input"
            placeholder="Confirm Password"
          />

          <div className="errorMsg">
            {formik.touched.passwowrdConfirm && formik.errors.passwowrdConfirm}
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};
