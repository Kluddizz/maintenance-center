export const parseAddress = (street, zip, city) => {
  return `${street ?? "??"}, ${zip ?? ""} ${city ?? "??"}`;
};
