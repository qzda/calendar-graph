export const NODE_ENV = process.env.NODE_ENV;
export const IsDev =
  NODE_ENV === "development" || NODE_ENV === "dev" || NODE_ENV === "test";

export function devLog(...args: any[]) {
  if (IsDev) {
    console.log(...args);
  }
}
