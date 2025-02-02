import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: "index" as const,
        intersect: false,
    },
    plugins: {
        legend: {
            position: "bottom" as const,
            labels: {
                usePointStyle: true,
            },
        },
        tooltip: {
            enabled: true,
            backgroundColor: "white",
            titleColor: "#6b7280",
            bodyColor: "black",
            titleFont: {
                size: 14,
                weight: 700,
            },
            bodyFont: {
                size: 12,
                weight: 400,
            },
            borderColor: "#e5e7eb",
            borderWidth: 12,
            padding: 10,
            displayColors: false,
            callbacks: {
                title: (context: any) => context[0].label,
                label: (context: any) => {
                    const value = context.parsed.y;
                    return `${context.dataset.label}: ${value.toFixed(1)}`;
                },
            },
            bodySpacing: 6,
            boxPadding: 6,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                color: "#9ca3af",
                font: {
                    size: 12,
                },
            },
        },
        y: {
            border: {
                display: false,
            },
            grid: {
                color: "#f3f4f6",
            },
            ticks: {
                color: "#9ca3af",
                font: {
                    size: 12,
                },
                callback: function (tickValue: string | number) {
                    return `${tickValue}`;
                },
                stepSize: 5,
            },
        },
    },
};

interface SalesData {
    date: string;
    web_sales: number;
    offline_sales: number;
}

interface SalesChartProps {
    salesData: SalesData[];
}

export function SalesChart({ salesData }: SalesChartProps) {
    const labels = salesData.map((item) => new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

    const totalWebSales = salesData.reduce((sum, item) => sum + item.web_sales, 0);
    const totalOfflineSales = salesData.reduce((sum, item) => sum + item.offline_sales, 0);

    const totalSales = totalWebSales + totalOfflineSales;

    const webSalesPercentage = ((totalWebSales / totalSales) * 100).toFixed(2);
    const offlineSalesPercentage = ((totalOfflineSales / totalSales) * 100).toFixed(2);

    const data = {
        labels,
        datasets: [
            {
                label: "Web Sales",
                data: salesData.map((item) => item.web_sales),
                borderColor: "#2563eb",
                backgroundColor: "#2563eb",
                tension: 0.6,
                borderWidth: 4,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#2563eb",
                pointHoverBorderColor: "white",
                pointHoverBorderWidth: 2,
            },
            {
                label: "Offline Sales",
                data: salesData.map((item) => item.offline_sales),
                borderColor: "#93c5fd",
                backgroundColor: "#93c5fd",
                tension: 0.6,
                borderWidth: 4,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#93c5fd",
                pointHoverBorderColor: "white",
                pointHoverBorderWidth: 2,
            },
        ],
    };

    return (
        <Card className="w-full">
            <CardHeader className="relative pb-2">
                <CardTitle className="text-xl font-semibold">Sales Data</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <Line options={options} data={data} />
                </div>
                <div className="mt-4 flex text-center items-center justify-center space-x-3">
                    <div>
                        <h3 className="font-semibold text-sm">Web Sales</h3>
                        <p className="text-sm">{webSalesPercentage}%</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">Offline Sales</h3>
                        <p className="text-sm">{offlineSalesPercentage}%</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
