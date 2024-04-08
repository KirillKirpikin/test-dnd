import React from "react";
import Column from "../Colummn";
import { IRepo } from "../../types/repo.type";
import styles from './board.module.scss'

interface IBoardProps{
  cards: IRepo[],
  setCards: (cards: IRepo[]) => void;
}

const Board:React.FC<IBoardProps> = ({cards, setCards}) => {
  return (
    <div className={styles.board}>

      <Column
        title="TODO"
        column="todo"
        headingColor="text-purple-600"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="IN PROGRESS"
        column="in_progress"
        headingColor="text-blue-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="COMPLETE"
        column="done"
        headingColor="text-emerald-500"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

export default Board;