import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function useStockData() {
  const [data, setData] = useState<{
    categories: string[];
    series: { name: string; data: number[] }[];
  }>({
    categories: [],
    series: [{ name: 'AAPL', data: [] }],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(API_URL);
        const formattedData = {
          categories: response.data.map((item: { date: string }) => item.date),
          series: [
            { name: 'AAPL', data: response.data.map((item: { price: number }) => item.price) },
          ],
        };
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return { data, loading };
}
