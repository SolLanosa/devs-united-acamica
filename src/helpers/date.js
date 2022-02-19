const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const getAbbreviatedMonth = (timestamp) => monthNames[new Date(timestamp).getMonth()];
export const getDay = (timestamp) => new Date(timestamp).getDate();
export const getAbbreviatedDate = (timestamp) =>
    `${getDay(timestamp)} ${getAbbreviatedMonth(timestamp)} `;
