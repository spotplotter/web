import React from "react";
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { InferenceResponse } from "../types";

interface ResultsDisplayProps {
  results: InferenceResponse;
  uploadedImage: string | null; // Image URL to display
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, uploadedImage }) => {
  // If there's no uploaded image, don't show anything
  if (!uploadedImage) return null;

  // Sort predictions by confidence (highest to lowest)
  const sortedPredictions = [...results.predictions].sort(
    (a, b) => b.confidence - a.confidence
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Inference Results
      </Typography>

      {/* Image Preview Section */}
      <Box display="flex" justifyContent="center" mb={3}>
        <Card sx={{ maxWidth: 300, p: 2 }}>
          <img src={uploadedImage} alt="Uploaded Preview" style={{ width: "100%", borderRadius: "8px" }} />
        </Card>
      </Box>

      {/* Best Prediction Section */}
      <Card sx={{ mb: 3, p: 2, backgroundColor: "#f0f0f0" }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Best Prediction: {results.best_prediction.predicted_class}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Confidence: {(results.best_prediction.confidence * 100).toFixed(2)}%
          </Typography>
        </CardContent>
      </Card>

      {/* Predictions Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Predicted Class</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Confidence (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPredictions.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.predicted_class}</TableCell>
                <TableCell>{(result.confidence * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultsDisplay;
