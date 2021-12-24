import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@material-ui/core";
import { API } from "../config/api";

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

function AddProduct() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles] = useState(null);
  const [form, setForm] = useState({
    title: "",
    image: "",
    harga_jual: "",
    harga_beli: "",
    stok: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("files", files);

      API.post("/upload", formData)
        .then(function (response) {
          // handle success
          API.post("/products?populate=image", {
            data: {
              title: form.title,
              stok: form.stok,
              harga_jual: form.harga_jual,
              harga_beli: form.harga_beli,
              image: response.data[0].id,
            },
          }).then(function (response) {
            console.log(response);
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="btn btn-warning" onClick={handleOpen}>
        add product
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <Typography>Add Product</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="product title"
            name="title"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="stok"
            label="stock"
            type="number"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="harga_jual"
            label="sell price"
            type="number"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="harga_beli"
            label="buy price"
            type="number"
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Choose image
            <input
              type="file"
              hidden
              name="image"
              onChange={(e) => setFiles(e.target.files[0])}
            />
          </Button>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddProduct;
