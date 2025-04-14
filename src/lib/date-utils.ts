export const today = () =>
  new Date(new Date().toISOString().split("T")[0] + "T00:00:00.000Z");
