# MingToon Docs

MingToon 사용 설명서. Docusaurus 3 + i18n (한국어 / English / 日本語).

배포: https://studioraming.github.io/mingtoon-docs/

## 로컬 실행

```bash
npm install
npm start                 # 한국어 (기본)
npm start -- --locale en  # 다른 로케일은 개별 실행
npm run build             # 세 로케일 전부 빌드 + 링크 검사
```

## 문서 구조

| 폴더 | 내용 |
|---|---|
| `docs/` | 한국어 본문 (기본 로케일) |
| `i18n/en/docusaurus-plugin-content-docs/current/` | 영어 본문 |
| `i18n/ja/docusaurus-plugin-content-docs/current/` | 일본어 본문 |
| `**/reference/*.md` | **자동 생성.** 직접 수정하지 마세요 — 단 `reference/validator.md`는 손으로 씁니다 |

## 레퍼런스 페이지 재생성

레퍼런스 페이지는 MingToon Unity 소스에서 생성됩니다. 항목 이름과 설명은
`Editor/InspectorUx/MingInspectorText.cs`가 인스펙터에 표시하는 문구 그대로이므로,
툴에서 라벨이 바뀌면 아래를 다시 실행해 세 언어를 한 번에 맞춥니다.

```bash
MINGTOON_SRC="<Unity project>/Assets/StudioRaming/MingToon" \
  node scripts/gen-reference.mjs
```

생성 대상은 `PAGES`에 정의된 슬러그뿐입니다. `reference/validator.md`는 생성기가 건드리지 않으므로 **`docs/reference` 폴더를 통째로 지우지 마세요.**

출력 마지막 줄에 배치되지 않은 프로퍼티가 보고됩니다. 새 항목이 생겼는데 어느 페이지에도
안 들어갔다면 `scripts/gen-reference.mjs`의 `PAGES` 규칙을 손보세요.

`scripts/parse-source.mjs`는 모듈 카탈로그까지 포함한 전체 모델을
`scripts/.model/model.json`으로 덤프합니다. 구조를 확인할 때만 씁니다.

## 용어 자동 링크

`src/remark/auto-link-terms.mjs`가 용어집 하나를 들고 빌드 때 링크를 붙입니다.
본문 마크다운에는 링크를 박지 않으므로, 페이지가 옮겨지면 **용어집 한 곳만** 고치면 됩니다.

규칙:

- 페이지마다 **첫 등장 한 번만** 링크. 문단이 파란 벽이 되지 않게
- 제목 · 코드 · 이미 걸린 링크 · admonition 제목 안에서는 링크하지 않음
- **자기 페이지로는 링크하지 않음** (섹션 앵커여도 마찬가지)
- 긴 용어 우선 — `내부 2D 경계`가 `2D 경계`로 쪼개지지 않음
- ASCII 용어는 단어 경계를 봄 — `UV4`가 `UV40` 안에서 걸리지 않음

용어를 추가하려면 `GLOSSARY`에 `'용어': '/경로#앵커'`를 넣으세요.

> [!NOTE]
> `onBrokenAnchors: 'throw'`이므로 **앵커가 틀리면 빌드가 실패**합니다. 오타가 조용히 지나가지 않습니다.

스타일은 `src/css/custom.css`의 `.ming-term` — 본문 색을 유지하고 점선 밑줄만 답니다.

현재 한국어 39페이지에 **337개** 링크가 붙습니다.

## 검색

`@easyops-cn/docusaurus-search-local`로 **오프라인 검색**을 씁니다. 인덱스가 사이트에 함께 빌드되므로
외부 서비스로 나가는 것이 없고, 크롤러가 사이트에 접근할 필요도 없습니다.

로케일마다 `search-index.json`이 하나씩 생기고, 한국어·일본어는 각자의 lunr 토크나이저를 씁니다.
별도 관리는 필요 없고
pm run build`가 매번 다시 만듭니다.

개발 서버(
pm start`)에서는 인덱스가 만들어지지 않으므로 검색을 확인하려면

