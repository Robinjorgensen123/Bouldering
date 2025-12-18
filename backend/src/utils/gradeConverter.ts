export const gradeMap: Record<string, string> = {
  // Font till v-scale
  "3": "VB",
  "3+": "V0-",
  "4": "V0",
  "4+": "V0+",
  "5": "V1",
  "5+": "V2",
  "6A": "V3",
  "6A+": "V3+",
  "6B": "V4",
  "6B+": "V4+",
  "6C": "V5",
  "6C+": "V5+",
  "7A": "V6",
  "7A+": "V7",
  "7B": "V8",
  "7B+": "V8+",
  "7C": "V9",
  "7C+": "V8+",
  "8A": "V11",
  "8A+": "V12",
  "8B": "V13",
  "8B+": "V14",
  "9A": "V17",
  "9B": "V18",
  "9C": "V19",
  "9C+": "V20",

  // -- V-Scale till Font ---
  VB: "3",
  "V0-": "3+",
  V0: "4",
  "V0+": "4+",
  V1: "5",
  V2: "5+",
  V3: "6A",
  "V3+": "6A+",
  V4: "6B",
  "V4+": "6B+",
  V5: "6C",
  "V5+": "6C+",
  V6: "7A",
  V7: "7A+",
  V8: "7B",
  "V8+": "7B+",
  V9: "7C",
  V10: "7C+",
  V11: "8A",
  V12: "8A+",
  V13: "8B",
  V14: "8B+",
  V15: "8C",
  V16: "8C+",
  V17: "9A",
  V18: "9B",
  V19: "9C",
  V20: "9C+",
};

export const getDisplayGrade = (
  value: string,
  fromSystem: string,
  targetSystem: string
): string => {
  if (!value || fromSystem === targetSystem) return value;

  const normalizedValue = value.toUpperCase().trim();
  return gradeMap[normalizedValue] || value;
};
