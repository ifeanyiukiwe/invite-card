import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./InviteForm.css";
import logofull from "../assets/images/logo-full.svg";
import iconupload from "../assets/images/icon-upload.svg";
import iconinfo from "../assets/images/icon-info.svg";
import patternbottom from "../assets/images/pattern-squiggly-line-bottom-desktop.svg";
import patterntop from "../assets/images/pattern-squiggly-line-top.svg";

function InviteForm() {
  const [formData, setFormData] = useState(null);
  const [image, setImage] = useState(iconupload);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      github: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Full Name must be at least 3 characters")
        .required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      github: Yup.string()
        .matches(/^@/, "GitHub username must start with @")
        .required("GitHub username is required"),
    }),
    onSubmit: (values) => {
      const uniqueNumber = Math.floor(10000 + Math.random() * 90000) + "#";
      const inviteData = { ...values, image, uniqueNumber };
      localStorage.setItem("inviteData", JSON.stringify(inviteData));
      navigate("/invite-card", { state: inviteData }); // Navigate to invite card page
    },
  });

  // ✅ Handle Image Upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Only JPG and PNG images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("Image is too large! Please upload an image under 5MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setError(""); // Clear any previous error
  };

  // ✅ Handle Drag-and-Drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } });
    }
  };

  return (
    <div className="main">
      <img src={patterntop} alt="Pattern Top" className="pattern-top" />
      <img
        src={patternbottom}
        alt="Pattern Bottom"
        className="pattern-bottom"
      />
      <div>
        <img src={logofull} alt="Logo Full" className="logo-full" />
      </div>
      <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
      <p>Secure your spot at the next year's biggest coding conference.</p>

      <div
        className="details"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <small
          style={{
            color: "#fff",
            marginLeft: "-220px",
            marginBottom: "10px",
            fontSize: "12px",
            fontWeight: "200",
          }}
        >
          Upload Avatar
        </small>
        <div
          className="icon-info"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <img
            src={image}
            alt="Uploaded Image or Default Icon"
            className="icon-upload"
          />

          <small>Drag and drop or click to upload </small>
          <input
            type="file"
            id="fileInput"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        {error && (
          <small style={{ color: "red", marginTop: "5px" }}>{error}</small>
        )}
        <div className="icon-infos-text">
          <img src={iconinfo} alt="Icon Info" className="icon-infos" />
          <small>Upload your photo (JPG or PNG, max size: 5MB)</small>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <ul>
            <li>
              <small>Full Name</small>
              <input
                type="text"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <small style={{ color: "red" }}>{formik.errors.fullName}</small>
              )}
            </li>
            <li>
              <small>Email Address</small>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <small style={{ color: "red" }}>{formik.errors.email}</small>
              )}
            </li>
            <li>
              <small>GitHub Username</small>
              <input
                type="text"
                name="github"
                placeholder="@yourusername"
                value={formik.values.github}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.github && formik.errors.github && (
                <small style={{ color: "red" }}>{formik.errors.github}</small>
              )}
            </li>
            <li>
              <button className="btn" type="submit">
                Generate My Ticket
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default InviteForm;
