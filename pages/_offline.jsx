import React from "react";
import Page from "../components/Page";

const fallback = () => (
  <Page title="fallback">
    <div>
      <h1>This is fallback page when device is offline </h1>
      <small>Route will fallback to this page</small>
    </div>
  </Page>
);

export default fallback;
