import "regenerator-runtime";
import "../app.css";

const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.querySelector("#address")! as HTMLInputElement;

type GoogleGeoCodingResponse = {
  results: { geometry: { location: Coordinates } }[];
  status: "OK" | "ZERO_RESULTS";
};

type Coordinates = {
  lat: number;
  lng: number;
};

async function searchAddressHandler(event: Event) {
  event.preventDefault();
  const address = addressInput.value;
  console.log({ address });

  // send this to Google's API!
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        address
      )}&key=${GOOGLE_API_KEY}`
    );
    if (response.ok) {
      const { results }: GoogleGeoCodingResponse = await response.json();
      const coordinates = results[0].geometry.location;

      let map: google.maps.Map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 16,
        }
      );
      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    }
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", searchAddressHandler);
