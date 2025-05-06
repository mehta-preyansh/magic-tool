"use client";
import React, { useEffect, useState } from "react";
import { useToolContext } from "@/contexts/ToolContext";
import { DashboardDetails } from "./dashboard-details";
import { FieldEditor } from "./fields";
import { DataPointEditor } from "./entries";
import { VisualizationSelector } from "./vizualization-selector";
import { SortingSelector } from "./sorting-checkboxes";

// Type definitions for fields, data points, and visualization options
type Field = { label: string; description?: string };
type DataPoint = { label: string; value: string };
type VisualizationType = "bar-chart" | "pie-chart" | "line-chart";

// Manages overall state and renders subcomponents.
export const Blueprint: React.FC = () => {
  const { data } = useToolContext();
  // Dashboard basic info
  const [dashboardName, setDashboardName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Data entries state
  const [fields, setFields] = useState<Field[]>([]);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  // Recommended visualizations (multi-select)
  const [recommendedVisualizations, setRecommendedVisualizations] = useState<
    VisualizationType[]
  >([]);

  // Sorting fields (selected from field labels)
  const [sortingFields, setSortingFields] = useState<string[]>([]);

  useEffect(() => {
    if (!data) return;

    const {
      dashboard_name,
      description,
      data_entries: { fields, data_points },
      recommended_visualizations,
      sorting,
    } = data;

    setDashboardName(dashboard_name);
    setDescription(description);
    setFields(fields);
    setDataPoints(data_points);
    setRecommendedVisualizations(recommended_visualizations);
    setSortingFields(sorting || []);
  }, [data]);

  if(!data) return null;

  return (
    <div className="p-6 space-y-6 w-full flex-1 overflow-y-auto">
      {/* DashboardConfig: name and description editors */}
      <DashboardDetails
        dashboardName={dashboardName}
        description={description}
        onNameChange={setDashboardName}
        onDescriptionChange={setDescription}
      />

      {/* FieldEditor: table to edit fields (label, description) */}
      <FieldEditor fields={fields} setFields={setFields} />

      {/* DataPointEditor: table to edit data points (label, value) */}
      <DataPointEditor dataPoints={dataPoints} setDataPoints={setDataPoints} />

      {/* VisualizationSelector: toggles for bar/pie/line charts */}
      <VisualizationSelector
        selected={recommendedVisualizations}
        onChange={setRecommendedVisualizations}
      />

      {/* SortingSelector: checkboxes to select fields for sorting */}
      <SortingSelector
        fields={fields}
        selected={sortingFields}
        onChange={setSortingFields}
      />

      {/* Optional: A similar FilteringSelector could be added here */}
    </div>
  );
};
