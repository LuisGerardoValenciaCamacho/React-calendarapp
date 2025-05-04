import axios from "axios";

const calendarApi = axios.create({
    baseURL: "http://localhost:5500"
})

export default calendarApi;