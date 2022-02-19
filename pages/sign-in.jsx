import React, { useRef } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input";
import Label from "../components/Label";
import Page from "../components/Page";
import { fetchJson } from "../lib/api.js";

export default function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleOnsubmit = async (event) => {
    event.preventDefault();
    const identifier = emailRef.current.value;
    const password = passwordRef.current.value;
    const response = await fetchJson(`http://127.0.0.1:1337/api/auth/local`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    console.log("signin response", response);
  };
  return (
    <Page title="Sign in">
      <form onSubmit={handleOnsubmit}>
        <Label label="Email">
          <Input type="email" ref={emailRef} required />
        </Label>
        <Label label="Password">
          <Input type="Password" ref={passwordRef} required />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    </Page>
  );
}
