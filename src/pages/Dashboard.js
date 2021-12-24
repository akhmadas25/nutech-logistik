import React, { useEffect, useState } from "react";
import { API } from "../config/api";
import AddProduct from "../components/AddProduct";
import Edit from "../components/buttons/Edit";
import Delete from "../components/buttons/Delete";

const Dashboard = () => {
  const [Products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await API.get("/products?populate=image");
    setProducts(response.data.data);
  };
  useEffect(() => {
    getProducts();
  }, [Products]);

  return (
    <div className="container-fluid text-center bg-light py-5">
      <div>
        <div class="container">
          <div className="text-end mt-5 mb-3 ">
            <AddProduct />
          </div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
            {Products.map((item, index) => {
              return (
                <div class="col ">
                  <div class="card shadow-md px-3">
                    <img
                      src={item.attributes.image.data.attributes.url}
                      alt=""
                      style={{ maxHeight: "40vh" }}
                      className="mt-3"
                    />

                    <div class="card-body ">
                      <div class="d-flex justify-content-between align-items-center">
                        <h5 className="text-start">{item.attributes.title}</h5>
                        <h5 className=" px-2 alert-success">
                          {item.attributes.stok}
                        </h5>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <p className=" text-start">
                          {"harga beli : Rp,"}
                          {item.attributes.harga_beli}
                        </p>
                        <p className=" text-end">
                          {"harga jual : Rp,"}
                          {item.attributes.harga_jual}
                        </p>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-3">
                        <Edit dataId={item.id} />
                        <Delete dataId={item.id} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
