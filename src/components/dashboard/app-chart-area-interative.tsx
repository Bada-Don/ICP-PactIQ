import React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "../../hooks/use-mobile" // Adjust path
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../ui/toggle-group"

const chartData = [
  { date: "2024-06-01", desktop: 200, mobile: 150 },
  { date: "2024-06-02", desktop: 180, mobile: 170 },
  { date: "2024-06-03", desktop: 210, mobile: 160 },
  { date: "2024-06-04", desktop: 250, mobile: 190 },
  { date: "2024-06-05", desktop: 220, mobile: 180 },
  { date: "2024-06-06", desktop: 230, mobile: 210 },
  { date: "2024-06-07", desktop: 240, mobile: 200 },
  { date: "2024-06-08", desktop: 260, mobile: 230 },
  { date: "2024-06-09", desktop: 210, mobile: 160 },
  { date: "2024-06-10", desktop: 280, mobile: 240 },
  { date: "2024-06-11", desktop: 300, mobile: 250 },
  { date: "2024-06-12", desktop: 270, mobile: 230 },
  { date: "2024-06-13", desktop: 290, mobile: 260 },
  { date: "2024-06-14", desktop: 320, mobile: 270 },
  { date: "2024-06-15", desktop: 310, mobile: 280 },
  { date: "2024-06-16", desktop: 330, mobile: 290 },
  { date: "2024-06-17", desktop: 340, mobile: 310 },
  { date: "2024-06-18", desktop: 360, mobile: 300 },
  { date: "2024-06-19", desktop: 370, mobile: 320 },
  { date: "2024-06-20", desktop: 350, mobile: 310 },
  { date: "2024-06-21", desktop: 390, mobile: 330 },
  { date: "2024-06-22", desktop: 410, mobile: 340 },
  { date: "2024-06-23", desktop: 420, mobile: 350 },
  { date: "2024-06-24", desktop: 400, mobile: 360 },
  { date: "2024-06-25", desktop: 430, mobile: 370 },
  { date: "2024-06-26", desktop: 440, mobile: 390 },
  { date: "2024-06-27", desktop: 460, mobile: 410 },
  { date: "2024-06-28", desktop: 480, mobile: 420 },
  { date: "2024-06-29", desktop: 470, mobile: 430 },
  { date: "2024-06-30", desktop: 500, mobile: 450 },
]

const chartConfig: ChartConfig = {
  visitors: { label: "Visitors" },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return date >= startDate
  })

  return (
    <Card className="container mx-auto">
      <CardHeader className="relative">
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden sm:block">Total for the last 3 months</span>
          <span className="block sm:hidden">Last 3 months</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden md:flex"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 md:hidden"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ChartAreaInteractive