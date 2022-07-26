export default function stringify(val: number): string | null {
  return val ? val.toString() : null;
}
