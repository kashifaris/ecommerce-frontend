// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(userData) {
  return new Promise(async (resolve, reject) => {
    const email = userData.email;
    const password = userData.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    console.log("login data", data[0]);
    if (data.length) {
      if (password === data[0].password) {
        console.log("password matched",password,data[0].password);
        resolve({ data: data[0] });
      } else {
        console.log("password matched");
        reject({ message: "wrong credentials" });
      }
    } else {
      reject({ message: "wrong credentials" });
    }
    //todo
  });
}

export function logout(user) {
  return new Promise(async (resolve) => {
    //TODO for BackEnd
    console.log('loggedOut')
    resolve({ user });
  });
}


