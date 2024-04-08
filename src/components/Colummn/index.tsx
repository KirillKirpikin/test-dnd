import React, { useState } from "react";
import { IRepo } from "../../types/repo.type";
import Card from "../Card";
import DropIndicator from "../DropIndicator";
import { useAppSelector } from "../../hooks/useTypedSelector";

import styles from './column.module.scss'

interface IColumnProps{
  title: string,
  column: string,
  headingColor:string,
  cards: IRepo[],
  setCards: (cards: IRepo[]) => void;


}

const Column:React.FC<IColumnProps> = ({ title, headingColor, cards, column, setCards }) => {
  const [active, setActive] = useState(false);
  const searchValue = useAppSelector(state=>state.search)

  const handleDragStart = (e:  React.DragEvent<HTMLDivElement>, card: IRepo) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e:React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = (element as HTMLElement).dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      setCards(copy);
      localStorage.setItem(searchValue.trim(), JSON.stringify(copy));
    }
  };

  const handleDragOver = (e:React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: Element[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
     if (i instanceof HTMLElement) {
      i.style.opacity = "0";
    }
    });
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    if (el && el.element instanceof HTMLElement) {
      el.element.style.opacity = "1";
    }
  };

  const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: Element[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className={styles.column}>
      <div className={styles.head}>
        <h3 className={`${headingColor}`}>{title}</h3>
        <span>
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`${styles.body} ${active ? styles.active : ''}`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} card={c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

export default Column;