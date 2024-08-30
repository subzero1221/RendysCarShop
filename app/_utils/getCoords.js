export async function getCoords(carLocated) {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/geocoding?city=${carLocated}&country=Georgia`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "zU6ZuJZs5jX8X5dgT4NkqQ==B2IO8yK1e1UgRHzC",
        },
      }
    );
    const coords = await res.json();

    return { latitude: coords[0].latitude, longitude: coords[0].longitude };
  }