import axios from "axios";
import IDataList from "../model/IDataList";

export const getItemsData = () => {
    return axios
        .get<IDataList[]>(`http://localhost:4002/items`)
        .then((response) => response.data);
};

export const pushData = (newExpense: Omit<IDataList, "id">) => {
    return axios.post<IDataList>("http://localhost:4002/items", newExpense, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};