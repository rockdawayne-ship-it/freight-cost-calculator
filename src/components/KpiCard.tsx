interface Props {
  label: string
  value: string
  sub?: string
  tone?: 'neutral' | 'primary' | 'positive' | 'negative'
}

export default function KpiCard({ label, value, sub, tone = 'neutral' }: Props) {
  return (
    <article className={`kpi kpi--${tone}`}>
      <p className="kpi__label">{label}</p>
      <p className="kpi__value">{value}</p>
      {sub && <p className="kpi__sub">{sub}</p>}
    </article>
  )
}
