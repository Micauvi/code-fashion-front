const getCookiesKeysAndValues = () => {
  const cookiesKeysAndValues = document.cookie.split("=");
  return cookiesKeysAndValues;
};

const getLoggedUserPayload = () => {
  if (isLoggedIn()) {
    const userIndex = getCookiesKeysAndValues().indexOf("authToken") + 1;
    const authToken = getCookiesKeysAndValues()[userIndex].split(".");
    const userInfoEncoded = authToken[1];
    const decodedUserInfo = JSON.parse(atob(userInfoEncoded));
    return decodedUserInfo.payload;
  }
};
export const isLoggedIn = () => {
  if (getCookiesKeysAndValues().includes("authToken")) return true;

  return false;
};

export const getLoggedUser = () => {
  const { id, email } = getLoggedUserPayload();
  return { id, email };
};
