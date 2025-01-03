import React, { useState } from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import FileUploader from "./components/FileUploader";
import ResultsDisplay from "./components/ResultsDisplay";
import { InferenceResponse } from "./types";

const App: React.FC = () => {
  const [results, setResults] = useState<InferenceResponse>({
    predictions: [],
    best_prediction: { predicted_class: "", confidence: 0 },
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Typography variant="h3" gutterBottom textAlign="center">
        SpotPlot Inference
      </Typography>
      <FileUploader onUploadComplete={setResults} onImageUpload={setUploadedImage} />
      <ResultsDisplay results={results} uploadedImage={uploadedImage} />
    </Container>
  );
};

export default App;
