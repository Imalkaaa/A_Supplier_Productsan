import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({
        id: null,
        supplierName: "",
    });
    const [product, setProduct] = useState({
        supplierId: id,
        productName: "",
        productPrice: "",
        image: null,
    });

    const handleFileChange = (ev) => {
        const file = ev.target.files[0];
        setProduct({ ...product, image: file });
    };

    useEffect(() => {
        if (id) {
            axiosClient.get(`/supplier/${id}`).then(({ data }) => {
                setSupplier({
                    id: data.id || null,
                    supplierName: data.supplierName || "",
                });
            });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append("supplierId", product.supplierId);
        formData.append("productName", product.productName);
        formData.append("productPrice", product.productPrice);

        if (product.image) {
            formData.append("image", product.image);
        }

        axiosClient
            .post("/product", formData)
            .then(() => {
                navigate(`/products/${id}`);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.error("Validation Errors:", response.data.errors);
                } else {
                    console.error("An error occurred:", err);
                }
            });
    };

    // Inline styles
    const containerStyle = {
        padding: "20px",
        maxWidth: "600px",
        margin: "20px auto",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    };

    const headingStyle = {
        fontSize: "24px",
        color: "#333",
        marginBottom: "20px",
        textAlign: "center",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "4px",
        border: "1px solid #ccc",
    };

    const buttonStyle = {
        width: "100%",
        padding: "10px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    };

    const buttonHoverStyle = {
        backgroundColor: "#218838",
    };

    return (
        <>
            <div style={containerStyle}>
                <h1 style={headingStyle}>
                    Add New Product - {supplier.supplierName}
                </h1>
                <div className="card animated fadeInDown">
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            value={product.productName}
                            onChange={(ev) =>
                                setProduct({
                                    ...product,
                                    productName: ev.target.value,
                                })
                            }
                            placeholder="Product Name"
                            required
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            value={product.productPrice}
                            onChange={(ev) =>
                                setProduct({
                                    ...product,
                                    productPrice: ev.target.value,
                                })
                            }
                            placeholder="Product Price"
                            required
                            style={inputStyle}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            style={inputStyle}
                        />
                        <button
                            type="submit"
                            className="btn"
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                padding: "10px 15px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
