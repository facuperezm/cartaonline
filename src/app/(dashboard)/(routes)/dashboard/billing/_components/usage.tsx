import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface UsageCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string
  count: number
  limit: number | null
}

export function UsageCard({
  title,
  count,
  limit,
  className,
  ...props
}: UsageCardProps) {
  const isUnlimited = limit === null
  const rawProgress = isUnlimited ? 0 : Math.round((count / limit) * 100)
  const clampedProgress = Math.min(100, rawProgress)

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          {isUnlimited
            ? `${count} en uso · Sin límite`
            : `${count} / ${limit} (${rawProgress}%)`}
        </CardDescription>
      </CardHeader>
      {isUnlimited ? null : (
        <CardContent>
          <Progress className="w-full" max={100} value={clampedProgress} />
        </CardContent>
      )}
    </Card>
  )
}
