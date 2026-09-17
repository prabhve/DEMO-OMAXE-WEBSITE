import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Trash2,
  CheckCircle2,
  XCircle,
  Download,
} from 'lucide-react';

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T | string;
  cell?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  minWidth?: number;
}

export type Column<T> = ColumnDef<T>;
export const Pagination: React.FC<any> = () => null;

interface DataTableProps<T extends { id: string }> {
  columns: ColumnDef<T>[];
  data: T[];
  keyField?: string;
  emptyMessage?: string;
  totalCount?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSortChange?: (field: string, order: 'asc' | 'desc') => void;
  isLoading?: boolean;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onSelectRow?: (id: string) => void;
  onSelectAll?: (allSelected: boolean) => void;
  bulkActions?: {
    label: string;
    icon?: React.ReactNode;
    onClick: (selectedIds: string[]) => void;
    variant?: 'default' | 'danger' | 'success';
  }[];
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  totalCount = data.length,
  page = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  isLoading = false,
  selectable = true,
  selectedIds = [],
  onSelectionChange,
  bulkActions = [],
  emptyTitle = 'No records found',
  emptyDescription = 'There are no items matching the selected criteria.',
  onRowClick,
}: DataTableProps<T>) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    columns.forEach((c) => (initial[c.id] = true));
    return initial;
  });
  const [showColMenu, setShowColMenu] = useState(false);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number>(-1);

  // Keyboard navigation (J/K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedRowIndex((prev) => Math.min(data.length - 1, prev + 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedRowIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Enter' && focusedRowIndex >= 0 && data[focusedRowIndex]) {
        onRowClick?.(data[focusedRowIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data, focusedRowIndex, onRowClick]);

  const handleSort = (colId: string) => {
    let nextOrder: 'asc' | 'desc' = 'asc';
    if (sortField === colId) {
      nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    setSortField(colId);
    setSortOrder(nextOrder);
    onSortChange?.(colId, nextOrder);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange?.(data.map((d) => d.id));
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange?.([...selectedIds, id]);
    } else {
      onSelectionChange?.(selectedIds.filter((i) => i !== id));
    }
  };

  const allSelected = data.length > 0 && data.every((d) => selectedIds.includes(d.id));
  const someSelected = data.some((d) => selectedIds.includes(d.id)) && !allSelected;
  const totalPages = Math.ceil(totalCount / pageSize);

  const activeColumns = useMemo(
    () => columns.filter((col) => visibleColumns[col.id]),
    [columns, visibleColumns]
  );

  return (
    <div className="relative flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden text-sm">
      {/* Table Toolbar Utilities */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
        <div className="text-xs text-neutral-500 font-medium">
          Showing <span className="font-semibold text-neutral-900 dark:text-neutral-100">{data.length}</span> of{' '}
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{totalCount}</span> records
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            onClick={() => setShowColMenu(!showColMenu)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Columns</span>
          </button>

          {showColMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 p-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-lg z-30 space-y-1">
              <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-2 py-1">
                Toggle Columns
              </div>
              {columns.map((col) => (
                <label
                  key={col.id}
                  className="flex items-center gap-2 px-2 py-1 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns[col.id]}
                    onChange={(e) =>
                      setVisibleColumns((prev) => ({ ...prev, [col.id]: e.target.checked }))
                    }
                    className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                  />
                  <span>{col.header}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Table Structure */}
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-neutral-100/70 dark:bg-neutral-800/70 text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-700">
            <tr>
              {selectable && (
                <th className="w-10 px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => el && (el.indeterminate = someSelected)}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer"
                  />
                </th>
              )}
              {activeColumns.map((col) => (
                <th
                  key={col.id}
                  style={{ width: col.width }}
                  className="px-4 py-3 font-semibold select-none"
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.id)}
                      className="inline-flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{col.header}</span>
                      {sortField === col.id ? (
                        sortOrder === 'asc' ? (
                          <ChevronUp className="w-3.5 h-3.5 text-amber-600" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-3.5 h-3.5 text-neutral-400 opacity-60" />
                      )}
                    </button>
                  ) : (
                    <span>{col.header}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {isLoading ? (
              Array.from({ length: pageSize > 6 ? 6 : pageSize }).map((_, idx) => (
                <tr key={`skeleton-${idx}`} className="h-[44px]">
                  {selectable && <td className="px-3 py-2 text-center"><div className="w-3.5 h-3.5 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" /></td>}
                  {activeColumns.map((c) => (
                    <td key={c.id} className="px-4 py-2">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={activeColumns.length + (selectable ? 1 : 0)} className="py-16 text-center">
                  <div className="max-w-sm mx-auto space-y-1">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{emptyTitle}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{emptyDescription}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, idx) => {
                const isSelected = selectedIds.includes(row.id);
                const isFocused = focusedRowIndex === idx;
                return (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className={`h-[44px] transition-colors cursor-pointer text-xs sm:text-sm ${
                      isSelected
                        ? 'bg-amber-50/60 dark:bg-amber-950/20'
                        : isFocused
                        ? 'bg-neutral-100/80 dark:bg-neutral-800/80'
                        : 'hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50'
                    }`}
                  >
                    {selectable && (
                      <td
                        className="w-10 px-3 py-2 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                          className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer"
                        />
                      </td>
                    )}
                    {activeColumns.map((col) => (
                      <td key={col.id} className="px-4 py-2.5 text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                        {col.cell
                          ? col.cell(row, idx)
                          : col.accessorKey
                          ? String((row as any)[col.accessorKey] ?? '')
                          : null}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="px-2.5 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-xs text-neutral-800 dark:text-neutral-200 focus:ring-amber-500 cursor-pointer shadow-sm"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size} className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
          <span>
            Page <strong className="text-neutral-900 dark:text-neutral-100">{page}</strong> of{' '}
            <strong className="text-neutral-900 dark:text-neutral-100">{Math.max(1, totalPages)}</strong>
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
              className="p-1.5 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-700 dark:text-neutral-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
              className="p-1.5 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-700 dark:text-neutral-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Bulk Action Dock */}
      {selectable && selectedIds.length > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg shadow-2xl border border-neutral-700 animate-in slide-in-from-bottom duration-200">
          <span className="text-xs font-semibold">
            {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="h-4 w-px bg-neutral-700 dark:bg-neutral-300" />
          <div className="flex items-center gap-1.5">
            {bulkActions.map((act, i) => (
              <button
                key={i}
                type="button"
                onClick={() => act.onClick(selectedIds)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  act.variant === 'danger'
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : act.variant === 'success'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200'
                }`}
              >
                {act.icon}
                <span>{act.label}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => onSelectionChange?.([])}
              className="px-2 py-1 text-xs text-neutral-400 hover:text-white dark:hover:text-neutral-900 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
