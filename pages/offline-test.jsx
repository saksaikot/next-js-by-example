import React from "react";
import Page from "../components/Page";

const OfflineTestPage = () => (
  <Page title="Offline Test Page">
    <div>
      <h1>This is Offline Test Page </h1>
      <small>
        You should not see this when you are offline and the page is not cached
      </small>
    </div>
  </Page>
);

export default OfflineTestPage;
