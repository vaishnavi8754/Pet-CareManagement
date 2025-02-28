import React, { useState, useEffect } from "react";
import postPet from "./images/postPet.png";
import { useAuthContext } from "../../hooks/UseAuthContext";

const PostPetSection = () => {
  const { user } = useAuthContext();
  const [petStatus, setPetStatus] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [area, setArea] = useState("");
  const [justification, setJustification] = useState("");
  const [posterName, setPosterName] = useState("");
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("");
  const [daysInLocation, setDaysInLocation] = useState("");
  const [formError, setFormError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [type, setType] = useState("None");
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSubmitting) {
      setEmailError(false);
      setFormError(false);
    }
  }, [isSubmitting]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return emailPattern.test(email);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicture(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    }

    if (
      !email ||
      !fileName ||
      type === "None" ||
      (petStatus === "HomePet" && (!name || !age || !area || !justification || !phone)) ||
      (petStatus === "HomelessPet" && (!posterName || !phone || !area || !daysInLocation))
    ) {
      setFormError(true);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("type", type);
    formData.append("area", area);
    formData.append("picture", picture);

    if (petStatus === "HomePet") {
      formData.append("name", name);
      formData.append("age", age);
      formData.append("justification", justification);
      formData.append("phone", phone);
    } else {
      formData.append("posterName", posterName);
      formData.append("phone", phone);
      formData.append("daysInLocation", daysInLocation);
    }

    try {
      const response = await fetch("http://localhost:4000/services", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Form submitted successfully");

      setEmailError(false);
      setFormError(false);
      setName("");
      setAge("");
      setArea("");
      setJustification("");
      setPosterName("");
      setEmail(user.email);
      setPhone("");
      setPicture(null);
      setFileName("");
      setDaysInLocation("");
      togglePopup();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="post-pet-section">
      <h2>Post a Pet for Adoption</h2>
      <img src={postPet} alt="Pet Looking for a Home" />

      <div className="pet-status-toggle">
        <label>
          <input
            type="radio"
            value="Home Pet"
            checked={petStatus === "HomePet"}
            onChange={() => setPetStatus("HomePet")}
          />
          Home Pet
        </label>
        <label>
          <input
            type="radio"
            value="Homeless Pet"
            checked={petStatus === "HomelessPet"}
            onChange={() => setPetStatus("HomelessPet")}
          />
          Homeless Pet
        </label>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {petStatus === "HomePet" && (
          <>
            <div className="input-box">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Pet Age:</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="input-box">
              <h3>Justification for giving a pet</h3>
              <textarea
                rows="4"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
              ></textarea>
            </div>
            <div className="input-box">
              <label>Phone No:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}

        {petStatus === "HomelessPet" && (
          <>
            <div className="input-box">
              <label>Poster Name:</label>
              <input
                type="text"
                value={posterName}
                onChange={(e) => setPosterName(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Phone No:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Days in Location:</label>
              <input
                type="text"
                value={daysInLocation}
                onChange={(e) => setDaysInLocation(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="input-box">
          <label>Picture:</label>
          <label className="file-input-label">
            <span className="file-input-text">
              {fileName || "Choose a Picture"}
            </span>
            <input
              className="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="input-box">
          <label>Location:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        <div className="filter-selection-service">
          <label>Type:</label>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="None">None</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="input-box">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {emailError && (
          <p className="error-message">Please provide a valid email address.</p>
        )}
        {formError && (
          <p className="error-message">Please fill out all fields correctly.</p>
        )}

        <button type="submit" className="cta-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Your Pet"}
        </button>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h4>Application Submitted; we'll get in touch with you soon.</h4>
            </div>
            <button onClick={togglePopup} className="close-btn">
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default PostPetSection;
