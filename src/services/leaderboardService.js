import http from "./httpService";
import { baseURL } from "../constants/constants";
const getLeaderboardData = baseURL + "leader-board";

export async function getLeaderboardList() {
    try {
        const token = localStorage.getItem("token");
        const { data } = await http.get(getLeaderboardData, {}, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        });
        return data;
    } catch (error) {
        console.log("error ", error);
    }
  }