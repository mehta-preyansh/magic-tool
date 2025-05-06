import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface SortingSelectorProps {
  fields: { label: string; description?: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export const SortingSelector: React.FC<SortingSelectorProps> = ({ fields, selected, onChange }) => {
  const toggleSortField = (fieldLabel: string, checked: boolean) => {
    if (checked) {
      onChange([...selected, fieldLabel]);
    } else {
      onChange(selected.filter(f => f !== fieldLabel));
    }
  };

  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-medium mb-2">Sorting Fields</h3>
      {fields.length === 0 ? (
        <p className="text-sm text-gray-500">No fields available for sorting.</p>
      ) : (
        fields.map((field, idx) => (
          <div key={idx} className="flex items-center mb-1">
            <Checkbox
              id={`sort-${idx}`}
              checked={selected.includes(field.label)}
              onCheckedChange={(checked) => toggleSortField(field.label, checked as boolean)}
            />
            <Label htmlFor={`sort-${idx}`} className="ml-2">
              {field.label}
            </Label>
          </div>
        ))
      )}
    </div>
  );
};