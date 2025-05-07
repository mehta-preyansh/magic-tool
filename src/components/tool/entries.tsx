import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

type DataPoint = { label: string; value: string };
interface DataPointEditorProps {
  dataPoints: DataPoint[];
  setDataPoints: React.Dispatch<React.SetStateAction<DataPoint[]>>;
}

export const DataPointEditor: React.FC<DataPointEditorProps> = ({ dataPoints, setDataPoints }) => {
  const addDataPoint = () => {
    setDataPoints(prev => [...prev, { label: '', value: '' }]);
  };

  const updateDataPoint = (index: number, key: 'label' | 'value', value: string) => {
    setDataPoints(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [key]: value };
      return newData;
    });
  };

  const removeDataPoint = (index: number) => {
    setDataPoints(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4 p-4 bg-surface rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Data Points</h3>
        <Button onClick={addDataPoint} variant="outline" className="ml-2">
          Add Data Point
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataPoints.map((point, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  type="text"
                  value={point.label}
                  onChange={(e) => updateDataPoint(index, 'label', e.target.value)}
                  placeholder="Data label"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={point.value}
                  onChange={(e) => updateDataPoint(index, 'value', e.target.value)}
                  placeholder="Value"
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => removeDataPoint(index)} variant="destructive">
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