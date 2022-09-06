import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

function EditModalProduct({
  productname,
  storename,
  sizeproduct,
  colorproduct,
  priceproduct,
  stockproduct,
  ratingproduct,
  id_category,
  id_seller,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState({
    productname: "",
    storename: "",
    sizeproduct: "",
    colorproduct: "",
    priceproduct: "",
    stockproduct: "",
    ratingproduct: "",
    id_category: "",
    id_seller: "",
  });

  const [photo, setPhoto] = useState(null);

  const handleUpload = (e) => {
    setPhoto(e.target.files[0]);
  };
  console.log(data);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("productname", data.productname);
    formData.append("storename", data.storename);
    formData.append("sizeproduct", data.sizeproduct);
    formData.append("colorproduct", data.colorproduct);
    formData.append("priceproduct", data.priceproduct);
    formData.append("stockproduct", data.stockproduct);
    formData.append("id_category", data.id_category);
    formData.append("id_seller", data.id_seller);
    formData.append("photo", photo);
    axios
      .put(`${process.env.REACT_APP_BACKEND}/product/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        Swal.fire("Updated!", "Your message has been updated.", "success");
        setShow(false);
      })
      .catch(() => {
        Swal.fire("Error!", "Your message has not been uodated.", "error");
        setShow(false);
      });
  };

  return (
    <>
      <button
        className="btn btn-dark text-light"
        style={{ marginRight: "10px" }}
        onClick={handleShow}
      >
        Edit
      </button>
      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleCreate}>
          <Modal.Body>
            <input
              className="form-control mt-3"
              type="text"
              placeholder="ID"
              name="id"
              value={data.id}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Product Name"
              name="productname"
              value={data.productname}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Store"
              name="storename"
              value={data.storename}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Size"
              name="sizeproduct"
              value={data.sizeproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Color"
              name="colorproduct"
              value={data.colorproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Price"
              name="priceproduct"
              value={data.priceproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Stock"
              name="stockproduct"
              value={data.stockproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Rating"
              name="ratingproduct"
              value={data.ratingproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Id Category"
              name="id_category"
              value={data.id_category}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Id Seller"
              name="id_seller"
              value={data.id_seller}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="file"
              placeholder="Photo"
              name="photo"
              onChange={handleUpload}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditModalProduct;
