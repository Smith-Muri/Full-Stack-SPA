import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/reports',
});

export const fetchOrders = (params) => api.get('/orders', { params });
export const fetchTickets = (params) => api.get('/support-tickets', { params });
export const fetchSalesByCategory = (params) => api.get('/sales-by-category', { params });
export const fetchOrdersByDay = (params) => api.get('/orders-by-day', { params });
