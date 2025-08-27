export type MatchType = {
  _id: string;
  matches: {
    _id: string;
    division: string;
    teamA: string;
    startTime: string;
    teamB: string;
    isAthome: boolean;
    Arbitrage: {
      licensed: string;
      _id: string;
    };
    posts: Post[];
    message: string;
  }[]
};
