import React, { useRef } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input";
import Label from "../components/Label";
import Page from "../components/Page";
// import { fetchJson } from "../lib/api.js";
import { useRouter } from "next/router";
// import { useMutation, useQueryClient } from "react-query";
import { useSignIn } from "../hooks/user.js";

export default function Signin() {
  const { signIn, signInError: error, signInLoading: loading } = useSignIn();

  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleOnsubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const user = await signIn({ email, password });
    if (user) {
      router.push("/");
    }
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
        {error && <p className="text-red-500">Invalid credential!!!</p>}

        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </Page>
  );
}
