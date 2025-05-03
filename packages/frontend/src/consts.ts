import { MatchStat } from "./types";

export const YEAR_CAP = 500;
export const TICKET_PRICE = 300;
export const LOWEST_MATCH_COUNT = 2;
export const HIGHEST_MATCH_COUNT = 5;

export const DEFAULT_MATCH_STATS: MatchStat = {
    ...Array.from(
        { length: HIGHEST_MATCH_COUNT - LOWEST_MATCH_COUNT + 1 },
        (_, index) => ({
            [LOWEST_MATCH_COUNT + index]: 0,
        })
    ).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
};
