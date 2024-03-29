import { Streak } from ".";

/** used when saving the streak to `localStorage` */
export const STREAK_KEY = "streak";

export function differenceInDays(dateLeft: Date, dateRight: Date): number {
    const diffTime = Math.abs(dateLeft.getTime() - dateRight.getTime());
    const differenceInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return differenceInDays;
}

export function shouldIncrementOrResetStreakCount(
    currentDate: Date,
    lastLoginDate: string
): "increment" | "reset" | "none" {
    // We get 11/5/2021
    // so to get 5, we use our helper function
    const difference = differenceInDays(currentDate, new Date(lastLoginDate));
    // This means they logged in the day after the currentDate
    if (difference === 1) {
        return "increment"
    }

    // this means they logged in the same day
    if (difference === 0) {
        return "none"
    }

    // Otherwise they logged in after a day, which would
    // break the streak
    return "reset"
}

export function formattedDate(date: Date): string {
    return date.toLocaleDateString("en-US");
}

export function buildStreak(
    date: Date,
    overrideDefault?: Partial<Streak>
): Streak {

    const defaultStreak: Streak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date)
    }

    return {
        ...defaultStreak,
        ...overrideDefault
    }
}