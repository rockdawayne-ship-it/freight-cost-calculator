# 물류 운송비 계산기

운행거리(km), 차량 수, km당 운임을 입력하면 총 운송비를 자동 계산하고,
기존 조건 대비 개선 조건의 **절감액·절감률**을 KPI 카드와 결과 화면으로 보여주는 웹앱입니다.

- React 19 + Vite 8 + TypeScript
- 외부 데이터베이스·API 없이 브라우저에서만 계산 (서버 전송 없음)
- PC·모바일 반응형, 다크 모드 자동 대응
- Vercel 정적 배포 가능

## 주요 기능

| 기능 | 설명 |
| --- | --- |
| 조건 입력 | 기존 / 개선 두 시나리오 각각 운행거리(km), 차량 수(대), km당 운임(원) 입력 |
| 총 운송비 자동 계산 | `운행거리 × 차량 수 × km당 운임` |
| 절감액 · 절감률 | `절감액 = 기존 − 개선`, `절감률 = 절감액 ÷ 기존 × 100` |
| KPI 카드 | 기존 총 운송비, 개선 총 운송비, 절감액, 절감률 |
| 결과 화면 | 비교 막대 그래프, 항목별 비교 표, 계산식 안내 |
| 보조 기능 | 기존 값을 개선안에 복사, 초기화 |

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속.

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

`dist/` 폴더에 정적 파일이 생성됩니다.

## Vercel 배포

1. 이 폴더를 GitHub 저장소에 push
2. [Vercel](https://vercel.com) → **Add New Project** → 저장소 선택
3. Framework Preset: **Vite** (자동 감지), Build Command `npm run build`, Output Directory `dist`
4. Deploy

환경 변수, 비밀 키, 외부 서비스 설정은 필요 없습니다.
`vercel.json`에 SPA 라우팅용 rewrite 설정이 포함되어 있습니다.

## 프로젝트 구조

```
freight-cost-calculator/
├── index.html
├── vercel.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx            # 엔트리
    ├── App.tsx             # 화면 구성·상태
    ├── index.css           # 전역 스타일·반응형
    ├── lib/
    │   └── calc.ts         # 계산 로직·포맷터
    └── components/
        ├── KpiCard.tsx     # KPI 카드
        ├── ScenarioForm.tsx # 시나리오 입력 폼
        └── ResultPanel.tsx  # 결과 막대·비교 표
```

## 계산식

```
총 운송비(원) = 운행거리(km) × 차량 수(대) × km당 운임(원)
절감액(원)   = 기존 총 운송비 − 개선 총 운송비
절감률(%)    = 절감액 ÷ 기존 총 운송비 × 100
```

- 입력값이 비어 있거나 음수이면 0으로 처리합니다.
- 기존 총 운송비가 0이면 절감률은 표시하지 않습니다.
- 개선안이 기존보다 비싸면 절감액이 음수로 표시되고 카드가 빨간색으로 바뀝니다.

## 라이선스

MIT
