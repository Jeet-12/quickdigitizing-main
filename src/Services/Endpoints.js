const API_URL = 'http://localhost:4040/';

export const endpoints = {
    login: `${API_URL}api/auth/login`,
    register: `${API_URL}api/auth/register`,
    getAuthorizedUser: `${API_URL}api/auth/authorized-user`,
    changePassword: `${API_URL}api/auth/update-password`,
  // New quotation endpoints
    getQuotations: `${API_URL}api/quotation/`,
    getQuotationById: (id) => `${API_URL}api/quotation/${id}`,
    deleteQuotation: (id) => `${API_URL}api/quotation/${id}`,
    createQuotation: `${API_URL}api/quotation/create`,
    updateQuotation: (id) => `${API_URL}api/quotation/${id}`,


    getOrders: `${API_URL}api/order/`,
    getOrderById: (id) => `${API_URL}api/order/${id}`,
    deleteOrder: (id) => `${API_URL}api/order/${id}`,
    createOrder: `${API_URL}api/order/create`,
    updateOrder: (id) => `${API_URL}api/order/${id}`,


    approveQuotation: (id)=>`${API_URL}api/quotation/approve/${id}`,
    rejectQuotation: (id)=>`${API_URL}api/quotation/reject/${id}`,

    updateOrderStatus: (id)=>`${API_URL}api/order/${id}/status`,

    createPayment: `${API_URL}api/payment/paypal/create-order`,

};