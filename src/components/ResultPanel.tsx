import type { CalcResult, Scenario } from '../lib/calc'
import { formatKRW, formatNumber } from '../lib/calc'

interface Props {
  base: Scenario
  improved: Scenario
  result: CalcResult
}

export default function ResultPanel({ base, improved, result }: Props) {
  const max = Math.max(result.baseCost, result.improvedCost, 1)
  const basePct = (result.baseCost / max) * 100
  const improvedPct = (result.improvedCost / max) * 100

  return (
    <section className="result" aria-labelledby="result-title">
      <h2 id="result-title">계산 결과</h2>

      <div className="bars" role="img" aria-label="기존 대비 개선 운송비 비교 막대">
        <div className="bar">
          <span className="bar__name">기존</span>
          <div className="bar__track">
            <div className="bar__fill bar__fill--base" style={{ width: `${basePct}%` }} />
          </div>
          <span className="bar__val">{formatKRW(result.baseCost)}</span>
        </div>
        <div className="bar">
          <span className="bar__name">개선</span>
          <div className="bar__track">
            <div className="bar__fill bar__fill--improved" style={{ width: `${improvedPct}%` }} />
          </div>
          <span className="bar__val">{formatKRW(result.improvedCost)}</span>
        </div>
      </div>

      <div className="table-wrap">
        <table className="result-table">
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">기존</th>
              <th scope="col">개선</th>
              <th scope="col">차이 (기존 − 개선)</th>
            </tr>
          </thead>
          <tbody>
            <Row
              label="운행거리"
              a={formatNumber(base.distanceKm, ' km')}
              b={formatNumber(improved.distanceKm, ' km')}
              diff={formatNumber(base.distanceKm - improved.distanceKm, ' km')}
            />
            <Row
              label="차량 수"
              a={formatNumber(base.vehicleCount, '대')}
              b={formatNumber(improved.vehicleCount, '대')}
              diff={formatNumber(base.vehicleCount - improved.vehicleCount, '대')}
            />
            <Row
              label="km당 운임"
              a={formatKRW(base.ratePerKm)}
              b={formatKRW(improved.ratePerKm)}
              diff={formatKRW(base.ratePerKm - improved.ratePerKm)}
            />
            <Row
              label="총 운행거리"
              a={formatNumber(result.baseTotalKm, ' km')}
              b={formatNumber(result.improvedTotalKm, ' km')}
              diff={formatNumber(result.baseTotalKm - result.improvedTotalKm, ' km')}
            />
            <Row
              label="총 운송비"
              a={formatKRW(result.baseCost)}
              b={formatKRW(result.improvedCost)}
              diff={formatKRW(result.savings)}
              strong
            />
          </tbody>
        </table>
      </div>

      <p className="formula">
        총 운송비 = 운행거리(km) × 차량 수(대) × km당 운임(원) / 절감률 = 절감액 ÷ 기존 총 운송비 × 100
      </p>
    </section>
  )
}

function Row({
  label,
  a,
  b,
  diff,
  strong,
}: {
  label: string
  a: string
  b: string
  diff: string
  strong?: boolean
}) {
  return (
    <tr className={strong ? 'row--strong' : undefined}>
      <th scope="row">{label}</th>
      <td>{a}</td>
      <td>{b}</td>
      <td>{diff}</td>
    </tr>
  )
}
