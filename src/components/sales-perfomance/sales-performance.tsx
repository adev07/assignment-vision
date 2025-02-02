"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import useSalesPerformanceStore from "@/store/useSampleStore";

ChartJS.register(ArcElement, Tooltip);

export function SalesPerformance() {
    const { score, title, message, fetchSalesPerformance } = useSalesPerformanceStore();

    useEffect(() => {
        fetchSalesPerformance();
    }, [fetchSalesPerformance]);

    const performanceScore = score ?? 0;
    const remainingScore = 100 - performanceScore;
    const displayTitle = title ?? "Loading...";
    const displayMessage = message ?? "Fetching your performance data...";

    const data = {
        datasets: [
            {
                data: [performanceScore, remainingScore],
                backgroundColor: ["#2563eb", "#e5e7eb"],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
                cutout: "85%",
                borderRadius: 8,
            },
        ],
    };

    const options = {
        cutout: "85%",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem: { raw: any; }) {
                        return `${tooltipItem.raw}%`; // Show percentage in the tooltip
                    },
                },
            },
        },
    };

    return (
        <Card>
            <CardContent className="py-6 h-full flex flex-col justify-center">
                <div className="relative">
                    <div className="flex justify-center">
                        <div className="relative w-full h-[160px]">
                            <Doughnut className="z-[1000]" data={data} options={options} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-semibold mt-6">{performanceScore}</span>
                                <span className="text-sm text-gray-500">of 100 points</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-start">
                    <h3 className="text-xl font-semibold">{displayTitle}</h3>
                    <p className="text-gray-500 text-sm">{displayMessage}</p>
                    <Button
                        variant="outline"
                        className="rounded-full mt-3 px-6 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Improve your score
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
