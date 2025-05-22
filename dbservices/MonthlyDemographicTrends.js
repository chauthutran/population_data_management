/**
 * Generate monthly DataValue documents for a given orgUnit and element set.
 *
 * @param {Object}   opts
 * @param {string}   opts.orgUnit              – e.g. "HighlandSouth"
 * @param {string}   opts.start               – ISO “YYYY-MM” start, e.g. "2010-01"
 * @param {string}   opts.end                 – ISO “YYYY-MM” end,   e.g. "2025-12"
 * @param {Object}   opts.dataElements        – map of logicalName → elementId
 * @param {Function} opts.valueGenerator      – fn(logicalName, year, month) → Number
 *
 * @returns {Array<Object>} list of { dataElement, period, orgUnit, value }
 */
function generateMonthlyData({
    orgUnit,
    start,
    end,
    dataElements,
    valueGenerator
  }) {
    const records = [];
    
    // parse YYYY-MM → year, month
    const [sy, sm] = start.split('-').map(Number);
    const [ey, em] = end.split('-').map(Number);
  
    let year = sy, month = sm;
    while (year < ey || (year === ey && month <= em)) {
      const period = `${year}${String(month).padStart(2,'0')}`; // e.g. "201001"
      
      for (const [logicalName, elementId] of Object.entries(dataElements)) {
        const value = valueGenerator(logicalName, year, month);
        records.push({
          dataElement: elementId,
          period,
          orgUnit,
          value
        });
      }
      
      // increment month
      month++;
      if (month > 12) { month = 1; year++; }
    }
  
    return records;
  }
  
  // --- Example setup for your five elements ---
  const dataElements = {
    children_under_5:    "60c72b2f9c29f80015e5f72f",  // replace with real IDs
    elderly_population:  "60c72b2f9c29f80015e5f730",
    urban_population:    "60c72b2f9c29f80015e5f731",
    rural_population:    "60c72b2f9c29f80015e5f732",
    working_age_pop:     "60c72b2f9c29f80015e5f733"
  };
  
  /**
   * Example value generator: you can plug-in any logic here.
   * This one uses simple ranges and seasonal swing for demonstration.
   */
  function exampleValueGen(name, year, month) {
    const baseRanges = {
      children_under_5:   [500, 1500],
      elderly_population: [1000, 3000],
      urban_population:   [20000, 50000],
      rural_population:   [15000, 40000],
      working_age_pop:    [30000, 70000],
    };
    
    const [min, max] = baseRanges[name];
    const seasonalFactor = 1 + 0.05 * Math.sin((month / 12) * 2 * Math.PI); 
    // slight seasonal bump mid-year
    
    const raw = Math.random() * (max - min) + min;
    return Math.round(raw * seasonalFactor);
  }
  
  // --- Usage ---
  const allMonthly = generateMonthlyData({
    orgUnit:          "HighlandSouth",
    start:            "2010-01",
    end:              "2025-12",
    dataElements,
    valueGenerator:   exampleValueGen
  });
  
  
console.log(JSON.stringify(records));