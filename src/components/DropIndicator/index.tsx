import React from "react";
import style from './drop.module.scss'

interface IDropIndicatorProps{
    beforeId: string | null,
    column: string
}

const DropIndicator:React.FC<IDropIndicatorProps> = ({ beforeId, column }) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={column}
        className={style.drop}
      />
    );
};

export default DropIndicator;