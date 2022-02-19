import React from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input";
import Label from "../components/Label";
import Page from "../components/Page";

export default function Signin() {
  return (
    <Page title="Sign in">
      <form>
        <Label label="Email">
          <Input type="text" />
        </Label>
        <Label label="Password">
          <Input type="Password" />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    </Page>
  );
}
