import React, { useRef, useState } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input";
import Label from "../components/Label";
import Page from "../components/Page";
import { fetchJson } from "../lib/api.js";

export default function Signin() {
  const [status, setStatus] = useState({ loading: false, error: false });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleOnsubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: false });
    const identifier = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await fetchJson(`http://127.0.0.1:1337/api/auth/local`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      setStatus({ loading: false, error: false });

      console.log("signin response", response);
    } catch (error) {
      setStatus({ loading: false, error: true });
    }
  };
  const { loading, error } = status;
  return (
    <Page title="Sign in">
      <form onSubmit={handleOnsubmit}>
        <Label label="Email">
          <Input type="email" ref={emailRef} required />
        </Label>
        <Label label="Password">
          <Input type="Password" ref={passwordRef} required />
        </Label>
        {error && <p className="text-red-500">Invalid credential!!!</p>}

        <Button type="submit" disabled={!loading}>
          Submit
        </Button>
      </form>
    </Page>
  );
}
