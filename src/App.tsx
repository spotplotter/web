import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, Typography } from "@mui/material";

import Navbar from "./components/NavBar";
import FileUploader from "./components/FileUploader";
import ResultsDisplay from "./components/ResultsDisplay";
import Register from "./pages/Register";
import { InferenceResponse } from "./types";

const App: React.FC = () => {
  const [results, setResults] = useState<InferenceResponse>({
    predictions: [],
    best_prediction: { predicted_class: "", confidence: 0 },
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <Router>
      <CssBaseline />
      <Navbar />

      <Routes>
        {/* Main Inference Page */}
        <Route
          path="/"
          element={
            <Container maxWidth="md">
              <Typography variant="h3" gutterBottom textAlign="center">
                SpotPlot Inference
              </Typography>
              <FileUploader onUploadComplete={setResults} onImageUpload={setUploadedImage} />
              <ResultsDisplay results={results} uploadedImage={uploadedImage} />
            </Container>
          }
        />

        {/* Registration Page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
