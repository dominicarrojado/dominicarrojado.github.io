export function sortArrayByKeys<T>(
  array: Array<T>,
  sortBy: Record<string, 1 | -1>
) {
  const transformIgnoreCase = (value: any) => {
    return typeof value === 'string' ? value.toUpperCase() : value;
  };

  array.sort((a: any, b: any) => {
    for (let key in sortBy) {
      const valueA = transformIgnoreCase(a[key]);
      const valueB = transformIgnoreCase(b[key]);

      if (valueA < valueB) {
        return sortBy[key] > 0 ? -1 : 1;
      } else if (valueA > valueB) {
        return sortBy[key] < 0 ? -1 : 1;
      }
    }

    return 0;
  });

  return array;
}
