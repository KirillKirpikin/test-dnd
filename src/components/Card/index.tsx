import React from "react";
import { IRepo } from "../../types/repo.type";
import DropIndicator from "../DropIndicator";
import { daysAgo } from "../../utils/daysAgo";
import styles from './card.module.scss'

interface ICardProps {
  card: IRepo,
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: IRepo) => void
}

const Card:React.FC<ICardProps> = ({ card, handleDragStart }) => {
    return (
      <>
        <DropIndicator beforeId={card.id} column={card.column} />
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(e, card)}
          className={styles.card}
        >
          <p>{card.title}</p>
          <div>
              <p>#{card.number} | opened {daysAgo(card.created_at)}</p>
          </div>
          <div>
              <p>{card.user.type} | Comments: {card.comments}</p>
          </div>
          <div>
            <a href={card.html_url} target="_blank">Link to issues</a>
          </div>
        </div>
      </>
    );
  };

export default Card