pm run build && npm run serve`를 쓰세요.

## 편집 권한

- 문서에 **"이 페이지 편집" 링크를 두지 않습니다**(`editUrl` 미설정). 독자에게 편집 진입점이 노출되지 않습니다.
- 저장소의 Issues · Wiki · Projects는 꺼져 있습니다.
- push 권한은 `StudioRaming` 한 계정뿐입니다.
- 공개 저장소라 fork와 PR 자체는 막을 수 없지만, 반영은 소유자의 merge가 있어야만 됩니다.

## 문서 작성 규칙

- 각 페이지 첫 줄에 **"이 문서를 읽으면 할 수 있는 것"** 한 줄.
- 절차는 번호 목록 + 메뉴 전체 경로(`Tools > Studio Raming > MingToon > ...`).
- 스텝마다 **"이렇게 되면 정상입니다"** 확인 문장. 시각자료 없이도 검증 가능하게.
- 스크린샷 자리는 `{/* SCREENSHOT: 설명 */}` 주석으로 표시되어 있습니다.
  `static/img/screenshots/`에 이미지를 넣고 주석을 `![설명](/img/screenshots/파일명.png)`으로 바꾸세요.
- 문서 간 링크는 **절대 경로**(`/guides/shadow`)를 씁니다. 상대 `.md` 링크는 로케일 폴백에서 깨집니다.
- MDX v3이라 `<!-- -->` HTML 주석은 파싱 오류가 납니다. `{/* */}`를 쓰세요.

## Admonition 문법 — v3 형식만 씁니다

```
:::tip[제목]
본문
:::
```

Docusaurus v2의 `:::tip 제목`(대괄호 없음)은 **v3에서 지시자로 파싱되지 않고 `:::tip 제목` 그대로 화면에 찍힙니다.**
빌드는 성공하므로 눈으로 보기 전까지 모릅니다. 제목에 대괄호가 필요하면 링크 대신 본문에 넣으세요.

확인:

```bash
grep -rn "^:::[a-z]\+ " docs   # 결과가 있으면 v2 문법이 남아 있는 것
```

## 패치노트

버전당 파일 하나입니다. 새 버전은 스크립트로 만드세요.

```bash
node scripts/new-patch-note.mjs 0.1.4
```

한국어 · 영어 · 일본어 세 파일이 `docs/changelog/_template.md` 에서 생성되고,
`id` · `sidebar_position` · `slug` 은 스크립트가 계산합니다. **손으로 만들지 마세요** —
`sidebar_position` 을 틀리면 버전 순서가 뒤집힙니다(음수 버전 코드로 최신이 위에 옵니다).

**작성 규칙 전문은 `docs/changelog/_template.md` 위쪽 주석**에 있습니다. 요약하면:

- 세 언어를 항상 함께 채웁니다. 하나라도 비우면 그 언어가 한국어로 폴백되어
  번역된 것처럼 보이면서 실제로는 안 된 상태가 됩니다.
- 섹션 순서: `업그레이드 시 확인할 것` → `새 기능` → `변경` → `개선` → `수정` → `문서`.
  해당 없는 섹션은 통째로 지웁니다.
- `업그레이드 시 확인할 것` 에는 **기존 작업물이 깨지거나 동작이 달라지는 것만** 씁니다.
- 항목은 한 줄. 배경 설명은 문서 페이지로 링크하고 결론만 남깁니다.
- **링크 앵커는 세 언어 모두 한국어 원본 그대로** 씁니다. 앵커는 언어와 무관하게 고정입니다.
- Admonition 은 `:::caution[제목]` — 대괄호 없으면 화면에 `:::caution` 이 그대로 찍힙니다.

다 쓰면:

```bash
npm run build
node scripts/check-translations.mjs en
node scripts/check-translations.mjs ja
```

`_` 로 시작하는 파일(`_template.md`)은 사이트에 나오지 않고 번역 검사에서도 제외됩니다.
