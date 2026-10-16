export function importanceBadge(score: number) {
  if (score >= 8) return { variant: 'error' as const, label: 'Критично' };
  if (score >= 5) return { variant: 'warning' as const, label: 'Важно' };
  return { variant: 'default' as const, label: 'Низкая важность' };
}