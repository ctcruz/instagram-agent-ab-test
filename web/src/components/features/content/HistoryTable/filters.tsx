import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Table } from "@tanstack/react-table";

interface FiltersProps<TData> {
  typeFilter: "ALL" | "POST" | "STORY";
  setTypeFilter: (value: "ALL" | "POST" | "STORY") => void;
  table: Table<TData>;
}

function Filters<TData>({
  typeFilter,
  setTypeFilter,
  table,
}: FiltersProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Label className="text-sm">Filtrar por tipo:</Label>
        <Select
          value={typeFilter}
          onValueChange={(value) =>
            setTypeFilter(value as "ALL" | "POST" | "STORY")
          }
        >
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="POST">Post</SelectItem>
            <SelectItem value="STORY">Story</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <span className="text-sm text-muted-foreground">
        Página {table.getState().pagination.pageIndex + 1} de{" "}
        {table.getPageCount()}
      </span>
    </div>
  );
}

export { Filters };
