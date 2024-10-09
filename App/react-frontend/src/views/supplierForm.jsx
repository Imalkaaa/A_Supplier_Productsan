import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function SupplierForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({
        id: null,
        supplierName: "",
        contactPerson: "",
        phone: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

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

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (supplier.id) {
            axiosClient
                .put(`/supplier/${supplier.id}`, supplier)
                .then(() => {
                    navigate("/");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/supplier", supplier)
                .then(() => {
                    navigate("/");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

  
    const handlePhoneChange = (e) => {
        const { value } = e.target;
        if (/^\d{0,10}$/.test(value)) {
            setSupplier({ ...supplier, phone: value });
        }
    };

   
    const containerStyle = {
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
    };

    const cardStyle = {
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    };

    const headingStyle = {
        textAlign: "center",
        color: "#333",
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    };

    const inputStyle = {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "16px",
    };

    const buttonStyle = {
        padding: "10px",
        backgroundColor: "#007bff", 
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    };

    const buttonHoverStyle = {
        backgroundColor: "#0056b3", 
    };

    const alertStyle = {
        marginBottom: "20px",
        color: "red",
        backgroundColor: "#ffe5e5",
        padding: "10px",
        border: "1px solid red",
        borderRadius: "5px",
    };

    return (
        <div style={containerStyle}>
            {supplier.id ? (
                <h1 style={headingStyle}>
                    Update Supplier: {supplier.supplierName}
                </h1>
            ) : (
                <h1 style={headingStyle}>New Supplier</h1>
            )}
            <div style={cardStyle}>
                {loading && (
                    <div style={{ textAlign: "center" }}>Loading...</div>
                )}
                {errors && (
                    <div style={alertStyle}>
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form style={formStyle} onSubmit={onSubmit}>
                        <input
                            style={inputStyle}
                            value={supplier.supplierName}
                            onChange={(ev) =>
                                setSupplier({
                                    ...supplier,
                                    supplierName: ev.target.value,
                                })
                            }
                            placeholder="Supplier Name"
                            required
                        />
                        <input
                            style={inputStyle}
                            value={supplier.contactPerson}
                            onChange={(ev) =>
                                setSupplier({
                                    ...supplier,
                                    contactPerson: ev.target.value,
                                })
                            }
                            placeholder="Contact Person"
                            required
                        />
                        <input
                            style={inputStyle}
                            type="tel"
                            value={supplier.phone}
                            onChange={handlePhoneChange}
                            placeholder="Phone (10 digits)"
                            maxLength={10}
                            required
                        />
                        <button
                            style={buttonStyle}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    buttonHoverStyle.backgroundColor)
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    buttonStyle.backgroundColor)
                            }
                        >
                            Add
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
