import type { Scenario } from '../lib/calc'

interface Props {
  title: string
  description: string
  value: Scenario
  onChange: (next: Scenario) => void
  accent: 'base' | 'improved'
}

const FIELDS: { key: keyof Scenario; label: string; unit: string; step: number }[] = [
  { key: 'distanceKm', label: '운행거리', unit: 'km', step: 1 },
  { key: 'vehicleCount', label: '차량 수', unit: '대', step: 1 },
  { key: 'ratePerKm', label: 'km당 운임', unit: '원', step: 10 },
]

export default function ScenarioForm({ title, description, value, onChange, accent }: Props) {
  return (
    <fieldset className={`scenario scenario--${accent}`}>
      <legend>
        <span className="scenario__badge" aria-hidden="true" />
        {title}
      </legend>
      <p className="scenario__desc">{description}</p>
      <div className="scenario__fields">
        {FIELDS.map((f) => {
          const id = `${accent}-${f.key}`
          return (
            <label key={f.key} htmlFor={id} className="field">
              <span className="field__label">{f.label}</span>
              <span className="field__input">
                <input
                  id={id}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={f.step}
                  value={Number.isFinite(value[f.key]) ? value[f.key] : ''}
                  onChange={(e) => onChange({ ...value, [f.key]: e.target.valueAsNumber })}
                />
                <span className="field__unit">{f.unit}</span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
