import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuotationById, approveQuotation, rejectQuotation } from "../../Services/Api";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const QuotationDetail = () => {
    const { id } = useParams();
    const [quotation, setQuotation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const toast = useRef(null);

    useEffect(() => {
        const fetchQuotation = async () => {
            try {
                const data = await getQuotationById(id, token);
                
                
                setQuotation(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch quotation details.");
                setLoading(false);
            }
        };

        const fetchUserRole = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            setRole(user?.role);
        };

        fetchUserRole();
        fetchQuotation();
    }, [id, token]);

    const handleApproval = async (status) => {
        try {
            if (status === "approve") {
                await approveQuotation(id, token);
            } else {
                await rejectQuotation(id, token);
            }

            setQuotation((prev) => ({
                ...prev,
                status: status === "approve" ? "Approved" : "Rejected",
            }));
            toast.current.show({
                severity: "success",
                summary: "Status Updated",
                detail: `Quotation marked as ${status}`,
                life: 3000,
            });
        } catch (err) {
            console.error("Error updating quotation status:", err);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to update quotation status",
                life: 3000,
            });
        }
    };

    const handleEdit = (quotation) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.role === 'admin') {
            navigate(`/admin/quotation/edit/${quotation._id}`, { state: quotation });
        } else if (user?.role === 'user') {
            navigate(`/quotation/edit/${quotation._id}`, { state: quotation });
        } else {
            navigate(`/`);
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading quotation details...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <Toast ref={toast} />
            <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-4xl mt-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Quotation Details</h2>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{quotation.designName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-[#f8fafc] p-4 rounded-lg shadow-md">
                        <p className="font-semibold">Fabric:</p>
                        <p>{quotation.fabric}</p>
                    </div>
                    <div className="bg-[#f8fafc] p-4 rounded-lg shadow-md">
                        <p className="font-semibold">Fabric Type:</p>
                        <p>{quotation.fabricType}</p>
                    </div>
                    <div className="bg-[#f8fafc] p-4 rounded-lg shadow-md">
                        <p className="font-semibold">Colors:</p>
                        <p>{quotation.colors.join(", ")}</p>
                    </div>
                    <div className="bg-[#f8fafc] p-4 rounded-lg shadow-md">
                        <p className="font-semibold">Quantity:</p>
                        <p>{quotation.quantity}</p>
                    </div>
                    <div className="bg-[#f8fafc] p-4 rounded-lg shadow-md">
                        <p className="font-semibold">Total Price:</p>
                        <p>${quotation.totalPrice}</p>
                    </div>
                    <div className="bg-[#f8fafc] p-4 rounded-lg shadow-md">
                        <p className="font-semibold">Status:</p>
                        <p>{quotation.status}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* Admin-specific actions */}
                    {role === "admin" && (
                        <div className="flex space-x-2">
                            <Button
                                label="Approve"
                                icon="pi pi-check"
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => handleApproval("approve")}
                                disabled={quotation.status === "Approved"}
                            />
                            <Button
                                label="Reject"
                                icon="pi pi-times"
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleApproval("reject")}
                                disabled={quotation.status === "Rejected"}
                            />
                        </div>
                    )}

                    {/* Common Edit button for both Admin and User */}
                    {(role === "admin" || role === "user") && (
                        <Button
                            label="Edit"
                            icon="pi pi-pencil"
                            className="bg-yellow-500 hover:bg-yellow-600"
                            onClick={() => handleEdit(quotation)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuotationDetail;
