import { STREAK_KEY, buildStreak, formattedDate, shouldIncrementOrResetStreakCount } from "./lib"

export interface Streak {
    currentCount: number
    startDate: string
    lastLoginDate: string
}

// main
export function streakCounter(_localStorage: Storage, date: Date): Streak {
    const streakInLocalStorage = _localStorage.getItem(STREAK_KEY);

    if (streakInLocalStorage) {
        try {
            let streak = JSON.parse(streakInLocalStorage || "") as Streak;
            let STATE = shouldIncrementOrResetStreakCount(date, streak.lastLoginDate);


            if (STATE == "increment") {
                const updatedStreak: Streak = buildStreak(date,
                    {
                        currentCount: streak.currentCount + 1
                    }
                )

                _localStorage.setItem(STREAK_KEY, JSON.stringify(updatedStreak));

                streak = updatedStreak;
            }

            if (STATE == "reset") {

                // in case there was no streak found , create a one from scratch
                streak = buildStreak(date)

                _localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
            }

            return streak;

        } catch (error) {
            console.error("Failed to parse streak from localStorage");
        }
    }

    // in case there was no streak found , create a one from scratch
    const streak = buildStreak(date)

    _localStorage.setItem(STREAK_KEY, JSON.stringify(streak));

    return streak
}