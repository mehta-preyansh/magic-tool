// components/DashboardView.tsx
"use client";
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DashboardData } from "@/app/api/generate-data/route";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface Props {
  config: DashboardData;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#ff7f50"];

const DashboardView = ({ config }: Props) => {
  const {
    dashboard_name,
    description,
    data_entries,
    recommended_visualizations,
    sorting,
  } = config;
  const [sortKey, setSortKey] = useState<string | null>(null);

  const sortedData = useMemo(() => {
    if (!sortKey) return data_entries.data_points;
    return [...data_entries.data_points].sort((a, b) => {
      const va = parseFloat(a.value);
      const vb = parseFloat(b.value);
      return vb - va; // descending
    });
  }, [sortKey, data_entries.data_points]);

  const renderChart = () => {
    const data = sortedData.map((d) => ({ name: d.label, value: +d.value }));

    if (recommended_visualizations.includes("bar-chart")) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (recommended_visualizations.includes("pie-chart")) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (recommended_visualizations.includes("line-chart")) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl text-foreground font-bold">{dashboard_name}</h1>
        <p className="text-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data_entries.fields.map((field, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <p className="font-medium">{field.label}</p>
              {field.description && (
                <p className="text-sm text-foreground/60">
                  {field.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {sorting && (
        <div className="mt-4">
          {/* <select
            onChange={(e) => setSortKey(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">None</option>
            {sorting.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select> */}
          <DropdownMenu>
            <DropdownMenuTrigger>Sort By</DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                sorting.map((s, i) => (
                  <DropdownMenuItem key={i}>
                    {s}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <div className="mt-6">{renderChart()}</div>
    </div>
  );
};

export default DashboardView;
