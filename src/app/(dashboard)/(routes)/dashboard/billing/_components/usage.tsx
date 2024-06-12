import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UsageCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string;
  count: number;
  limit: number;
  moreInfo?: string;
}

export function UsageCard({
  title,
  count,
  limit,
  className,
  ...props
}: UsageCardProps) {
  const progress = Math.round((count / limit) * 100);

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          {count} / {limit} Tiendas ({progress}%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress className="w-full" value={progress} max={100} />
      </CardContent>
    </Card>
  );
}
