import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@material-ui/core";
import { API } from "../../config/api";
import { useHistory } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Delete({ dataId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory()

  const handleDelete = async () => {
    const id = dataId;
    console.log(id);
    const response = await API.delete(`/products/${id}`);
    
    history.push("/dashboard");
  };

  return (
    <div>
      <button className="btn btn-danger text-white" onClick={handleOpen}>
        delete
      </button>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Box component="form" sx={style}>
          <Typography
            className="text-center"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Are you sure want to delete this item?
          </Typography>
          <div className="container mt-5 d-flex justify-content-between">
            <button className="btn btn-danger">No</button>
            <button className="btn btn-success" onClick={() => handleDelete()}>
              yes
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Delete;
