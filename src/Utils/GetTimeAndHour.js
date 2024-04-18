export const getEntryTime = () => {
  let year = new Date().getFullYear();
  let day = new Date().getDate();
  let month = new Date().getMonth();
  let actualHours = new Date().getHours()
  let hours = new Date().getHours() % 12 || 12;
  let Minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();
  let getDate = `${day}-${month}-${year}`;
  let getCurrentTime = `${hours}:${Minutes}:${seconds} ${actualHours < 12 ? "AM" : "PM"
    }`;
  return `${getDate} ${getCurrentTime}`;
};
