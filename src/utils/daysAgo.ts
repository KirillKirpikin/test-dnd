export const daysAgo = (dateCreate: string) =>{
    const date = new Date(dateCreate);
    const currentDate = new Date();
    const differenceMs = currentDate.getTime() - date.getTime();

    // Количество дней между датами
    const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    if(daysDifference === 0){
        return 'Today'
    }else{
        return `${daysDifference} days ago`
    }


}