export function defaultGetOptionLabel<T>(option: T): string {
  if (typeof option === 'string' || typeof option === 'number') {
    return String(option);
  }
  if (option && typeof option === 'object') {
    const record = option as Record<string, unknown>;
    if (record.label != null) return String(record.label);
    if (record.name != null) return String(record.name);
    if (record.displayName != null) return String(record.displayName);
    if (record.title != null) return String(record.title);
  }
  return String(option);
}

export function defaultGetOptionKey<T>(option: T, index = 0): string | number {
  if (typeof option === 'string' || typeof option === 'number') {
    return option;
  }
  if (option && typeof option === 'object') {
    const record = option as Record<string, unknown>;
    if (record.value != null) return record.value as string | number;
    if (record.id != null) return record.id as string | number;
    if (record.key != null) return record.key as string | number;
  }
  return index;
}
