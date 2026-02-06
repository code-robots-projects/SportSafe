import { School } from './types';

export const SCHOOLS: School[] = [
  {
    id: 'clifton',
    name: 'Clifton Prep',
    location: 'Nottingham Road',
    coordinates: { lat: -29.356, lng: 29.997 },
  },
  {
    id: 'michaelhouse',
    name: 'Michaelhouse',
    location: 'Balgowan',
    coordinates: { lat: -29.400, lng: 30.040 },
  },
  {
    id: 'st-charles',
    name: 'St Charles College',
    location: 'Pietermaritzburg',
    coordinates: { lat: -29.623, lng: 30.395 },
  },
  {
    id: 'cordwalles',
    name: 'Cordwalles Prep',
    location: 'Pietermaritzburg',
    coordinates: { lat: -29.584, lng: 30.359 },
  },
  {
    id: 'laddsworth',
    name: 'Laddsworth Primary',
    location: 'Hilton',
    coordinates: { lat: -29.558, lng: 30.297 },
  },
  {
    id: 'hilton-college',
    name: 'Hilton College',
    location: 'Hilton',
    coordinates: { lat: -29.510, lng: 30.298 },
  },
  {
    id: 'howick-prep',
    name: 'Howick Prep',
    location: 'Howick',
    coordinates: { lat: -29.4735, lng: 30.2274 },
  },
  {
    id: 'treverton',
    name: 'Treverton',
    location: 'Mooi River',
    coordinates: { lat: -29.2136, lng: 29.9933 },
  },
  {
    id: 'winterton-primary',
    name: 'Winterton Primary',
    location: 'Winterton',
    coordinates: { lat: -28.8126, lng: 29.5332 },
  },
  {
    id: 'cowan-house',
    name: 'Cowan House',
    location: 'Hilton',
    coordinates: { lat: -29.556, lng: 30.298 },
  },
  {
    id: 'epworth',
    name: 'Epworth',
    location: 'Pietermaritzburg',
    coordinates: { lat: -29.628, lng: 30.389 },
  },
  {
    id: 'wykeham-collegiate',
    name: 'The Wykeham Collegiate',
    location: 'Pietermaritzburg',
    coordinates: { lat: -29.593, lng: 30.366 },
  },
  {
    id: 'merchiston',
    name: 'Merchiston Prep',
    location: 'Pietermaritzburg',
    coordinates: { lat: -29.610, lng: 30.384 },
  },
  {
    id: 'highbury',
    name: 'Highbury Prep',
    location: 'Hillcrest',
    coordinates: { lat: -29.789, lng: 30.765 },
  },
];

export const HHWS_PROMPT_CONTEXT = `
The South African Heat-health Warning System (HHWS) operates using three distinct grades:

1. Green: 'Stressful' Heat Levels
- Indicates onset of potential heat-related strain.
- Safety Status: Generally safe for activity, but athletes should monitor fluid intake and be aware of early signs of heat discomfort.
- Modifications: Activity may continue, recommend shifting start times to cooler parts of day.

2. Amber: Temperature Levels Dangerous to Health
- Significant increase in risk; negative health outcomes likely.
- Safety Status: Caution required. Environmental heat (Discomfort Advisory) is high enough to cause heat exhaustion or exacerbate chronic conditions.
- Modifications: Mandate longer breaks during team sports and strictly enforce hydration protocols to replace fluids lost through sweating.

3. Red: The Highest-Level Alarm
- Extreme threshold.
- Safety Status: Unsafe for physical activity. Temperatures recorded are close to limits at which humans can survive.
- Modifications: Immediate cancellation or postponement of sports events and school extra-mural activities.

Task: Determine the risk level for primary school children at 12:30 SAST (midday peak).
`;