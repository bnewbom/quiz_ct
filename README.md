# toss-gift-card
* 클래스팅 사전과제
***

## 주요 동작
* 클래스팅 사전과제 요구사항 구현
* 퀴즈 화면
* 퀴즈 결과 및 오답노트
* 다시 풀기
***

## 폴더 구조와 안내
* api: API
    - api 용도별로 파일링, /plugins/api.js 에서 inject 하여 사용한다.
* asset: 이미지와 스타일 관리
* components: 재사용 컴포넌트
    - Loading: 데이터 로딩 
    - pieChart: 퀴즈 결과 파이 차트
    - QuizCard: 퀴즈 화면
* layouts: 레이아웃
    - default: 기본 레이아웃
* pages: 페이지 구조
    - index: 메인 페이지
    - quiz: 퀴즈 페이지
* plugins: 플러그인 모음
    - api: api 모음
    - chart: 차트
* store: vuex store
    - 다시 풀기를 위한 원본 퀴즈 저장
***

## CHANGE LOG
* 2022.08.19 by bomiChoi
  <pre>
  - README 작성
  </pre>
***

## 설정 및 실행
  <pre>
  로컬 서비스 시작 : npm run dev
  </pre>
***

### 구동
* 패키지 설치
  - npm i 
* 구동
  - npm run dev 
***

### Commit Message 규칙
* ADD : 기능 추가
* FIX : 기능 수정, 코드 수정
* DEL or REMOVE : 기능 삭제
***
