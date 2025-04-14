"use client";

import { Prisma } from "@/__generated__/prisma";
import { generateDevPointSchedule } from "@/feature/dev-point/dev-point-schedule";
import { addYears, max } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { today } from "@/lib/date-utils";

/**
 * @package
 */
export const projectSelectForMyProjectDevPointSchedule = {
  startDate: true,
} satisfies Prisma.ProjectSelect;

type ProjectPayloadForMyProjectDevPointSchedule = Prisma.ProjectGetPayload<{
  select: typeof projectSelectForMyProjectDevPointSchedule;
}>;

interface MyProjectDevPointScheduleProps {
  project: ProjectPayloadForMyProjectDevPointSchedule;
}

const chartConfig = {
  devPoint: {
    label: "Dev Point",
  },
} satisfies ChartConfig;

function sum(items: number[]) {
  return items.reduce((acc, cur) => acc + cur, 0);
}

export function MyProjectDevPointSchedule({
  project,
}: MyProjectDevPointScheduleProps) {
  const _today = today();
  const startDate = project.startDate;
  const endDate = addYears(max([startDate, _today]), 3);
  const currentDate = _today;

  const chartData = generateDevPointSchedule(startDate, endDate, currentDate);

  const publishedDevPointSum = sum(
    chartData.filter((item) => item.isPublished).map((item) => item.devPoint),
  );

  const chartDataWithDesign = chartData.map((item) => ({
    date:
      new Date(item.date).toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) + ` Sprint${item.sprint}`,
    devPoint: item.devPoint,
    fill: item.isPublished ? "var(--chart-3)" : "var(--chart-2)",
  }));

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-xl">Dev Point 発行スケジュール</CardTitle>
          <CardDescription className="text-xs space-y-1">
            <p>
              {"開始: "}
              {startDate.toLocaleDateString("ja-JP", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p>発行: Sprint(n) = 100 / (1 + (n - 1) / 26)</p>
          </CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              発行済 Dev Point
            </span>
            <span className="text-chart-3 text-lg font-bold leading-none sm:text-3xl">
              {publishedDevPointSum.toFixed(3)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartDataWithDesign}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine
              axisLine
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[150px]" />}
            />
            <Bar dataKey="devPoint" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
