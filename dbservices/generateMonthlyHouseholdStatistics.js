/**
 * Generate monthly DataValue documents for Literacy Rate and Poverty Line.
 *
 * @param {Object} opts
 * @param {string} opts.orgUnit           – e.g. "HighlandSouth"
 * @param {string} opts.start             – ISO “YYYY-MM” start, e.g. "2010-01"
 * @param {string} opts.end               – ISO “YYYY-MM” end,   e.g. "2025-04"
 * @param {Object} opts.dataElements      – map of logicalName → elementId
 * @param {Function} opts.valueGenerator  – fn(logicalName, year, month) → Number
 * @returns {Array<Object>}               – [{ dataElement, period, orgUnit, value }, …]
 */
function generateLiteracyAndPoverty({
    orgUnit,
    start = "2010-01",
    end   = "2025-04",
    dataElements,
    valueGenerator
  }) {
    const records = [];
    const [sy, sm] = start.split('-').map(Number);
    const [ey, em] = end.split('-').map(Number);
    let year = sy, month = sm;
  
    while (year < ey || (year === ey && month <= em)) {
      const period = `${year}${String(month).padStart(2, '0')}`; // "201001"
  
      for (const [key, elementId] of Object.entries(dataElements)) {
        const value = valueGenerator(key, year, month);
        records.push({ dataElement: elementId, period, orgUnit, value });
      }
  
      month++;
      if (month > 12) { month = 1; year++; }
    }
  
    return records;
  }
  
  // ————————————————————————————
  // Example setup for your two metrics
  // ————————————————————————————
  const dataElements = {
    literacy_rate:            "60c72b2f9c29f80015e5f739",   // replace with actual ID
    poverty_line_population:  "60c72b2f9c29f80015e5f73a"     // replace with actual ID
  };
  
  /**
   * Example value generator:
   * - Literacy Rate: starts ~75%, trends upward to ~95% by 2025, with small noise.
   * - Poverty Line: starts ~30%, trends downward to ~10% by 2025, with small noise.
   */
  function exampleValueGen(key, year, month) {
    // linear trend helpers
    const pctThrough =
      ((year + (month-1)/12) - 2010) / ((2025 + 4/12) - 2010);
  
    if (key === "literacy_rate") {
      // from 75% → 95%
      const base = 75 + 20 * pctThrough;
      return +(base + (Math.random()*2 - 1)).toFixed(1);
    }
    if (key === "poverty_line_population") {
      // from 30% → 10%
      const base = 30 - 20 * pctThrough;
      return +(base + (Math.random()*2 - 1)).toFixed(1);
    }
    return 0;
  }
  
  // ————————————————————————————
  // Usage
  // ————————————————————————————
  const monthlyData = generateLiteracyAndPoverty({
    orgUnit:         "HighlandSouth",
    start:           "2010-01",
    end:             "2025-04",
    dataElements,
    valueGenerator:  exampleValueGen
  });
  
console.log(JSON.stringify(records));
  