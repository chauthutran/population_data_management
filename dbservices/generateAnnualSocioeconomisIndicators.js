/**
 * Generate rate-based DataValue documents for a given orgUnit and year range.
 * Each year produces five entries:
 *   – birth_rate             (10–30 births per 1,000)
 *   – death_rate             (5–15 deaths per 1,000)
 *   – infant_mortality_rate  (5–50 per 1,000 live births)
 *   – migration_rate         (–2% to +2%)
 *   – avg_household_size     (2.5 to 6.0 persons)
 */
function generateDemographicRates({
    orgUnit = "HighlandSouth",
    startYear = 2010,
    endYear   = 2025,
  } = {}) {
    const dataElems = {
      birth_rate:            "60c72b2f9c29f80015e5f734",
      death_rate:            "60c72b2f9c29f80015e5f735",
      infant_mortality_rate: "60c72b2f9c29f80015e5f736",
      migration_rate:        "60c72b2f9c29f80015e5f737",
      avg_household_size:    "60c72b2f9c29f80015e5f738",
    };
  
    const records = [];
  
    for (let year = startYear; year <= endYear; year++) {
      // Helper to pick a random float in [min, max], rounded to `dec` decimals
      const randFloat = (min, max, dec = 1) =>
        +(Math.random() * (max - min) + min).toFixed(dec);
  
      records.push(
        { dataElement: dataElems.birth_rate,            period: `${year}`, orgUnit, value: randFloat(10.0, 30.0, 1) },
        { dataElement: dataElems.death_rate,            period: `${year}`, orgUnit, value: randFloat(5.0, 15.0, 1) },
        { dataElement: dataElems.infant_mortality_rate, period: `${year}`, orgUnit, value: randFloat(5.0, 50.0, 1) },
        { dataElement: dataElems.migration_rate,        period: `${year}`, orgUnit, value: randFloat(-2.0, 2.0, 2) },
        { dataElement: dataElems.avg_household_size,    period: `${year}`, orgUnit, value: randFloat(2.5, 6.0, 1) }
      );
    }
  
console.log(JSON.stringify(records));
    return records;
  }
  
  // Example usage:
  const fs = require('fs');
  const rates = generateDemographicRates({ orgUnit: "HighlandSouth", startYear: 2010, endYear: 2025 });
  fs.writeFileSync('highland_south_rates_2010_2025.json', JSON.stringify(rates, null, 2));
  console.log(`Generated ${rates.length} rate-based DataValues.`);
  