export const getWeek = (date) => {
    let onejan = new Date(date.getFullYear(), 0,1);
    return Math.floor((((date - onejan) / 86400000) + onejan.getDay()-1) / 7);
  };

  
export const getDateTodayForInputDate = () =>{
    let month = new Date().getMonth()+1
    month = month<10 ? '0'+month.toString() : month
    let day = new Date().getDate()
    day = day<10 ? '0'+day.toString() : day
    return `${new Date().getFullYear()}-${month}-${day}`;
}
