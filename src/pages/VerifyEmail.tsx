import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Typography, CircularProgress, Button, Box } from "@mui/material";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("Invalid verification link.");
      setLoading(false);
      return;
    }

    // Send verification request to API
    fetch(`http://localhost:8000/api/v1/user/verify-email?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setMessage("Email successfully verified! You can now log in.");
        } else {
          setError("Verification failed. The link may be expired or invalid.");
        }
      })
      .catch(() => setError("Something went wrong."))
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Typography color="primary">{message}</Typography>
      )}

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
