interface Identifiable {
    id: number;
}

export function generateId(items: Identifiable[]): number {
    if (items.length === 0) return 0;
    return Math.max(...items.map(item => item.id)) + 1;
}
