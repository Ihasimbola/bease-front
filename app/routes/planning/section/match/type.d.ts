export type MatchType = {
  _id: string;
  matches: {
    division: string;
    teamA: string;
    startTime: string;
    teamB: string;
    Arbitrage: {
      licensed: string;
      _id: string;
    };
    posts: Post[];
    message: string;
  }[]
};
