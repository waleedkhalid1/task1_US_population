import axios from "axios";

export async function fetchPopulationData() {
  try {
    const response = await axios.get(
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
    );
    const data = response.data.data;
    const formattedData = data.map((data) => ({
      year: data.Year,
      population: data.Population,
    }));
    return formattedData;
  } catch (error) {
    throw new Error(error.message);
  }
}
