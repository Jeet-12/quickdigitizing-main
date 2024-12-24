import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { deleteQuotation, getQuotations } from "../../Services/Api";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Card } from "primereact/card";
import { FaSearch } from "react-icons/fa"; // Importing the search icon

const themeColor = "#93C572"; // Theme color

const ListQuotation = () => {
    const navigate = useNavigate();
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const toast = useRef(null);
    const token = localStorage.getItem("token");
    

    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const data = await getQuotations(token);
                console.log(data);
                setQuotations(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch quotations.");
                setLoading(false);
                toast.current.show({ severity: "error", summary: "Error", detail: "Failed to fetch quotations.", life: 3000 });
            }
        };

        if (token) {
            fetchQuotations();
        } else {
            setLoading(false);
            setError("User is not authenticated.");
            toast.current.show({ severity: "error", summary: "Authentication Error", detail: "User is not authenticated.", life: 3000 });
        }
    }, [token]);

    const handleView = (quotation) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const route = user?.role === 'admin' ? `/admin/quotation/${quotation._id}` : `/quotation/${quotation._id}`;
        navigate(route);
    };

    const handleDelete = (quotation) => {
        confirmDialog({
            message: `Are you sure you want to delete quotation "${quotation.designName}"?`,
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => performDelete(quotation),
        });
    };

    const performDelete = async (quotation) => {
        try {
            await deleteQuotation(quotation._id, token);
            setQuotations(prev => prev.filter(q => q._id !== quotation._id));
            toast.current.show({ severity: "success", summary: "Deleted", detail: "Quotation deleted successfully.", life: 3000 });
        } catch (err) {
            toast.current.show({ severity: "error", summary: "Error", detail: "Failed to delete the quotation.", life: 3000 });
        }
    };

    const renderColors = (colors) => colors.join(", ");

    // Filter quotations based on search query
    const filteredQuotations = quotations.filter(quotation =>
        quotation.designName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Your Quotations</h2>
                    <Button
                        label="Add Quote"
                        icon="pi pi-plus"
                        className="p-button p-button-outlined"
                        style={{ backgroundColor: themeColor, borderColor: themeColor, color: "white" }}
                        onClick={() => navigate("form")}
                    />
                </div>

                {/* Search Box */}
                <div className="relative w-full md:w-1/4 mb-6 ml-auto"> {/* Right-aligned and smaller width */}
                    <FaSearch className="absolute left-3 top-3 text-gray-400" /> {/* Search icon */}
                    <input
                        type="text"
                        placeholder="Search by design name..."
                        className="border border-gray-300 rounded-lg p-2 pl-10 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-[rgb(147,197,114)] transition duration-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="text-lg text-gray-500 animate-pulse">Loading quotations...</span>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="text-lg text-red-500">{error}</span>
                    </div>
                ) : filteredQuotations.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="text-lg text-gray-500">No quotations found.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredQuotations.map((quotation) => (
                            <Card
                                key={quotation._id}
                                className="p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
                                style={{ backgroundColor: "#f9fafb" }}
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{quotation.designName}</h3>
                                <p className="text-gray-500 text-sm mb-1">
                                    <strong>Fabric:</strong> {quotation.fabric}
                                </p>
                                <p className="text-gray-500 text-sm mb-1">
                                    <strong>Fabric Type:</strong> {quotation.fabricType}
                                </p>
                                <p className="text-gray-500 text-sm mb-1">
                                    <strong>Colors:</strong> {renderColors(quotation.colors)}
                                </p>
                                <p className="text-gray-500 text-sm mb-3">
                                    <strong>Quantity:</strong> {quotation.quantity}
                                </p>
                                <div className="flex justify-between items-center">
                                    <Button
                                        label="View"
                                        icon="pi pi-eye"
                                        className="p-button-outlined p-button-success"
                                        style={{ backgroundColor: "rgb(147, 197, 114)" }}
                                        onClick={() => handleView(quotation)}
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-button-outlined p-button-danger"
                                        style={{ backgroundColor: "#D40000" }}
                                        onClick={() => handleDelete(quotation)}
                                    />
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListQuotation;
