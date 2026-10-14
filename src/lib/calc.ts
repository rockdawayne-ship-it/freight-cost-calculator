/** 운송 시나리오 입력값 */
export interface Scenario {
  /** 운행거리 (km) */
  distanceKm: number
  /** 차량 수 (대) */
  vehicleCount: number
  /** km당 운임 (원) */
  ratePerKm: number
}

/** 계산 결과 */
export interface CalcResult {
  /** 기존 총 운송비 (원) */
  baseCost: number
  /** 개선 총 운송비 (원) */
  improvedCost: number
  /** 절감액 (원) = 기존 - 개선 */
  savings: number
  /** 절감률 (%) = 절감액 / 기존 × 100 (기존이 0이면 0) */
  savingsRate: number
  /** 기존 총 운행거리 (km) = 거리 × 차량 수 */
  baseTotalKm: number
  /** 개선 총 운행거리 (km) */
  improvedTotalKm: number
}

/** 총 운송비 = 운행거리 × 차량 수 × km당 운임 */
export function totalCost(s: Scenario): number {
  return safe(s.distanceKm) * safe(s.vehicleCount) * safe(s.ratePerKm)
}

export function calculate(base: Scenario, improved: Scenario): CalcResult {
  const baseCost = totalCost(base)
  const improvedCost = totalCost(improved)
  const savings = baseCost - improvedCost
  const savingsRate = baseCost > 0 ? (savings / baseCost) * 100 : 0
  return {
    baseCost,
    improvedCost,
    savings,
    savingsRate,
    baseTotalKm: safe(base.distanceKm) * safe(base.vehicleCount),
    improvedTotalKm: safe(improved.distanceKm) * safe(improved.vehicleCount),
  }
}

/** NaN·음수 방어: 유효한 양수만 통과 */
export function safe(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0
}

const krw = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 })
const num = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 })

export const formatKRW = (n: number) => `${krw.format(Math.round(n))}원`
export const formatNumber = (n: number, unit = '') => `${num.format(n)}${unit}`
export const formatPercent = (n: number) => `${n.toFixed(1)}%`
