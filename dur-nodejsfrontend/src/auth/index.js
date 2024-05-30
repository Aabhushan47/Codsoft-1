import { API } from "../config";

// for signup
export const signUp = (user) => {
  return fetch(`${API}/register`, {
    method: "POST",
    //json data read garna paryo bhanera
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //convert json data to string for storage
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return { error: err.message };
    });
};

// for login
export const login = (user) => {
  return fetch(`${API}/login`, {
    method: "POST",
    //json data read garna paryo bhanera
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //convert json data to string for storage
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return { error: err.message };
    });
};

//authenticate  and to store token in localstorage
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

// redirect user by role if authenticated
export const isAuthenticated = () => {
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

//signout
export const logout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt", JSON.stringify("jwt"));
    next();
    return fetch(`${API}/logout`, {
      method: "POST",
    })
      .then((res) => {
        console.log("logout", res);
      })
      .catch((err) => console.log(err));
  }
};
