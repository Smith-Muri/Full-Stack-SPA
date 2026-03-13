import { useQuery } from '@tanstack/react-query';
import {
  fetchOrders,
  fetchTickets,
  fetchSalesByCategory,
  fetchOrdersByDay,
} from '../api/reports';

export function useOrders(filters) {
  return useQuery(['orders', filters], () => fetchOrders(filters).then(r => r.data), {
    keepPreviousData: true,
  });
}

export function useTickets(filters) {
  return useQuery(['tickets', filters], () => fetchTickets(filters).then(r => r.data), {
    keepPreviousData: true,
  });
}

export function useSalesByCategory(filters) {
  return useQuery(['salesByCategory', filters], () => fetchSalesByCategory(filters).then(r => r.data));
}

export function useOrdersByDay(filters) {
  return useQuery(['ordersByDay', filters], () => fetchOrdersByDay(filters).then(r => r.data));
}
