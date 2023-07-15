"use client";
import {
  browserSupportsWebAuthn,
  startRegistration,
} from "@simplewebauthn/browser";
import React, { useEffect, useState } from "react";

export default function RegistrationForm() {
  const [isSupported, setIsSupported] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (browserSupportsWebAuthn()) {
      setIsSupported(true);
    }
  }, []);

  const handleRegistration = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const resp = await fetch("/api/generate-registration-options");
      const options = await resp.json();

      const attResp = await startRegistration(options);

      const verificationResp = await fetch("/api/verify-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attResp),
      });

      const verificationJSON = await verificationResp.json();

      if (verificationJSON && verificationJSON.verified) {
        setSuccessMessage("Success!");
      } else {
        setErrorMessage(
          `Oh no, something went wrong! Response: ${JSON.stringify(
            verificationJSON
          )}`
        );
      }
    } catch (error: any) {
      if (error.name === "InvalidStateError") {
        setErrorMessage(
          "Error: Authenticator was probably already registered by user"
        );
      } else {
        setErrorMessage(error.toString());
      }
    }
  };

  if (!isSupported) {
    return <div>WebAuthn is not supported in this browser</div>;
  }

  return (
    <div>
      <h1>WebAuthn Registration</h1>
      <br />
      <button id="btnBegin" onClick={handleRegistration}>
        Begin Registration
      </button>
      <br />
      <span id="success">{successMessage}</span>
      <br />
      <span id="error">{errorMessage}</span>
    </div>
  );
};

