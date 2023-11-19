"use client";

import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    country: "AD",
    "hot dog": 18,
    "hot dogColor": "hsl(211, 70%, 50%)",
    burger: 95,
    burgerColor: "hsl(67, 70%, 50%)",
    sandwich: 156,
    sandwichColor: "hsl(225, 70%, 50%)",
    kebab: 184,
    kebabColor: "hsl(95, 70%, 50%)",
    fries: 180,
    friesColor: "hsl(338, 70%, 50%)",
    donut: 75,
    donutColor: "hsl(330, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 171,
    "hot dogColor": "hsl(265, 70%, 50%)",
    burger: 17,
    burgerColor: "hsl(126, 70%, 50%)",
    sandwich: 166,
    sandwichColor: "hsl(18, 70%, 50%)",
    kebab: 19,
    kebabColor: "hsl(120, 70%, 50%)",
    fries: 129,
    friesColor: "hsl(131, 70%, 50%)",
    donut: 164,
    donutColor: "hsl(112, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 72,
    "hot dogColor": "hsl(18, 70%, 50%)",
    burger: 78,
    burgerColor: "hsl(148, 70%, 50%)",
    sandwich: 141,
    sandwichColor: "hsl(280, 70%, 50%)",
    kebab: 71,
    kebabColor: "hsl(333, 70%, 50%)",
    fries: 78,
    friesColor: "hsl(288, 70%, 50%)",
    donut: 6,
    donutColor: "hsl(188, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 4,
    "hot dogColor": "hsl(109, 70%, 50%)",
    burger: 55,
    burgerColor: "hsl(217, 70%, 50%)",
    sandwich: 1,
    sandwichColor: "hsl(153, 70%, 50%)",
    kebab: 106,
    kebabColor: "hsl(359, 70%, 50%)",
    fries: 149,
    friesColor: "hsl(254, 70%, 50%)",
    donut: 125,
    donutColor: "hsl(266, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 106,
    "hot dogColor": "hsl(103, 70%, 50%)",
    burger: 103,
    burgerColor: "hsl(272, 70%, 50%)",
    sandwich: 28,
    sandwichColor: "hsl(261, 70%, 50%)",
    kebab: 135,
    kebabColor: "hsl(42, 70%, 50%)",
    fries: 184,
    friesColor: "hsl(294, 70%, 50%)",
    donut: 196,
    donutColor: "hsl(33, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 93,
    "hot dogColor": "hsl(349, 70%, 50%)",
    burger: 29,
    burgerColor: "hsl(87, 70%, 50%)",
    sandwich: 140,
    sandwichColor: "hsl(136, 70%, 50%)",
    kebab: 133,
    kebabColor: "hsl(263, 70%, 50%)",
    fries: 97,
    friesColor: "hsl(86, 70%, 50%)",
    donut: 130,
    donutColor: "hsl(250, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 172,
    "hot dogColor": "hsl(145, 70%, 50%)",
    burger: 103,
    burgerColor: "hsl(5, 70%, 50%)",
    sandwich: 9,
    sandwichColor: "hsl(340, 70%, 50%)",
    kebab: 118,
    kebabColor: "hsl(209, 70%, 50%)",
    fries: 54,
    friesColor: "hsl(217, 70%, 50%)",
    donut: 170,
    donutColor: "hsl(204, 70%, 50%)",
  },
];

const HorizontalBarChart = () => {
  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy='country'
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      layout='horizontal'
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role='application'
      ariaLabel='Nivo bar chart demo'
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default HorizontalBarChart;
