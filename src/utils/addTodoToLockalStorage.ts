import { IRepo } from "../types/repo.type";

// interface Props{
//     data: IRepo[],
//     setCards: (cards: IRepo[]) => void,
//     searchValue: string
// }



export const addTodoToLockalStorage = (data: IRepo[], setCards:(cards: IRepo[]) => void,  searchValue: string ) =>{
    if(data){
        const cardsWithColumns = data.map((card: Omit<IRepo, 'column'>) => ({
            ...card,
            column: 'todo',
            id: String(card.id)
        }));
        setCards(cardsWithColumns);
        const key = searchValue.trim();
        const storedData = localStorage.getItem(key);
        if (storedData) {
            const parsedData = JSON.parse(storedData);

            const updatedData = parsedData.map((storedCard: IRepo) => {
                const newData = cardsWithColumns.find((serverCard: IRepo) => serverCard.id === storedCard.id);

                if (newData) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const updatedCard: Partial<IRepo> = Object.keys(storedCard).reduce((acc:any, key:string) => {
                        const newDataValue = newData[key as keyof IRepo];
                        const storedCardValue = storedCard[key as keyof IRepo];
                    
                        if (key !== 'column' && newDataValue !== undefined && newDataValue !== storedCardValue) {
                            if (typeof newDataValue !== 'undefined') {
                                acc[key as keyof IRepo] = newDataValue as IRepo[keyof IRepo];
                            } else {
                                throw new Error(`newDataValue is undefined for key ${key}`);
                            }
                        } else {
                            acc[key as keyof IRepo] = storedCardValue;
                        }
                        return acc;
                    }, {} as Partial<IRepo>);
                
                    return updatedCard;
                } else {
                    return storedCard;
                }
            });

            setCards(updatedData);
            localStorage.setItem(key, JSON.stringify(updatedData));
        } else {
            setCards(cardsWithColumns);
            localStorage.setItem(key, JSON.stringify(cardsWithColumns));
        }
    }   
}