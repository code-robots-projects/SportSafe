
import { WeatherData, SafetyStatus, RiskLevel } from '../types';

/**
 * Local implementation of the South African Heat-health Warning System (HHWS)
 * for school sports contexts.
 */
export const calculateSafetyRisk = (weather: WeatherData): SafetyStatus => {
  const t = weather.apparentTemperature;
  const uv = weather.uvIndex;
  
  // 1. Calculate Safe UV Exposure Duration (Heuristic for children)
  let exposure = "60+ mins";
  if (uv >= 11) exposure = "< 10 mins";
  else if (uv >= 8) exposure = "15-20 mins";
  else if (uv >= 6) exposure = "25-30 mins";
  else if (uv >= 3) exposure = "30-45 mins";

  // 2. Determine Risk Level based on Apparent Temperature (Feels Like)
  // Thresholds aligned with standard heat index safety for outdoor exertion
  if (t >= 36) {
    return {
      level: RiskLevel.RED,
      title: "RED: Highest-Level Alarm",
      safetyStatus: "Extreme heat threshold reached. Conditions are unsafe for physical activity.",
      modifications: "Immediate cancellation or postponement of all sports events and school extra-mural activities.",
      generatedAdvice: "Health risk is critical. Ensure all students remain indoors in cooled or well-ventilated areas.",
      safeExposureDuration: exposure
    };
  } else if (t >= 30) {
    return {
      level: RiskLevel.AMBER,
      title: "AMBER: Dangerous to Health",
      safetyStatus: "Significant increase in risk; heat exhaustion or chronic condition exacerbation likely.",
      modifications: "Mandate longer breaks (min 5 mins per 15 mins play). Strictly enforce hydration protocols.",
      generatedAdvice: "Coaches must actively monitor for signs of dizziness or nausea. Shift training to shade where possible.",
      safeExposureDuration: exposure
    };
  } else {
    return {
      level: RiskLevel.GREEN,
      title: "GREEN: 'Stressful' Heat",
      safetyStatus: "Onset of potential heat strain. Generally safe for activity with monitoring.",
      modifications: "Activity may continue. Ensure students have access to water throughout the session.",
      generatedAdvice: "Encourage frequent small sips of water. Monitor students who are prone to heat discomfort.",
      safeExposureDuration: exposure
    };
  }
};
