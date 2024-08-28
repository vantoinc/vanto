"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/ui/shadcn/chart";

export function BarMixed(): JSX.Element {
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "#4285F4" },
    { browser: "safari", visitors: 200, fill: "#006CFF" },
    { browser: "firefox", visitors: 187, fill: "#FF7139" },
    { browser: "edge", visitors: 173, fill: "#08F0A1" },
    { browser: "other", visitors: 90, fill: "gray" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
    },
    safari: {
      label: "Safari",
    },
    firefox: {
      label: "Firefox",
    },
    edge: {
      label: "Edge",
    },
    other: {
      label: "Other",
    },
  } satisfies ChartConfig;

  return (
    <>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 0,
          }}
        >
          <YAxis
            dataKey="browser"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label
            }
          />
          <XAxis dataKey="visitors" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="visitors" layout="vertical" radius={5} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
