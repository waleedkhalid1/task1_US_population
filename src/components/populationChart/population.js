import React, { Component } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import "./populationChart.css";
import PopulationLineChart from "./graphs/populationLineChart"
import PopulationBarChart from "./graphs/populationBarChart";

class PopulationChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populationData: [],
      historyLength: 10,
      selectedYear: new Date().getFullYear(),
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
      const response = await axios.get(
        "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
      );
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
        
        <div className="chart-container">
        <div className="container">
          
          <div className="field">
            <label className="label" >
              Select history length:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="historyLength"
                  name="historyLength"
                  onChange={this.handleHistoryLengthChange}
                  value={historyLength}
                >
                  <option value="3">3 years</option>
                  <option value="5">5 years</option>
                  <option value="10">10 years</option>
                </select>
              </div>
            </div>
          </div>
        </div>
          <PopulationLineChart data={filteredData}/>
          <PopulationBarChart data={filteredData} />
        </div>
      </div>
    );
  }
  
}

export default PopulationChart;
