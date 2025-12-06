// A small helper to compare two string arrays and
// return what is only in arr1 and only in arr2.
export function findArrayDifferences(arr1: string[], arr2: string[]) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    const onlyInArr1 = arr1.filter(item => !set2.has(item));
    const onlyInArr2 = arr2.filter(item => !set1.has(item));

    return { onlyInArr1, onlyInArr2 };
}
