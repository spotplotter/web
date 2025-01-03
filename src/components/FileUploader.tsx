import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Box, Button, CircularProgress, Typography, LinearProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { InferenceResponse } from "../types";

interface FileUploaderProps {
  onUploadComplete: (result: InferenceResponse) => void;
  onImageUpload: (imageUrl: string) => void; // Function to update image preview
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadComplete, onImageUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        handleUpload(file);
        const imageUrl = URL.createObjectURL(file); // Generate preview URL
        onImageUpload(imageUrl);
      }
    },
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<InferenceResponse>(
        "http://inference.spotplotter.com:8000/api/v1/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
      );

      onUploadComplete(response.data);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box textAlign="center" border={1} borderRadius={2} p={3} sx={{ borderStyle: "dashed" }} {...getRootProps()}>
      <input {...getInputProps()} />
      <Typography variant="h6" gutterBottom>
        Drag & drop an image or click to upload
      </Typography>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ mt: 2 }}
        disabled={uploading}
      >
        Select File
      </Button>

      {uploading && (
        <Box sx={{ mt: 2, width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2">{progress}%</Typography>
        </Box>
      )}

      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default FileUploader;
