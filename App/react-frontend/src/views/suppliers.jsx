import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import "./Suppliers.css";
import ConfirmationModal from "./ConfirmationModal.jsx";

export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState(null);

    useEffect(() => {
        getSuppliers(currentPage);
    }, [currentPage]);

    const getSuppliers = (page) => {
        setLoading(true);
        axiosClient
            .get(`/suppliers?page=${page}`)
            .then(({ data }) => {
                setLoading(false);
                setSuppliers(data.data);
                setTotalPages(data.meta.last_page);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredSuppliers = suppliers.filter(
        (u) =>
            u.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openModal = (supplier) => {
        setSupplierToDelete(supplier);
        setModalOpen(true);
    };

    const confirmDelete = () => {
        if (supplierToDelete) {
            axiosClient.delete(`/suppliers/${supplierToDelete.id}`).then(() => {
                getSuppliers(currentPage);
                setModalOpen(false);
            });
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Suppliers</h1>
                <Link className="btn-add" to="/supplier">
                    Add New
                </Link>
            </div>

            {/* Search Box */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    className="search"
                    type="text"
                    placeholder="Search by name or phone"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Supplier Name</th>
                            <th>Contact Person</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            filteredSuppliers.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.supplierName}</td>
                                    <td>{u.contactPerson}</td>
                                    <td>{u.phone}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={`/supplier/${u.id}`}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={() => openModal(u)}
                                        >
                                            Delete
                                        </button>
                                        &nbsp;
                                        <Link
                                            className="btn-view"
                                            to={`/products/${u.id}`}
                                        >
                                            Products
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination controls */}
                <div className="pagination">
                    <button
                        className="btn-page"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        className="btn-page"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
