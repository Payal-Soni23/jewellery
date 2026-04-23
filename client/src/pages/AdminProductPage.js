import React, { useState } from "react";
import { createProduct } from "../api/products";

const AdminProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    type: "",
    description: "",
    images: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setMessage("");

      await createProduct({
        ...formData,
        price: Number(formData.price),
        images: formData.images.split(",").map((value) => value.trim()).filter(Boolean),
      });

      setMessage("Product created successfully");
      setFormData({
        name: "",
        price: "",
        category: "",
        type: "",
        description: "",
        images: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create product");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Admin Product Panel</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Product Name</label>
                    <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price</label>
                    <input className="form-control" type="number" name="price" value={formData.price} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <input className="form-control" name="category" value={formData.category} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Type</label>
                    <input className="form-control" name="type" value={formData.type} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URLs</label>
                  <input className="form-control" name="images" value={formData.images} onChange={handleChange} placeholder="/images/rings/1.png, /images/rings/1-2.png" />
                </div>
                {message ? <div className="alert alert-success">{message}</div> : null}
                {error ? <div className="alert alert-danger">{error}</div> : null}
                <button className="btn btn-dark" type="submit">Create Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductPage;
