// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function login(email, password) {
  const payload = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/tokens`, requestOptions);
  const data = await response.json();

  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    return data.token;
  } else {
    return data
  }
}

export async function signup(email, password) {
  const payload = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);
  const data = await response.json()
  if (response.status === 201) {
    return;
  } else if (response.status === 406) {
    return data 
  } else {
    throw new Error(
      `Received status ${response.status} when signing up. Expected 201`
    );
  }
}
