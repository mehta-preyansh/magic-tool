import { getUser } from "@/lib/getUser";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FinalTool from "@/components/tool/final-tool";
import GuestDashboard from "@/components/guest-dashboard";

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Dashboard({ searchParams }: DashboardPageProps) {
  //Authentication check
  const user = await getUser();
  if (!user) {
    redirect("/sign-in?redirect_to=/dashboard");
  }

  //Get the search params
  const id = searchParams.id as string;
  const guest = searchParams.guest as string;

  //Verify if user has access to this dashboard
  if (id) {
    const supabase = await createClient();
    const { data: dashboard, error } = await supabase
      .from("dashboards")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !dashboard) {
      redirect("/");
    }

    // Check if user owns the dashboard or has access
    if (dashboard.user_id !== user.id) {
      // You might want to check a shared_dashboards table or similar
      // for additional access control
      redirect("/");
    }

    return (
      <div className="flex flex-1 justify-center overflow-y-auto">
        <FinalTool config={dashboard} />
      </div>
    );
  }

  // 4. Handle guest access
  if (guest) {
    return <GuestDashboard />;
  }

  // 5. If no valid id or guest token, redirect to home
  redirect("/");
}
