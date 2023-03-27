import axios from "axios";

export async function fetchPopulationData() {
  try {
    const response = await axios.get(
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
    );
    const populationData = response.data.data;
    const formattedData = populationData.map((data) => ({
      year: data.Year,
      population: data.Population,
    }));
    return formattedData;
  } catch (error) {
    throw new Error(error.message);
  }
}
