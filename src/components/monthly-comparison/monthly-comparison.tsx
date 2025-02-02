import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer } from "@/components/ui/chart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MonthlyComparisonProps {
    data: { month: string; thisYear: number; lastYear: number }[];
}

export function MonthlyComparison({ data }: MonthlyComparisonProps) {
    const chartData = {
        labels: data.map((d) => d.month),
        datasets: [
            {
                label: "Last Year",
                data: data.map((d) => d.lastYear),
                backgroundColor: "rgb(191, 219, 254)",
                borderRadius: 4,
                barPercentage: 0.8,
            },
            {
                label: "This Year",
                data: data.map((d) => d.thisYear),
                backgroundColor: "rgb(37, 99, 235)",
                borderRadius: 4,
                barPercentage: 0.8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                position: "bottom" as const,
                labels: {
                    usePointStyle: true,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    callback: function (tickValue: string | number) {
                        return `${Number(tickValue) / 1000}k`;
                    },
                },
            },
        },
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">
                <CardTitle className="text-xl font-semibold">Comparison</CardTitle>
                <Select defaultValue="6-months">
                    <SelectTrigger className="w-[120px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="6-months">6 months</SelectItem>
                        <SelectItem value="12-months">12 months</SelectItem>
                        <SelectItem value="24-months">24 months</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        thisYear: {
                            label: "This year",
                            color: "rgb(37, 99, 235)",
                        },
                        lastYear: {
                            label: "Last year",
                            color: "rgb(191, 219, 254)",
                        },
                    }}
                >
                    <Bar data={chartData} options={chartOptions} />
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
