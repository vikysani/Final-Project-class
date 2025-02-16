const API_KEY = "9ee61f63c0f94253beca5a263c72b1dc";
const BASE_URL = "https://api.spoonacular.com/food/wine";

/**
 * Fetch dish pairings for a given wine
 */
async function getDishPairing(wine) {
  const url = `${BASE_URL}/dishes?wine=${wine}&apiKey=${API_KEY}`; // 🔥 Corrección aquí
  return await fetchData(url);
}

/**
 * Fetch wine pairing for a given dish
 */
async function getWinePairing(food) {
  const url = `${BASE_URL}/pairing?food=${food}&apiKey=${API_KEY}`;
  return await fetchData(url);
}

/**
 * Fetch wine description for a given wine type
 */
async function getWineRecommendations(wine) {
  const url = `${BASE_URL}/recommendation?wine=${wine}&number=10&apiKey=${API_KEY}`; // 🔥 Agregado number=10
  return await fetchData(url);
}

/**
 * Generic function to fetch data from API
 */
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
