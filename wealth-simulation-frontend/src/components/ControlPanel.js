// src/components/ControlPanel.js
import React, { useState } from 'react';
import Plot from 'react-plotly.js';

// Inside your component render:
//123
const NUM_DECILES = 10;

const ControlPanel = ({ onRun }) => {
  const [totalPopulation, setTotalPopulation] = useState(1000);
  const [numTimeSteps, setNumTimeSteps] = useState(10);
  const [inheritanceTaxRate, setInheritanceTaxRate] = useState(0.2);
  const [wealthTax, setWealthTax] = useState(0.05);
  const [cgTax, setCgTax] = useState(0.2); // NEW: Capital Gains Tax

const [wealthPerDecile, setWealthPerDecile] = useState([10, 2024, 4070, 7000, 11351, 19632, 36300, 74983, 226172, 2400547]);
const [birthRate, setBirthRate] = useState([0.09, 0.08, 0.07, 0.065, 0.05, 0.048, 0.04, 0.03, 0.025, 0.02]); // May refine using avg_birth_rate later
const [deathRate, setDeathRate] = useState([0.025, 0.02, 0.018, 0.014, 0.012, 0.011, 0.008, 0.007, 0.006, 0.005]);
const [netMigration, setNetMigration] = useState([0.05, 0.04, 0.035, 0.0325, 0.025, 0.024, 0.02, 0.015, 0.011, 0.01]);
const [rateOfReturn, setRateOfReturn] = useState([0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16]); // up to 0.16 as in backend
const [savingsRate, setSavingsRate] = useState([0, 0, 0.02, 0.05, 0.08, 0.12, 0.15, 0.2, 0.3, 0.6]);
const [wageBandLow, setWageBandLow] = useState([0, 18001, 28501, 42001, 62001, 95771, 149759, 240001, 417432, 852669]);
const [wageBandHigh, setWageBandHigh] = useState([18000, 28500, 42000, 62000, 95770, 149758, 240000, 417431, 852668, 5000000]);
const [unemploymentRate, setUnemploymentRate] = useState([0.58, 0.53, 0.47, 0.41, 0.34, 0.28, 0.22, 0.16, 0.1, 0.05]);
const [avgBirthRate, setAvgBirthRate] = useState(avg(birthRate));
const [avgDeathRate, setAvgDeathRate] = useState(avg(deathRate));
const [avgNetMigration, setAvgNetMigration] = useState(avg(netMigration));
const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const handleRun = () => {
    onRun({
      total_population: totalPopulation,
      num_time_steps: numTimeSteps,
      inheritance_tax_rate: inheritanceTaxRate,
      wealth_tax: wealthTax,
      cg_tax: cgTax, // NEW: Send to backend
      wealth_per_decile: wealthPerDecile,
      birth_rate: birthRate,
      death_rate: deathRate,
      net_migration: netMigration,
      rate_of_return: rateOfReturn,
      savings_rate: savingsRate,
      wage_band_low: wageBandLow,
      wage_band_high: wageBandHigh,
      unemployment_rate: unemploymentRate,
        avg_birth_rate: avg(birthRate),
    avg_death_rate: avg(deathRate),
    avg_net_migration: avg(netMigration),
    });
  };

const renderBarGraph = (label, values, setter) => (
  <div style={{ margin: '40px 0 40px 50px', maxWidth: '900px' }}>
    <h4>{label}</h4>
    <Plot
      data={[{
        type: 'bar',
        x: Array.from({ length: NUM_DECILES }, (_, i) => `D${i + 1}`),
        y: values,
        marker: { color: 'royalblue' },
      }]}
      layout={{
        autosize: true,
        height: 250,
        margin: { l: 50, r: 50, t: 30, b: 40 },
        xaxis: { title: 'Decile' },
        yaxis: { title: label,
        autorange: true
        },
      }}
      config={{ responsive: true }}
      onClick={(e) => {
        const pointIndex = e.points[0].pointIndex;
        const newY = prompt(`Set value for Decile ${pointIndex + 1}`, values[pointIndex]);
        if (newY !== null && !isNaN(newY)) {
          const newValues = [...values];
          newValues[pointIndex] = parseFloat(newY);
          setter(newValues);
        }
      }}
    />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
      {values.map((val, i) => (
        <div key={`${label}-val-${i}`} style={{ fontSize: '0.9em', width: '10%', textAlign: 'center' }}>
          <strong>D{i + 1}</strong><br />{val.toFixed(2)}
        </div>
      ))}
    </div>
  </div>
);
return (
  <div>
    <h2>Simulation Control Panel</h2>

    <label style={{ marginLeft: '50px' }}>Total Population:</label>
    <input
      type="number"
      value={totalPopulation}
      onChange={(e) => setTotalPopulation(Number(e.target.value))}
      style={{ marginLeft: '10px' }}
    /><br />

    <label style={{ marginLeft: '50px' }}>Time Steps:</label>
    <input
      type="number"
      value={numTimeSteps}
      onChange={(e) => setNumTimeSteps(Number(e.target.value))}
      style={{ marginLeft: '10px' }}
    /><br />

    <label style={{ marginLeft: '50px' }}>Inheritance Tax Rate:</label>
    <input
      type="number"
      step="0.01"
      value={inheritanceTaxRate}
      onChange={(e) => setInheritanceTaxRate(Number(e.target.value))}
      style={{ marginLeft: '10px' }}
    /><br />

    <label style={{ marginLeft: '50px' }}>Wealth Tax Rate:</label>
    <input
      type="number"
      step="0.01"
      value={wealthTax}
      onChange={(e) => setWealthTax(Number(e.target.value))}
      style={{ marginLeft: '10px' }}
    /><br />

    <label style={{ marginLeft: '50px' }}>Capital Gains Tax Rate:</label>
    <input
      type="number"
      step="0.01"
      value={cgTax}
      onChange={(e) => setCgTax(Number(e.target.value))}
      style={{ marginLeft: '10px' }}
    /><br />

    {/* Average Rates Section */}
    <div style={{ marginLeft: '50px', marginTop: '30px' }}>
      <h4>Average Parameters (editable)</h4>

      <label>Average Birth Rate:</label>
      <input
        type="number"
        step="0.001"
        value={avgBirthRate}
        onChange={(e) => setAvgBirthRate(Number(e.target.value))}
        style={{ marginLeft: '10px', marginRight: '20px' }}
      />

      <label>Average Death Rate:</label>
      <input
        type="number"
        step="0.001"
        value={avgDeathRate}
        onChange={(e) => setAvgDeathRate(Number(e.target.value))}
        style={{ marginLeft: '10px', marginRight: '20px' }}
      />

      <label>Average Net Migration:</label>
      <input
        type="number"
        step="0.001"
        value={avgNetMigration}
        onChange={(e) => setAvgNetMigration(Number(e.target.value))}
        style={{ marginLeft: '10px' }}
      />
    </div>

    {/* Graphs */}
    {renderBarGraph("Wealth per Decile", wealthPerDecile, setWealthPerDecile)}
    {renderBarGraph("Birth Rate per Decile", birthRate, setBirthRate)}
    {renderBarGraph("Death Rate per Decile", deathRate, setDeathRate)}
    {renderBarGraph("Net Migration per Decile", netMigration, setNetMigration)}
    {renderBarGraph("Rate of Return per Decile", rateOfReturn, setRateOfReturn)}
    {renderBarGraph("Savings Rate per Decile", savingsRate, setSavingsRate)}
    {renderBarGraph("Wage Band Low", wageBandLow, setWageBandLow)}
    {renderBarGraph("Wage Band High", wageBandHigh, setWageBandHigh)}
    {renderBarGraph("Unemployment Rate per Decile", unemploymentRate, setUnemploymentRate)}

    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <button onClick={handleRun} style={{ fontSize: '16px', padding: '10px 20px' }}>
        Run Simulation
      </button>
    </div>
  </div>
);

};

export default ControlPanel;