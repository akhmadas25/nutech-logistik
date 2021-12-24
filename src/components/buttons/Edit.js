import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@material-ui/core";
import { api, API } from "../../config/api";
import { Redirect, useHistory, useLocation } from "react-router";

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

function Edit({ dataId }) {
  const [form, setForm] = useState({
    data: { stok: "" },
  });
  const [stok, setStok] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  const history = useHistory()
  const handleChange = (e) => {
    setForm({
      ...form,
      data: {
        [e.target.name]: e.target.value,
      },
    });
    setStok(e.target.value);
  };

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
    
      console.log(stok);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);

      const response = await API.put(`/products/${dataId}`, {"data": {"stok": stok}});
      setOpen(false)
      history.push("/dashboard")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="btn btn-warning text-light" onClick={handleOpen}>
        update stok
      </button>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Box component="form" onSubmit={handleEdit} sx={style}>
          <Typography
            className="text-center"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Edit stock
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="stok"
            label="stock"
            type="number"
            onChange={handleChange}
          />
          <div className="container mt-5 d-flex justify-content-between">
            <button className="btn btn-danger">cancel</button>
            <button type="submit" className="btn btn-success">
              save
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Edit;
