{/* <script> */}


function generateHighlandSouthData({
  orgUnit = "65f123000000000000000015",
  startYear = 2010,
  endYear   = 2025,
  initialPopulation = 42000,
  areaKm2 = 500
} = {}) {
  const dataElems = {
    total_population:   "60c72b2f9c29f80015e5f72a",
    pop_growth_rate:    "60c72b2f9c29f80015e5f72b",
    pop_density:        "60c72b2f9c29f80015e5f72c",
    male_population:    "60c72b2f9c29f80015e5f72d",
    female_population:  "60c72b2f9c29f80015e5f72e",
  };

  const records = [];
  let prevTotal = initialPopulation;

  for (let year = startYear; year <= endYear; year++) {
    let total, growth;
    if (year === startYear) {
      total  = prevTotal;
      growth = 0.0;
    } else {
      growth = +(Math.random() * (3.0 - 1.5) + 1.5).toFixed(2);
      total  = Math.round(prevTotal * (1 + growth / 100));
    }

    const density = +(total / areaKm2).toFixed(1);
    const malePct  = Math.random() * (0.49 - 0.47) + 0.47;
    const male     = Math.round(total * malePct);
    const female   = total - male;

    records.push(
      { dataElement: dataElems.total_population,  period: `${year}`, orgUnit, value: total   },
      { dataElement: dataElems.pop_growth_rate,   period: `${year}`, orgUnit, value: growth  },
      { dataElement: dataElems.pop_density,       period: `${year}`, orgUnit, value: density },
      { dataElement: dataElems.male_population,   period: `${year}`, orgUnit, value: male    },
      { dataElement: dataElems.female_population, period: `${year}`, orgUnit, value: female  }
    );

    prevTotal = total;
  }

console.log(JSON.stringify(records));
  return records;
}

{/* generateHighlandSouthData();
</script>

<body>
HE HE HE !!!
<body> */}