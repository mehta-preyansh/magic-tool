import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type VisualizationType = 'bar-chart' | 'pie-chart' | 'line-chart';
interface VisualizationSelectorProps {
  selected: VisualizationType[];
  onChange: (values: VisualizationType[]) => void;
}

export const VisualizationSelector: React.FC<VisualizationSelectorProps> = ({ selected, onChange }) => {
  const options: VisualizationType[] = ['bar-chart', 'pie-chart', 'line-chart'];

  const toggleOption = (option: VisualizationType, checked: boolean) => {
    if (checked) {
      // Add to selection
      onChange([...selected, option]);
    } else {
      // Remove from selection
      onChange(selected.filter(item => item !== option));
    }
  };

  return (
    <div className="mb-4 p-4 bg-surface rounded shadow">
      <h3 className="text-lg font-medium mb-2">Recommended Visualizations</h3>
      {options.map((option) => (
        <div key={option} className="flex items-center mb-1">
          <Checkbox
            id={option}
            checked={selected.includes(option)}
            onCheckedChange={(checked) => toggleOption(option, checked as boolean)}
          />
          <Label htmlFor={option} className="ml-2 capitalize">
            {option.replace('-', ' ')}
          </Label>
        </div>
      ))}
    </div>
  );
};