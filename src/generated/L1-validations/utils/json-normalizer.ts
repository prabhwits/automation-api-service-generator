export default function normalizeKeys(obj: any) {
    if (Array.isArray(obj)) {
        // Find all keys across all objects in the array
        const allKeys = new Set();
        obj.forEach((item) => {
            if (typeof item === "object" && item !== null) {
                Object.keys(item).forEach((key) => allKeys.add(key));
            }
        });

        // Add missing keys with null
        return obj.map((item) => {
            if (typeof item === "object" && item !== null) {
                const newItem = { ...item };
                allKeys.forEach((key: any) => {
                    if (!(key in newItem)) {
                        newItem[key] = null;
                    }
                });
                // Recursively normalize nested objects/arrays
                for (const k in newItem) {
                    newItem[k] = normalizeKeys(newItem[k]);
                }
                return newItem;
            }
            return item;
        });
    } else if (typeof obj === "object" && obj !== null) {
        const newObj: any = {};
        for (const key in obj) {
            newObj[key] = normalizeKeys(obj[key]);
        }
        return newObj;
    }
    return obj; // primitive values
}
