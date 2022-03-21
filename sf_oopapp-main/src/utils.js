import { User } from "./models/User";

export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateTestUser = function (User) {
  localStorage.clear();
  const testUser = new User("test", "qwerty123");
  User.save(testUser);
  const testUser1 = new User("qwe", "qwe");
  User.save(testUser1);
};

export const registerUser = function (login, pass) {
  const newUser = new User(login, pass);
  User.save(newUser);
}



