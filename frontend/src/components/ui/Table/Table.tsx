"use client";

import styles from "./Table.module.less";
import { Skeleton } from "@ats/components/ui/Skeleton/Skeleton";

export interface Column {
  key: string;
  header: string;
  render?: (item: Record<string, unknown>) => React.ReactNode;
  width?: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  onRowClick?: (item: Record<string, unknown>) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function Table({
  columns,
  data,
  onRowClick,
  loading,
  emptyMessage = "No data found",
}: TableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            {columns.map((col) => (
              <th
                key={col.key}
                className={styles.headerCell}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className={styles.skeletonRow}>
                {columns.map((col) => (
                  <td key={col.key} className={styles.bodyCell}>
                    <Skeleton
                      height={14}
                      width={col.key === "title" ? "60%" : "80%"}
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyRow}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={(item.id as string) || idx}
                className={`${styles.bodyRow} ${onRowClick ? styles.clickable : ""}`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={styles.bodyCell}>
                    {col.render
                      ? col.render(item)
                      : String(item[col.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
