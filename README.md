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
| `**/reference/*.md` | **자동 생성.** 직접 수정하지 마세요 |

## 레퍼런스 페이지 재생성

레퍼런스 페이지는 MingToon Unity 소스에서 생성됩니다. 항목 이름과 설명은
`Editor/InspectorUx/MingInspectorText.cs`가 인스펙터에 표시하는 문구 그대로이므로,
툴에서 라벨이 바뀌면 아래를 다시 실행해 세 언어를 한 번에 맞춥니다.

```bash
MINGTOON_SRC="E:/Unity/warudo_nilo/My project BRP/Assets/StudioRaming/MingToon" \
  node scripts/gen-reference.mjs
```

출력 마지막 줄에 배치되지 않은 프로퍼티가 보고됩니다. 새 항목이 생겼는데 어느 페이지에도
안 들어갔다면 `scripts/gen-reference.mjs`의 `PAGES` 규칙을 손보세요.

`scripts/parse-source.mjs`는 모듈 카탈로그까지 포함한 전체 모델을
`scripts/.model/model.json`으로 덤프합니다. 구조를 확인할 때만 씁니다.

## 검색

`@easyops-cn/docusaurus-search-local`로 **오프라인 검색**을 씁니다. 인덱스가 사이트에 함께 빌드되므로
외부 서비스로 나가는 것이 없고, 크롤러가 사이트에 접근할 필요도 없습니다.

로케일마다 `search-index.json`이 하나씩 생기고, 한국어·일본어는 각자의 lunr 토크나이저를 씁니다.
별도 관리는 필요 없고 `npm run build`가 매번 다시 만듭니다.

개발 서버(`npm start`)에서는 인덱스가 만들어지지 않으므로 검색을 확인하려면
`npm run build && npm run serve`를 쓰세요.

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
