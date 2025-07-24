import css from "./cell.module.css";
import { COLORS } from "@/lib/definitions";

export function Cell({ value, color }) {
  return (
    <div
      className={css.cell}
      style={{ backgroundColor: COLORS[color] }}
    >
      {value}
    </div>
  );
}
