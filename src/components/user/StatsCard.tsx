
import type { ReactNode } from "react";
import { Card, CardDescription } from "../ui/card";

type StatsCardProps = {
    title: string;
    count: number;
    icon: ReactNode;
    bgColor: string;
    iconColor: string;
}

const StatsCard = ({ title, count, icon, bgColor, iconColor }: StatsCardProps) => {
    return (
        <Card className="border-0 shadow-sm bg-gray-50">
            <div className="flex items-center gap-4 p-2">
                {/* Icon on left */}
                <div className={`${bgColor} ${iconColor} p-3 rounded-lg flex-shrink-0`}>
                    {icon}
                </div>
                
                {/* Content on right */}
                <div className="flex-1">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                        {count.toLocaleString()}
                    </div>
                    <CardDescription className="text-sm text-gray-500 font-medium">
                        {title}
                    </CardDescription>
                </div>
            </div>
        </Card>
    )
}

export default StatsCard;