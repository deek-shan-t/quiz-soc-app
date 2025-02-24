import axios from "axios";
import { API_BASE_URL } from "../config";
import { PastQuiz, UpcomingQuiz, LeaderboardEntry } from "./types";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch past quizzes
export const fetchPastQuizzes = async (): Promise<PastQuiz[]> => {
  const response = await api.get<PastQuiz[]>("/api/past_quizzes");
  return response.data;
};

// Fetch upcoming quizzes
export const fetchUpcomingQuizzes = async (): Promise<UpcomingQuiz[]> => {
  const response = await api.get<UpcomingQuiz[]>("/api/upcoming_quizzes");
  return response.data;
};

// Fetch leaderboard
export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const response = await api.get<LeaderboardEntry[]>("/api/leaderboard");
  return response.data;
};
