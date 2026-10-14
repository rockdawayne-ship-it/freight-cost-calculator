import { useMemo, useState } from 'react'
import KpiCard from './components/KpiCard'
import ResultPanel from './components/ResultPanel'
import ScenarioForm from './components/ScenarioForm'
import { calculate, formatKRW, formatNumber, formatPercent, type Scenario } from './lib/calc'

const DEFAULT_BASE: Scenario = { distanceKm: 320, vehicleCount: 12, ratePerKm: 1_500 }
const DEFAULT_IMPROVED: Scenario = { distanceKm: 280, vehicleCount: 10, ratePerKm: 1_450 }

export default function App() {
  const [base, setBase] = useState<Scenario>(DEFAULT_BASE)
  const [improved, setImproved] = useState<Scenario>(DEFAULT_IMPROVED)

  const result = useMemo(() => calculate(base, improved), [base, improved])
  const hasBase = result.baseCost > 0

  const savingsTone = !hasBase ? 'neutral' : result.savings >= 0 ? 'positive' : 'negative'

  const reset = () => {
    setBase(DEFAULT_BASE)
    setImproved(DEFAULT_IMPROVED)
  }

  const copyImproved = () => setImproved(base)

  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <h1>물류 운송비 계산기</h1>
          <p className="header__tagline">
            운행거리, 차량 수, km당 운임을 입력하면 총 운송비와 절감 효과를 즉시 계산합니다.
          </p>
        </div>
      </header>

      <main className="main">
        <section className="kpis" aria-label="핵심 지표">
          <KpiCard
            label="기존 총 운송비"
            value={formatKRW(result.baseCost)}
            sub={`총 ${formatNumber(result.baseTotalKm, ' km')} 운행`}
          />
          <KpiCard
            label="개선 총 운송비"
            value={formatKRW(result.improvedCost)}
            sub={`총 ${formatNumber(result.improvedTotalKm, ' km')} 운행`}
            tone="primary"
          />
          <KpiCard
            label="운송비 절감액"
            value={formatKRW(result.savings)}
            sub={result.savings < 0 ? '개선안이 기존보다 비쌉니다' : '기존 − 개선'}
            tone={savingsTone}
          />
          <KpiCard
            label="절감률"
            value={hasBase ? formatPercent(result.savingsRate) : '—'}
            sub={hasBase ? '절감액 ÷ 기존 총 운송비' : '기존 값을 입력하세요'}
            tone={savingsTone}
          />
        </section>

        <section className="inputs" aria-label="입력">
          <div className="inputs__head">
            <h2>조건 입력</h2>
            <div className="inputs__actions">
              <button type="button" className="btn btn--ghost" onClick={copyImproved}>
                기존 값을 개선안에 복사
              </button>
              <button type="button" className="btn btn--ghost" onClick={reset}>
                초기화
              </button>
            </div>
          </div>
          <div className="inputs__grid">
            <ScenarioForm
              accent="base"
              title="기존 운송 조건"
              description="현재 운영 중인 노선·차량·운임 기준"
              value={base}
              onChange={setBase}
            />
            <ScenarioForm
              accent="improved"
              title="개선 운송 조건"
              description="경로 최적화·합차·운임 협상 후 예상 조건"
              value={improved}
              onChange={setImproved}
            />
          </div>
        </section>

        <ResultPanel base={base} improved={improved} result={result} />
      </main>

      <footer className="footer">
        입력값은 브라우저에서만 계산되며 서버로 전송되지 않습니다.
      </footer>
    </div>
  )
}
