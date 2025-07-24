// @ts-check

import css from "./page.module.css";
import { Game } from "@/components/game";

export default function Home() {
  return (
    <div className={css.home}>
      <Game />
    </div>
  );
}
