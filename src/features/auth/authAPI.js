// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try{
    const response = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "content-type": "application/json" },
    });
    if(response.ok){
      const data = await response.json();
        resolve({data})
    }
    else
    {
      const err = await response.json();
      reject({error:err})
    }

  } catch(err){
    reject({error:err})
  }

})
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try{
    const response = await fetch("/auth/check");
    if(response.ok){
      const data = await response.json();
        resolve({data})
    }
    else
    {
      const err = await response.json();
      reject(err)
    }

  } catch(err){
    reject(err)
  }

})
}

export function checkUserf(userData) {
  return new Promise(async (resolve, reject) => {
    const email = userData.email;
    const password = userData.password;
    const response = await fetch("/users?email=" + email);
    const data = await response.json();
    console.log("login data", data[0]);
    if (data.length) {
      if (password === data[0].password) {
        console.log("password matched", password, data[0].password);
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
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/logout');
      if (response.ok) {
        resolve({ data:'success' });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error)
      reject( error );
    }
  });
}
