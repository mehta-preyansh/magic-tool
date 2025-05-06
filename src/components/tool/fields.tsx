import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

type Field = { label: string; description?: string };
interface FieldEditorProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({ fields, setFields }) => {
  const addField = () => {
    // Add a new empty field
    setFields(prev => [...prev, { label: '', description: '' }]);
  };

  const updateField = (index: number, key: 'label' | 'description', value: string) => {
    // Update a specific field property
    setFields(prev => {
      const newFields = [...prev];
      newFields[index] = { ...newFields[index], [key]: value };
      return newFields;
    });
  };

  const removeField = (index: number) => {
    // Remove a field
    setFields(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Fields</h3>
        <Button onClick={addField} variant="outline" className="ml-2">
          Add Field
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(index, 'label', e.target.value)}
                  placeholder="Field label"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={field.description || ''}
                  onChange={(e) => updateField(index, 'description', e.target.value)}
                  placeholder="Description (optional)"
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => removeField(index)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};