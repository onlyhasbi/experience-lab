import { Link, createLazyFileRoute } from "@tanstack/react-router";
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import * as Lucide from "lucide-react";
import { capitalize } from "radash";
import { useState } from "react";
import { ContentLayout } from "../../layout/content";
import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute("/person/")({
  component: () => <Person />,
});

type Person = {
  id: number;
  name: string;
};

function Person() {
  const [person, setPerson] = useState<Array<Person>>([]);

  const handleAddPerson = () => {
    const index = +new Date();
    setPerson(create<Person>(person, { id: index, name: "Hasbi " + index }));
  };

  const handleSelected = (id: number) => {
    setPerson(deleted<Person>(person, id));
  };

  return (
    <ContentLayout>
      <div className="flex justify-end">
        <Button onClick={handleAddPerson} size="sm" className="self-end">
          Add Person
        </Button>
      </div>
      <List data={person} onSelected={handleSelected} />
    </ContentLayout>
  );
}

function List({
  data,
  onSelected,
}: {
  data: Array<Person>;
  onSelected: (id: number) => void;
}) {
  const columnHelper = createColumnHelper<Person>();

  const columns = [
    {
      id: "name",
      headerStyle: "text-left",
      content: (info: CellContext<Person, string | number>) => {
        return (
          <Link
            className="hover:text-blue-600"
            to={`/person/${info.row.original.id}`}
          >
            {info.row.original.name}
          </Link>
        );
      },
      width: 450,
    },
    {
      id: "id",
      headerStyle: "text-center",
      content: (info: CellContext<Person, string | number>) => (
        <div className="flex justify-center items-center">
          <div className="flex gap-2">
            <Lucide.SquarePen
              size={14}
              className="text-slate-500 cursor-pointer hover:text-blue-500"
              onClick={() => onSelected(+info.getValue())}
            />
            <Lucide.Trash
              size={14}
              className="text-slate-500 cursor-pointer hover:text-red-500"
              onClick={() => onSelected(+info.getValue())}
            />
          </div>
        </div>
      ),
      width: 140,
    },
  ].map((column) => {
    return columnHelper.accessor(column.id as keyof Person, {
      header: (info) => (
        <div className={clsx("w-full", column?.headerStyle)}>
          {column.id === "id" ? "Action" : capitalize(info.header.id)}
        </div>
      ),
      cell: (info) => column?.content?.(info) || <div>{info.getValue()}</div>,
      enableResizing: false,
      size: column.width,
    });
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead className="border-b">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                style={{ width: `${header.getSize()}px` }}
                className="px-5 py-3 text-xs font-semibold leading-3"
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="[&>*:nth-child(odd)]:bg-blue-50">
        {table.getRowModel().rows.map((row) => (
          <tr className="hover:cursor-pointer" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                style={{ width: `${cell.getContext().column.getSize()}px` }}
                className="leading-3 text-sm px-5 py-3 text-slate-600 "
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function deepCloneArray<T>(value: Array<T>) {
  return JSON.parse(JSON.stringify(value));
}

function create<T = unknown>(arr: Array<T>, value: T) {
  const temp = deepCloneArray(arr) as Array<T>;
  temp.push(value);
  return temp;
}

function deleted<T = unknown>(arr: Array<T>, id: number) {
  const temp = deepCloneArray(arr) as Array<Person>;
  const foundIndex = temp.findIndex((item) => item.id == id);
  if (foundIndex > -1) {
    temp.splice(foundIndex, 1);
  }
  return temp;
}
