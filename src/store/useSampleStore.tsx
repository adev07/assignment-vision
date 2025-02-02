import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SECONDARY_API_BASE_URL = process.env.NEXT_PUBLIC_SECONDARY_API_BASE_URL;
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

interface ComparisonData {
    Month: string;
    Last_year: number;
    This_year: number;
    createdAt: string;
    updatedAt: string;
    isAuthenticated: boolean;
    token: string | null;
}

interface TopProductData {
    Product: string;
    sold_amount: number;
    unit_price: number;
    revenue: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

interface SalesData {
    date: string;
    web_sales: number;
    offline_sales: number;
    createdAt: string;
    updatedAt: string;
}

interface SampleState {
    data: { purchases: number; revenue: number; refunds: number } | null;
    feedbackData: { date2: string; unique_count: number; cumulative_tweets: number }[] | null;
    score: number | null;
    title: string | null;
    message: string | null;
    comparison: ComparisonData[] | null;
    topProducts: TopProductData[] | null;
    salesDataAPI: SalesData[] | null;
    isAuthenticated: boolean;
    token: string | null;
    fetchData: () => Promise<void>;
    fetchSalesPerformance: () => Promise<void>;
    fetchComparisonData: () => Promise<void>;
    fetchTopProducts: () => Promise<void>;
    fetchSalesDataFromAPI: () => Promise<void>;
    fetchFeedbackData: () => Promise<void>;
    login: (username: string, email: string, password: string, phone_number: string, input_code: number) => Promise<void>;
}


const useSampleStore = create<SampleState>((set) => ({
    data: null,
    feedbackData: null,
    score: null,
    title: null,
    message: null,
    comparison: null,
    topProducts: null,
    salesDataAPI: null,
    isAuthenticated: false,
    token: null,

    login: async (username, email, password, phone_number, input_code) => {
        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/login/`,
                {
                    username,
                    email,
                    password,
                    phone_number,
                    input_code,
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            if (data.token) {
                set({ isAuthenticated: true, token: data.token });
                localStorage.setItem("authToken", data.token);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            set({ isAuthenticated: false, token: null });
        }
    },

    fetchData: async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/sample_assignment_api_1/`, {
                headers: { Accept: "application/json", Authorization: AUTH_TOKEN },
            });
            set({ data });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },

    fetchSalesPerformance: async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/sample_assignment_api_3/`, {
                headers: { Accept: "application/json", Authorization: AUTH_TOKEN },
            });
            set({ score: data.score, title: data.title, message: data.message });
        } catch (error) {
            console.error("Error fetching sales performance data:", error);
        }
    },

    fetchFeedbackData: async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/sample_assignment_api_4/`, {
                headers: { Accept: "application/json", Authorization: AUTH_TOKEN },
            });
            set({ feedbackData: data });
        } catch (error) {
            console.error("Error fetching feedback data:", error);
        }
    },

    fetchComparisonData: async () => {
        try {
            const { data } = await axios.get(`${SECONDARY_API_BASE_URL}/data`, {
                headers: { Accept: "application/json", Authorization: AUTH_TOKEN },
            });
            set({ comparison: data.comparison });
        } catch (error) {
            console.error("Error fetching comparison data:", error);
        }
    },

    fetchTopProducts: async () => {
        try {
            const { data } = await axios.get(`${SECONDARY_API_BASE_URL}/data`, {
                headers: { Accept: "application/json", Authorization: AUTH_TOKEN },
            });
            set({ topProducts: data.topProducts });
        } catch (error) {
            console.error("Error fetching top products data:", error);
        }
    },

    fetchSalesDataFromAPI: async () => {
        try {
            const { data } = await axios.get(`${SECONDARY_API_BASE_URL}/data`, {
                headers: { Accept: "application/json", Authorization: AUTH_TOKEN },
            });
            set({ salesDataAPI: data.sales_data });
        } catch (error) {
            console.error("Error fetching sales data from new API:", error);
        }
    },
}));

export default useSampleStore;
