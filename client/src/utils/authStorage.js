const TOKEN_KEY = "token";
const USER_KEY = "user";

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
  const savedUser = localStorage.getItem(USER_KEY);
  const savedToken = getStoredToken();

  if (!savedUser || !savedToken) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    clearAuthStorage();
    return null;
  }
};

export const setAuthStorage = ({ token, user }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const hasStoredSession = () => Boolean(getStoredToken() && getStoredUser());
