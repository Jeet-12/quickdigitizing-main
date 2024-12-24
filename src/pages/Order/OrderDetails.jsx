import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "../../Services/Api"; // Adjust the path as needed
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FaEdit, FaCheckCircle, FaFileUpload } from "react-icons/fa";
import axios from "axios";

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("");
    const [role, setRole] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [digitalImage, setDigitalImage] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const toast = useRef(null);
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal
    const [imageUrl, setImageUrl] = useState(""); // Image URL
    let orderId = id;
    


    const openModal = () => {
        setImageUrl(`http://localhost:4040/${order.previewImage}`)
        console.log(imageUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setRole(user.role);

        const fetchOrder = async () => {
            try {
                const data = await getOrderById(id, token);
                setOrder(data);
                console.log(data);

                setStatus(data.status);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch order details.");
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id, token]);

    const createPaypalOrder = async () => {
        setLoading(true);
        console.log(token, orderId)
        try {
            const { data } = await axios.post(
                'http://localhost:4040/api/payment/paypal/create-payment',
                { "orderId" : orderId},
                {
                    headers: {
                        'x-auth-token': token,
                    }
                })
            // Redirect user to PayPal approval URL
            console.log(data);
            window.location.href = data.links;
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create PayPal order.",
            });
            setLoading(false);
        }
    };

    const capturePaypalPayment = async (paypalOrderId) => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/paypal/capture-payment`, { paypalOrderId });
            toast.current.show({
                severity: "success",
                summary: "Payment Successful",
                detail: "Payment captured successfully.",
            });

            navigate("/order");
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to capture payment.",
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const paypalOrderId = query.get("paypalOrderId");

        if (paypalOrderId) {
            capturePaypalPayment(paypalOrderId);
        }
    }, []);


    const handleStatusUpdate = async (newStatus) => {
        try {
            await updateOrderStatus(id, newStatus, token);
            setOrder((prev) => ({ ...prev, status: newStatus }));
            setStatus(newStatus);
            toast.current.show({
                severity: "success",
                summary: "Status Updated",
                detail: `Order marked as ${newStatus}`,
                life: 3000,
            });
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to update order status",
                life: 3000,
            });
        }
    };

    const handlePayment = () => {
        navigate(`/payment/${order._id}`); // Navigate to payment page
    };

    const handleImageUpload = (e, type) => {
        const file = e.target.files[0];

        if (type === "preview") {
            const validImageTypes = ["image/png", "image/jpeg", "application/pdf"];
            if (file && validImageTypes.includes(file.type)) {
                setPreviewImage(file);
                toast.current.show({
                    severity: "success",
                    summary: "File Uploaded",
                    detail: "Preview image uploaded successfully.",
                    life: 3000,
                });
            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Invalid File",
                    detail: "Please upload a valid image (PNG, JPEG) or PDF.",
                    life: 3000,
                });
            }
        } else if (type === "digital") {
            const validDigitalTypes = ["application/zip", "application/x-zip-compressed", "multipart/x-zip"];
            const isZipFile = file?.name.toLowerCase().endsWith(".zip");
            if (file && (validDigitalTypes.includes(file.type) || isZipFile)) {
                setDigitalImage(file);
                toast.current.show({
                    severity: "success",
                    summary: "File Uploaded",
                    detail: "Digital file uploaded successfully.",
                    life: 3000,
                });
            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Invalid File",
                    detail: "Please upload a valid .zip file.",
                    life: 3000,
                });
            }
        }
    };

    const handleSubmit = async () => {
        if (previewImage && digitalImage) {
            const formData = new FormData();
            formData.append("previewImage", previewImage);
            formData.append("digitalImage", digitalImage);

            try {
                const response = await fetch(`http://localhost:4040/api/order/${id}/update-images`, {
                    method: "PATCH",
                    headers: {
                        "x-auth-token": token,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    toast.current.show({
                        severity: "success",
                        summary: "Images Uploaded",
                        detail: result.message,
                        life: 3000,
                    });
                } else {
                    throw new Error("Failed to upload images.");
                }
            } catch (error) {
                toast.current.show({
                    severity: "error",
                    summary: "Upload Error",
                    detail: error.message,
                    life: 3000,
                });
            }
        } else {
            toast.current.show({
                severity: "error",
                summary: "Missing Images",
                detail: "Please upload both images before submitting.",
                life: 3000,
            });
        }
    };

    const handleEdit = () => {
        if (role === "admin") {
            navigate(`/admin/order/edit/${order._id}`, { state: order });
        } else if (role === "user") {
            navigate(`/order/edit/${order._id}`, { state: order });
        } else {
            navigate(`/`);
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading order details...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4  min-h-screen bg-white">
            <Toast ref={toast} />
            <div className="bg-white shadow-xl rounded-lg p-6 mx-auto max-w-4xl mt-8">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6">Order Details</h2>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">{order.designName}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#f8fafc] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        <p className="font-semibold text-lg">Fabric:</p>
                        <p>{order.fabric}</p>
                    </div>
                    <div className="bg-[#f8fafc] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        <p className="font-semibold text-lg">Fabric Type:</p>
                        <p>{order.fabricType}</p>
                    </div>
                    <div className="bg-[#f8fafc] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        <p className="font-semibold text-lg">Colors:</p>
                        <p>{order.colors.join(", ")}</p>
                    </div>
                    <div className="bg-[#f8fafc] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        <p className="font-semibold text-lg">Quantity:</p>
                        <p>{order.quantity}</p>
                    </div>
                    <div className="bg-[#f8fafc] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        <p className="font-semibold text-lg">Total Price:</p>
                        <p>${order.totalPrice}</p>
                    </div>
                    <div className="bg-[#f8fafc] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        <p className="font-semibold text-lg">Status:</p>
                        {role === 'admin' ? (
                            <select
                                value={status}
                                onChange={(e) => handleStatusUpdate(e.target.value)}
                                className="mt-2 w-full border-2 border-gray-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-green-500 transition-all duration-200"
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="complete">Complete</option>
                            </select>
                        ) : (
                            <p className="mt-2 text-xl">{status}</p> // Display status for users
                        )}
                    </div>
                </div>

                {/* File Upload */}
                {role === "admin" && status === "complete" && (
                    <div className="mb-8">
                        <h4 className="font-semibold text-2xl">Upload Files</h4>
                        <div className="flex gap-4 mb-4">
                            <div>
                                <Button
                                    label="Upload Preview"
                                    onClick={() => document.getElementById("file-preview").click()}
                                    icon={<FaFileUpload />}
                                    className="p-button-outlined p-button-rounded w-full"
                                />
                                <input
                                    type="file"
                                    id="file-preview"
                                    accept="image/*,application/pdf"
                                    onChange={(e) => handleImageUpload(e, "preview")}
                                    className="hidden"
                                />
                            </div>
                            <div>
                                <Button
                                    label="Upload Digital File"
                                    onClick={() => document.getElementById("file-digital").click()}
                                    icon={<FaFileUpload />}
                                    className="p-button-outlined p-button-rounded w-full"
                                />
                                <input
                                    type="file"
                                    id="file-digital"
                                    accept=".zip"
                                    onChange={(e) => handleImageUpload(e, "digital")}
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                label="Submit"
                                icon={<FaCheckCircle />}
                                onClick={handleSubmit}
                                className="p-button-success p-button-rounded w-full"
                            />
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                {role === "admin" ? (
                    <div className="flex justify-between mt-8">
                        <Button
                            label="Edit Order"
                            icon={<FaEdit />}
                            onClick={handleEdit}
                            className="p-button-primary p-button-rounded w-1/3"
                        />
                        <Button
                            label="Go Back"
                            icon="pi pi-arrow-left"
                            onClick={() => navigate("/admin/order")}
                            className="p-button-secondary p-button-rounded w-1/3"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        {/* Make Transaction Button */}
                        <Button
                            label="Make Transaction"
                            icon="pi pi-money-bill"
                            className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                            onClick={createPaypalOrder}
                            disabled={loading}
                        />

                        {/* Open Preview Button */}
                        {role === "user" && status === "complete" ? (
                            <button
                                onClick={openModal}
                                className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                            >
                                Open Preview
                            </button>
                        ) : null}
                    </div>



                )}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                            >
                                &times;
                            </button>
                            <h4 className="text-2xl font-semibold mb-4">Image Preview</h4>
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="w-full h-auto rounded-lg"
                            />
                            <p className="text-gray-500 text-sm mt-2">
                                *This image is watermarked for preview purposes.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;
