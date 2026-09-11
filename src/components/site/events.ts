/** Cross-section browser events used by the interactive site pieces. */
export const QUICKWIN_EVENT = "site:quickwin"; // detail: area id | null
export const INTEREST_EVENT = "site:interest"; // detail: interest label

export function selectInterest(interest: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: interest }));
  }
}
