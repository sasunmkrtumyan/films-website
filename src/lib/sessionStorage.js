export const readSessionArray = (key) => {
  if (typeof window === "undefined") return [];

  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const pushUniqueFront = (key, value) => {
  if (typeof window === "undefined") return;

  try {
    const current = readSessionArray(key);
    const filtered = current.filter((item) => item !== value);
    const updated = [value, ...filtered].slice(0, 10);

    sessionStorage.setItem(key, JSON.stringify(updated));
  } catch {
    console.warn("Error saving to sessionStorage");
  }
};

export const SESSION_STORAGE_KEY = "netflix_recently_clicked";

export const getRecentlyClicked = () => {
  if (typeof window === "undefined") return [];

  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addRecentlyClicked = (videoId) => {
  if (typeof window === "undefined") return;

  try {
    const recent = getRecentlyClicked();
    const filtered = recent.filter((item) => item.videoId !== videoId);
    const updated = [{ videoId, timestamp: Date.now() }, ...filtered].slice(
      0,
      10
    );

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    console.warn("Error saving to sessionStorage");
  }
};
