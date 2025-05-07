import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface DashboardDetailsProps {
  dashboardName: string;
  description: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (desc: string) => void;
}

export const DashboardDetails: React.FC<DashboardDetailsProps> = ({
  dashboardName,
  description,
  onNameChange,
  onDescriptionChange
}) => {
  return (
    <div className="mb-4 p-4 bg-surface rounded shadow">
      <div className="mb-2">
        <Label htmlFor="dashboardName">Dashboard Name</Label>
        <Input
          id="dashboardName"
          type="text"
          value={dashboardName}
          onChange={(e) => onNameChange(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};