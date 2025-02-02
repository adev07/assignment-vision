import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSampleStore from "@/store/useSampleStore";

export function FeedbackCard() {
    const { feedbackData, fetchFeedbackData } = useSampleStore();


    useEffect(() => {
        fetchFeedbackData();
    }, [fetchFeedbackData]);

    console.log("feedbackdata", feedbackData);

    const totalFeedback = feedbackData?.reduce(
        (acc, item) => acc + item.unique_count,
        0
    ) || 0;

    const negative = Math.floor(totalFeedback * 0.1);
    const neutral = Math.floor(totalFeedback * 0.2);
    const positive = totalFeedback - (negative + neutral);

    return (
        <Card>
            <CardHeader className="relative">
                <CardTitle className="text-gray-500">Community feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <h3 className="text-xl font-semibold">Mostly positive</h3>

                <div className="flex gap-1 mb-4">
                    <div className="h-2 w-[10%] rounded-l-full bg-[#ffb4b4]" style={{ width: `${(negative / totalFeedback) * 100}%` }} />
                    <div className="h-2 w-[15%] bg-[#ffe4a0]" style={{ width: `${(neutral / totalFeedback) * 100}%` }} />
                    <div className="h-2 w-[75%] rounded-r-full bg-[#86efac]" style={{ width: `${(positive / totalFeedback) * 100}%` }} />
                </div>

                <div className="grid grid-cols-3">
                    <div className="space-y-1 text-sm font-semibold">
                        <div className="text-gray-600">Negative</div>
                        <div>{negative}</div>
                    </div>
                    <div className="space-y-1 text-sm font-semibold">
                        <div className="text-gray-600">Neutral</div>
                        <div>{neutral}</div>
                    </div>
                    <div className="space-y-1 text-sm font-semibold">
                        <div className="text-gray-600">Positive</div>
                        <div>{positive}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
