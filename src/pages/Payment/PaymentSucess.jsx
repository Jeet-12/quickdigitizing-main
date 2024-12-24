import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SuccessOrder = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect after 5 seconds
        const timer = setTimeout(() => {
            navigate("/order");
        }, 5000);

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-600">
                    Thank you for your order. We are processing it and you will be
                    redirected shortly.
                </p>
                <div className="mt-6">
                    <button
                        onClick={() => navigate("/order")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
                    >
                        Go to Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessOrder;
