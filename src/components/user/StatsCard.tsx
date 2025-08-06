import { Card, CardDescription, CardTitle } from "../ui/card";

type StatsCardPrope = {
    title: string;
    count: number;
}
function StatsCard ({title,count}: StatsCardPrope) {
    return (
        <Card>
            <div className="flex flex-row justify-between items-center p-6">
                <CardTitle>{title}</CardTitle> 
                <CardDescription>{count}</CardDescription>

            </div>
        </Card>
    )
}
export default StatsCard;