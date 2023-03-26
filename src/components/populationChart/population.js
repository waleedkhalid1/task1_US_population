import React, { Component } from "react";
import "./populationChart.css";
import PopulationLineChart from "./graphs/populationLineChart"
import PopulationBarChart from "./graphs/populationBarChart";
import { fetchPopulationData } from "../services/populationService"

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
        const populationData = await fetchPopulationData();
        this.setState({ populationData, isLoading: false });
      } catch (error) {
        this.setState({ error: error.message, isLoading: false });
      }
    }

  handleHistoryLengthChange = (event) => {
    this.setState({ historyLength: parseInt(event.target.value) });
  };

  render() {
    const { populationData, historyLength, isLoading, error } = this.state;

    const filteredData = populationData.filter((data) => {
      const currentYear = new Date().getFullYear();
      const historyEndYear = currentYear - historyLength;
      return parseInt(data.year) >= historyEndYear && parseInt(data.year) <= currentYear;
    });

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
      <div className="chart-container ">
        <div >
          <h1 className="heading">Evolution of the US Population</h1>
          <div className="container ">
            <div className="columns is-centered">
              <div className="column is-one-third-desktop">
                <div className="field has-text-centered">
                  <label className="label">Select history length:</label>
                  <div className="control">
                    <div className="select is-fullwidth">
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
            </div>
            <div className="columns">
              <div className="column is-6">
                <PopulationLineChart data={filteredData} />
              </div>
              <div className="column is-6">
                <PopulationBarChart data={filteredData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopulationChart;
