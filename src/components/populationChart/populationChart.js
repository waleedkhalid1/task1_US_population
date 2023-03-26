import React, { Component } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

class PopulationChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populationData: [],
      historyLength: 10,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await axios.get("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
      const data = response.data.data;
      const formattedData = data.map((d) => ({
        year: d.Year,
        population: d.Population,
      }));
      this.setState({ populationData: formattedData, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }

  handleHistoryLengthChange = (event) => {
    this.setState({ historyLength: parseInt(event.target.value) });
  };

  render() {
    const { populationData, historyLength, isLoading, error } = this.state;

    const filteredData = populationData.filter((d) => {
      const currentYear = new Date().getFullYear();
      const historyEndYear = currentYear - historyLength;
      return parseInt(d.year) >= historyEndYear && parseInt(d.year) <= currentYear;
    });

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="App">
        <div>
          <label htmlFor="historyLength">Select history length: </label>
          <select name="historyLength" id="historyLength" onChange={this.handleHistoryLengthChange} value={historyLength}>
            <option value="3">3 years</option>
            <option value="5">5 years</option>
            <option value="10">10 years</option>
          </select>
        </div>
        <LineChart width={800} height={400} data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="population" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

export default PopulationChart;
