export const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}users`);

    return await response.json();
  } catch (error) {
    return error;
  }
}

export async function getPosts() {
  try {
    const response = await fetch(`${BASE_URL}posts`);

    return await response.json();
  } catch (error) {
    return error;
  }
}

export async function getAlbums() {
  try {
    const response = await fetch(`${BASE_URL}albums`);

    return await response.json();
  } catch (error) {
    return error;
  }
}