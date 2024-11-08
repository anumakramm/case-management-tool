import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function CaseManagementSnackbar({
  snackbarMessage,
  timeout,
  handleSnackbar,
  severity
}) {
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    handleSnackbar();
  };

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={timeout || 3000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {snackbarMessage} {/* Display custom message */}
      </Alert>
    </Snackbar>
  );
}
