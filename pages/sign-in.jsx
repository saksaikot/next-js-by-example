import React, { useRef, useState } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input";
import Label from "../components/Label";
import Page from "../components/Page";
import { fetchJson } from "../lib/api.js";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export default function Signin() {
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const queryClient = useQueryClient();

  const signinMutation = useMutation(async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const user = await fetchJson(`/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return user;
  });
  const handleOnsubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await signinMutation.mutateAsync();
      console.log(user);
      queryClient.setQueryData("user", user);
      router.push("/");
      console.log("signin response", user);
    } catch (error) {
      //isError in signinMutation
    }
  };
  const { isloading: loading, isError: error } = signinMutation;
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
