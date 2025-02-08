import moment from "moment";

function getCurrentTime() {
    const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");
    return "[" + formattedDate + "]";
}

export default getCurrentTime;