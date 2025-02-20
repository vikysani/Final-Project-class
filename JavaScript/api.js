const API_KEY = "d34a1508516d4dea8096536a3dff0399";
const BASE_URL = "https://api.spoonacular.com/food/wine";

/** Fetch wine pairing for a given dish */
export async function getWinePairing(food) {
  const url = `${BASE_URL}/pairing?food=${food}&apiKey=${API_KEY}`;
  return await fetchData(url);
}

/** Fetch dish pairings for a given wine */
export async function getDishPairing(wine) {
  const url = `${BASE_URL}/dishes?wine=${wine}&apiKey=${API_KEY}`;
  return await fetchData(url);
}

/** Fetch wine description */
export async function getWineDescription(wine) {
  const url = `${BASE_URL}/description?wine=${wine}&apiKey=${API_KEY}`;
  return await fetchData(url);
}

/** Generic function to fetch data */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  }
}

console.log("✅ api.js y index.js cargados correctamente");
