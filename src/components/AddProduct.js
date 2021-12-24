import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@material-ui/core";
import { API } from "../config/api";
import axios from "axios";

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

  const [files, setFiles] = useState([]);

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

      const config = {
        headers: {
          "Content-type": "multipart/formdata",
        },
      };

      const formData = new FormData();
      formData.append("image", files[0], files[0].name)
      formData.set("title", form.title);
      formData.set("harga_jual", form.harga_jual);
      formData.set("harga_beli", form.harga_beli);
      formData.set("stok", form.stok);
      await API.post("/products?populate=image", config, formData)
        .then( (response) => {
          console.log(response);
          //after success
          //   const imageId = response.data[0].id;
          //   console.log(imageId);
          //   setForm({
          //     ...form,
          //     image: imageId,
          //   });
          //   const body = JSON.stringify(form);
          //   console.log(body);
          //   const data = await API.post("/products", body);
          //   console.log(data);
        })
        .catch((error) => {
          //handle error
          console.log(error);
        });

      console.log(files[0].name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("coba");
  }, []);

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
              onChange={(e) => setFiles(e.target.files)}
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
