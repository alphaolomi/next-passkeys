"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { useState } from "react";

export default function LoginForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await fetch("/api/generate-assertion-options");
    const options = await resp.json();
    const attResp = await startAuthentication(options);
    const verificationResp = await fetch("/api/verify-assertion", {
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
  };

  return (
    <div>
      <h1>LoginForm</h1>
      {successMessage && <span role="alert">{successMessage}</span>}
      {errorMessage && <span role="alert">{errorMessage}</span>}
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          Username:
          <input type="text" name="username" placeholder="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" placeholder="password" />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
