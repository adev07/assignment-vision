"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MonthlyComparison } from "@/components/monthly-comparison/monthly-comparison";
import { TopProducts } from "@/components/top-products/top-products";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { SalesPerformance } from "@/components/sales-perfomance/sales-performance";
import { SalesChart } from "@/components/sales-chart/sales-chart";
import { FeedbackCard } from "@/components/feedback-card/feedback-card";
import useSampleStore from "@/store/useSampleStore";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
    FadeLoader
} from "react-spinners";

function Page() {
    const {
        data,
        fetchData,
        fetchComparisonData,
        comparison,
        fetchTopProducts,
        topProducts,
        fetchSalesPerformance,
        fetchSalesDataFromAPI,
        salesDataAPI
    } = useSampleStore();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        fetchComparisonData();
        fetchTopProducts();
        fetchSalesPerformance();
        fetchSalesDataFromAPI();
    }, [fetchData, fetchComparisonData, fetchTopProducts, fetchSalesPerformance, fetchSalesDataFromAPI]);

    useEffect(() => {
        if (comparison && topProducts && data && salesDataAPI) {
            setLoading(false);
        }
    }, [comparison, topProducts, data, salesDataAPI]);


    const transformedComparisonData = comparison?.map(item => ({
        month: item.Month,
        thisYear: item.This_year,
        lastYear: item.Last_year
    }));

    const comparisonData = transformedComparisonData;

    const transformedTopProductsData = topProducts?.map(item => ({
        product: item.Product,
        soldAmount: item.sold_amount,
        unitPrice: item.unit_price,
        revenue: item.revenue,
        rating: item.rating
    }));

    const topProductsData = transformedTopProductsData;

    const transformedSalesDataAPI = salesDataAPI?.map(item => ({
        date: item.date,
        web_sales: item.web_sales,
        offline_sales: item.offline_sales
    }));


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FadeLoader color="#4A90E2" loading={loading} />
            </div>
        );
    }


    return (
        <ContentLayout title="Dashboard">
            <div className="flex-1 space-y-8">
                <div className="flex items-center justify-between">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Compare to</span>
                        <Select defaultValue="last-year">
                            <SelectTrigger className="w-[120px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="last-year">Last year</SelectItem>
                                <SelectItem value="last-month">Last month</SelectItem>
                                <SelectItem value="last-week">Last week</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-4 space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="rounded-lg border shadow-sm">
                                <CardContent className="p-6 space-y-3">
                                    <p className="text-sm text-muted-foreground">Purchases</p>
                                    <div className="flex sm:flex-row flex-col items-center space-x-2">
                                        <h3 className="text-2xl font-bold">{data?.purchases?.toLocaleString() || "0"}</h3>
                                        <span className="text-xs sm:flex items-center font-medium text-red-500 bg-red-100 px-3 py-1 rounded-full">
                                            +32%
                                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-lg border shadow-sm">
                                <CardContent className="p-6 space-y-3">
                                    <p className="text-sm text-muted-foreground">Revenue</p>
                                    <div className="flex sm:flex-row flex-col items-center space-x-2">
                                        <h3 className="text-2xl font-bold">
                                            ${data?.revenue?.toLocaleString() || "0"}
                                        </h3>
                                        <span className="text-xs flex items-center font-medium text-red-500 bg-red-100 px-3 py-1 rounded-full">
                                            +49%
                                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-lg border shadow-sm">
                                <CardContent className="p-6 space-y-3">
                                    <p className="text-sm text-muted-foreground">Refunds</p>
                                    <div className="flex sm:flex-row flex-col items-center space-x-2">
                                        <h3 className="text-2xl font-bold">
                                            ${data?.refunds?.toLocaleString() || "0"}
                                        </h3>
                                        <span className="text-xs flex items-center font-medium text-red-500 bg-red-100 px-3 py-1 rounded-full">
                                            +7%
                                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <MonthlyComparison data={comparisonData || []} />
                        <TopProducts data={topProductsData || []} />
                    </div>

                    <div className="col-span-2 space-y-4">
                        <SalesPerformance />
                        <SalesChart salesData={transformedSalesDataAPI || []} />
                        <FeedbackCard />
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
}

export default Page;
