import { Option } from "./GeneralTypes";

export const BusinessTypeOptions: Option[] = [{ key: "llc", value: "LLC" }];

export const CountryOptions: Option[] = [{ key: "ng", value: "Nigeria" }];

export const IDType: Option[] = [{ key: "nin", value: "NIN" }];

export const simpleHash = (input: string): string => {
  let hash = 0;
  for (let i = 0; i < input?.length; i++) {
    const char = input?.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString();
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const shortenXterLength = (str: string | null | undefined, num: number = 10): string => {
  if (str) {
    if (str.length <= num) {
      return str;
    }
    return `${str.slice(0, num)}..`;
  }
  return "";
};
