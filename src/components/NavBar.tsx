import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SpotPlot
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
