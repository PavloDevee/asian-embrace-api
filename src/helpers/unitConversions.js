/**
 * Backend unit conversion utilities for weight and height
 * Handles conversion between metric (kg, cm) and imperial (lbs, ft/in) systems
 */

// Weight conversion functions
const convertWeight = (value, fromUnit, toUnit) => {
  if (!value || fromUnit === toUnit) return value;
  
  if (fromUnit === 'kg' && toUnit === 'lbs') {
    return Math.round(value * 2.20462);
  }
  if (fromUnit === 'lbs' && toUnit === 'kg') {
    return Math.round(value / 2.20462);
  }
  return value;
};

// Convert feet and inches to centimeters
const feetInchesToCm = (feet, inches) => {
  const totalInches = (parseInt(feet) * 12) + parseInt(inches);
  return Math.round(totalInches * 2.54);
};

// Convert centimeters to feet and inches
const cmToFeetInches = (cm) => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches, displayValue: `${feet}'${inches}"` };
};

// Determine preferred unit system based on country
const   getPreferredUnitSystem = (country) => {
  const imperialCountries = ['United States', 'United Kingdom', 'Canada'];
  return imperialCountries.includes(country) ? 'imperial' : 'metric';
};

// Normalize weight - store in original units (industry best practice)
const normalizeWeight = (weightData, preferredUnits) => {
  if (!weightData) return null;
  
  // Handle legacy string/number format - assume kg (legacy data)
  if (typeof weightData === 'string' || typeof weightData === 'number') {
    const value = parseInt(weightData);
      return {
    value,
    unit: 'kg' // Legacy data was in kg
  };
  }
  
  // Handle new object format - store in original units
  return {
    value: parseInt(weightData.value),
    unit: weightData.unit // Keep original unit
  };
};

// Normalize height - always store in cm for consistency
const normalizeHeight = (heightData, preferredUnits) => {
  if (!heightData) return null;
  
  // Handle legacy string/number format - assume cm (legacy data)
  if (typeof heightData === 'string' || typeof heightData === 'number') {
    const value = parseInt(heightData);
      return {
    value,
    unit: 'cm' // Legacy data was in cm
  };
  }
  
  // Handle new object format - normalize to cm for storage
  let cmValue = parseInt(heightData.value);
  
  // If original was imperial, value should already be in cm (converted by frontend)
  // If original was metric, value is already in cm
  
  return {
    value: cmValue,
    unit: 'cm', // Always store in cm
    originalUnit: heightData.originalUnit || heightData.unit // Track original input unit
  };
};

// Format user data for response - convert for display based on viewer's preference
const formatUserDataForResponse = (userData, viewerPreferredUnits = null) => {
  if (!userData) return userData;
  
  // Use viewer's preference, fallback to user's own preference, then metric
  const displayUnits = viewerPreferredUnits || userData.preferredUnits || 'metric';
  const formattedData = { ...userData };
  
  // Format weight for display
  if (userData.weight) {
    if (typeof userData.weight === 'string' || typeof userData.weight === 'number') {
      // Legacy format - stored in kg
      const value = parseInt(userData.weight);
      if (displayUnits === 'imperial') {
        const convertedValue = convertWeight(value, 'kg', 'lbs');
        formattedData.weight = {
          originalValue: value,
          originalUnit: 'kg',
          value: convertedValue,
          unit: 'lbs'
        };
      } else {
        formattedData.weight = {
          originalValue: value,
          originalUnit: 'kg',
          value,
          unit: 'kg'
        };
      }
    } else {
      // New format - convert if viewer preference differs from stored unit
      const storedUnit = userData.weight.unit;
      const storedValue = userData.weight.value;
      
      if (displayUnits === 'imperial' && storedUnit === 'kg') {
        const convertedValue = convertWeight(storedValue, 'kg', 'lbs');
        formattedData.weight = {
          ...userData.weight,
          originalValue: storedValue,
          originalUnit: storedUnit,
          value: convertedValue,
          unit: 'lbs'
        };
      } else if (displayUnits === 'metric' && storedUnit === 'lbs') {
        const convertedValue = convertWeight(storedValue, 'lbs', 'kg');
        formattedData.weight = {
          ...userData.weight,
          originalValue: storedValue,
          originalUnit: storedUnit,
          value: convertedValue,
          unit: 'kg'
        };
      } else {
        // No conversion needed
        formattedData.weight = {
          ...userData.weight,
          originalValue: storedValue,
          originalUnit: storedUnit
        };
      }
    }
  }
  
  // Format height for display
  if (userData.height) {
    if (typeof userData.height === 'string' || typeof userData.height === 'number') {
      // Legacy format - stored in cm
      const value = parseInt(userData.height);
      formattedData.height = {
        originalValue: value,
        originalUnit: 'cm',
        value,
        unit: 'cm'
      };
    } else {
      // New format - always provide the stored cm value for frontend processing
      const storedValue = userData.height.value;
      formattedData.height = {
        ...userData.height,
        originalValue: storedValue,
        originalUnit: userData.height.originalUnit || userData.height.unit,
        value: storedValue,
        unit: 'cm' // Always send as cm for consistent frontend processing
      };
    }
  }
  
  return formattedData;
};

module.exports = {
  convertWeight,
  feetInchesToCm,
  cmToFeetInches,
  getPreferredUnitSystem,
  normalizeWeight,
  normalizeHeight,
  formatUserDataForResponse
}; 