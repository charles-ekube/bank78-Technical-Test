import { Option } from "./GeneralTypes";


export const BusinessTypeOptions: Option[] = [
  { key: 'retail', value: 'Retail' },
  { key: 'manufacturing', value: 'Manufacturing' },
  { key: 'technology', value: 'Technology' }
];


export const CountryOptions: Option[] = [
  { key: 'us', value: 'United States' },
  { key: 'ng', value: 'Nigeria' },
  { key: 'ca', value: 'Canada' }
];


export  const simpleHash = (input: string): string => {
  let hash = 0;
  for (let i = 0; i < input?.length; i++) {
    const char = input?.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; 
  }
  return hash.toString();
};
