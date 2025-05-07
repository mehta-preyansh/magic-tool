"use client";
import FinalTool from "@/components/tool/final-tool";
import { useToolContext } from "@/contexts/ToolContext";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DashboardData } from "../api/generate-data/route";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const guest = searchParams.get("guest");
  const { data } = useToolContext();

  const [config, setConfig] = useState<DashboardData | null>(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/get-dashboard?id=${id}`);
        const jsonResponse = await res.json();
        setConfig(jsonResponse);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        router.replace("/");
      }
    };
    if (id) {
      fetchData();
    } else {
      if (guest) {
        if (data) {
          setConfig(data);
        } else {
          router.replace("/");
        }
      } else {
        router.replace("/");
      }
    }
  }, [id, guest, data, router, config]);
  if (!config) return null;
  return (
    <div className="flex flex-1 justify-center overflow-y-auto">
      <FinalTool config={config!} />
    </div>
  );
};

export default Dashboard;
