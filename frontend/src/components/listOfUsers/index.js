import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem",
};

export default function ListOfUSersModal({
  isOpen,
  modalFor,
  data,
  handleClose,
  handleUserDeleteOrRetain,
}) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Existing {modalFor?.split("_").join(" ")}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bolder" }}>ID</TableCell>
                    <TableCell style={{ fontWeight: "bolder" }}>Name</TableCell>
                    <TableCell style={{ fontWeight: "bolder" }}>
                      Email
                    </TableCell>
                    <TableCell style={{ fontWeight: "bolder" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell style={{ textTransform: "capitalize" }}>
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => {
                            handleUserDeleteOrRetain(row.id, row.status);
                            handleClose();
                          }}
                          size="small"
                        >
                          {row.status === "ACTIVE" ? "Delete" : "Retain"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
