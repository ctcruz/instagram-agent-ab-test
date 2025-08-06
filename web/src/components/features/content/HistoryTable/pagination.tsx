import { Button } from "@/components/ui/button";
import type { Table } from "@tanstack/react-table";

interface PaginationProps<TData> {
  table: Table<TData>;
}

function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Anterior
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Próxima
      </Button>
    </div>
  );
}

export { Pagination };
