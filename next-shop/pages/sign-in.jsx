import React, { useRef } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input";
import Label from "../components/Label";
import Page from "../components/Page";

export default function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleOnsubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const data = { email, password };
    console.log("[form submitted]", data);
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
