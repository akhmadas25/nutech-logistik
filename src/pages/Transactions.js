import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { API } from "../config/api";

const columns = [
  { field: "produk", headerName: "Produk", width: 200 },
  { field: "harga_jual", headerName: "Harga Jual", width: 250 },
  { field: "harga_beli", headerName: "Harga Beli", width: 250 },
  {
    field: "stok",
    headerName: "Stok",
    type: "number",
    width: 90,
  },
];

export default function Transactions() {
  const [Products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await API.get("/products?populate=image");
    setProducts(response.data.data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  const rows=[]

  console.log(Products);
  return (
    <div className="container-fluid text-center py-5 bg-light">
      <div style={{ height: 400, width: "100%" }} className="my-5">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
