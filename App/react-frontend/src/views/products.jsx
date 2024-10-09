import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function Products() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);

    const [supplier, setSupplier] = useState({
        id: null,
        supplierName: "",
        contactPerson: "",
        phone: "",
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/supplier/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setSupplier({
                        id: data.id || null,
                        supplierName: data.supplierName || "",
                        contactPerson: data.contactPerson || "",
                        phone: data.phone || "",
                    });
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    useEffect(() => {
        getProducts();
    }, [id]); 

    const getProducts = () => {
        setLoading(true);
        axiosClient
            .get(`/products`)
            .then(({ data }) => {
                setLoading(false);
                const filteredProducts = data.data.filter(
                    (product) => product.supplierId === parseInt(id)
                );
                setProduct(filteredProducts);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    
    const containerStyle = {
        padding: "20px",
        maxWidth: "800px",
        margin: "20px auto",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    };

    const headingStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #ddd",
        paddingBottom: "10px",
        marginBottom: "20px",
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
    };

    const thStyle = {
        borderBottom: "2px solid #ddd",
        padding: "10px",
        textAlign: "left",
        backgroundColor: "#f2f2f2",
        fontWeight: "bold",
    };

    const tdStyle = {
        borderBottom: "1px solid #ddd",
        padding: "10px",
    };

    const imageStyle = {
        width: "100px",
        height: "auto",
        borderRadius: "4px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    };

    const loadingStyle = {
        textAlign: "center",
        fontSize: "18px",
        marginTop: "20px",
    };

    return (
        <div style={containerStyle}>
            <div style={headingStyle}>
                <h1 style={{ fontSize: "24px", color: "#333" }}>
                    Products: {supplier.supplierName}
                </h1>
                <Link
                    className="btn-add"
                    to={`/product/${id}`}
                    style={{
                        backgroundColor: "#007bff", 
                        color: "#fff",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        textDecoration: "none",
                    }}
                >
                    New Product
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Product Name</th>
                            <th style={thStyle}>Product Price</th>
                            <th style={thStyle}>Image</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="4" style={loadingStyle}>
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {product.map((u) => (
                                <tr key={u.id}>
                                    <td style={tdStyle}>{u.id}</td>
                                    <td style={tdStyle}>{u.productName}</td>
                                    <td style={tdStyle}>
                                        {u.productPrice} LKR
                                    </td>
                                    <td style={tdStyle}>
                                        <img
                                            src={`http://localhost/Project/App/storage/app/public/${u.image}`}
                                            alt={u.productName}
                                            style={imageStyle}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
