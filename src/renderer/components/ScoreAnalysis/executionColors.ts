const DEFAULT_EXECUTION_COLOR = 'hsl(210 80% 45%)';

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function createExecutionColorMap(executionIds: string[]): Map<string, string> {
  const uniqueIds = Array.from(new Set(executionIds.filter((id) => id.length > 0)));
  const usedHues = new Set<number>();
  const result = new Map<string, string>();

  for (const id of uniqueIds) {
    let hue = hashString(id) % 360;

    // 既存 hue と衝突した場合は黄金角ステップでずらして一意化する
    while (usedHues.has(hue)) {
      hue = (hue + 137) % 360;
    }

    usedHues.add(hue);
    result.set(id, `hsl(${hue}, 76%, 44%)`);
  }

  return result;
}

export function getExecutionColor(executionId: string, colorMap: ReadonlyMap<string, string>): string {
  if (!executionId) {
    return DEFAULT_EXECUTION_COLOR;
  }
  return colorMap.get(executionId) ?? DEFAULT_EXECUTION_COLOR;
}
