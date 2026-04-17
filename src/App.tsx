import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app/globals.css";
import { Layout } from "./app/layout";
import { HomePage } from "./app/page";
import { JobsPage } from "./app/jobs/page";
import { UploadPage } from "./app/upload/page";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
