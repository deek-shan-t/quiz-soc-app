export type PastQuiz = {
  id: number;
  title: string;
  winners: string[];
  finalists: string[];
  participants: string[];
  date: string;
};

export type UpcomingQuiz = {
  id: number;
  title: string;
  QMs: string[];
  date: string;
  registration_link: string;
};

export type LeaderboardEntry = {
  id: number;
  quiz_name: string;
  quiz_date: string;
  Mordor: number;
  Rivendell: number;
  HelmsDeep: number;
  Edoras: number;
};
