/*
 * Solved-problem counts from LeetCode's public GraphQL endpoint, fetched on the
 * server (the browser can't call it: no CORS) and refreshed twice a day.
 * If LeetCode is unreachable the page falls back to the last known numbers.
 */

export const LEETCODE_USER = "mehtaaarush";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface LeetCodeStats {
  solved: number;
  byDifficulty: Record<Difficulty, { solved: number; total: number }>;
  live: boolean;
}

/** last known numbers (21 Nov 2026), used if the request fails */
const FALLBACK: LeetCodeStats = {
  solved: 108,
  byDifficulty: {
    Easy: { solved: 94, total: 976 },
    Medium: { solved: 14, total: 2148 },
    Hard: { solved: 0, total: 991 },
  },
  live: false,
};

const QUERY = `query stats($u: String!) {
  matchedUser(username: $u) { submitStatsGlobal { acSubmissionNum { difficulty count } } }
  allQuestionsCount { difficulty count }
}`;

type Count = { difficulty: string; count: number };

export async function getLeetCodeStats(): Promise<LeetCodeStats> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({ query: QUERY, variables: { u: LEETCODE_USER } }),
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 43200 },
    });
    if (!res.ok) return FALLBACK;
    const { data } = (await res.json()) as {
      data?: { matchedUser?: { submitStatsGlobal: { acSubmissionNum: Count[] } }; allQuestionsCount?: Count[] };
    };
    const solved = data?.matchedUser?.submitStatsGlobal.acSubmissionNum;
    const totals = data?.allQuestionsCount;
    if (!solved || !totals) return FALLBACK;

    const get = (list: Count[], d: string) => list.find((c) => c.difficulty === d)?.count ?? 0;
    const levels: Difficulty[] = ["Easy", "Medium", "Hard"];
    return {
      solved: get(solved, "All"),
      byDifficulty: Object.fromEntries(levels.map((d) => [d, { solved: get(solved, d), total: get(totals, d) }])) as LeetCodeStats["byDifficulty"],
      live: true,
    };
  } catch {
    return FALLBACK;
  }
}
