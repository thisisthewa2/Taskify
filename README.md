## Taskify
- 일정 관리 서비스
- 개발 기간: 12/18 ~ 1/5

## Deploy
https://taskify-project-sigma.vercel.app/

## Team
<table width="600px">
    <th style="text-align:center">
      <a href = "https://github.com/kanglocal"> 강현지 </a> 
    </th>
    <th style="text-align:center">
      <a href ="https://github.com/kde98892">김다은</a>
    </th>
    <th style="text-align:center">
      <a href = "https://github.com/namminimi">남민섭</a>
    </th>
  <th style="text-align:center">
      <a href = "https://github.com/thisisthewa2">안윤진</a>
    </th>
   <th style="text-align:center">
      <a href = "https://github.com/gw-lim">임건우</a>
    <tr>
        <td width="200px">
            <img src = "https://github.com/Peachy-Peachy/Taskify/assets/119280160/a9f0a518-80d5-4cbe-a1f9-4aa79b45fbf6"/>
        </td>
        <td width="200px">
            <img src = "https://github.com/Peachy-Peachy/Taskify/assets/119280160/83f09667-a69e-416f-8787-766892623d9c"/>
        </td>
        <td width="200px">
           <img src = "https://github.com/Peachy-Peachy/Taskify/assets/119280160/e879d42d-c9bf-40b7-96fb-102fd92fd974"/>
        </td>
        <td width="200px">
           <img src = "https://github.com/Peachy-Peachy/Taskify/assets/119280160/d5b431c4-3eb4-459d-9849-3762d22975b9"/>
        </td>
        <td width="200px">
           <img src = "https://github.com/Peachy-Peachy/Taskify/assets/119280160/4c45aa85-4f44-47ba-9292-6b62868aadac"/>
        </td>
    </tr>
    
</table>

## ⚒️ Stacks

### Environment
<p>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=NextJS&logoColor=white">
<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
<img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white">
</p>

### Development
<p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
    <img src="https://img.shields.io/badge/TS-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=Tailwindcss&logoColor=white">
    <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white">
      <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white">
</p>

## Convention
### 개발 방식
- `console.log` pr 올릴 때 꼭 지우기 (테스트 파일 지워서 올리기)
- 주석 최소한으로 하기
    - 함수 위에 필요한 경우 작성하기
    - 헷갈리는 데이터 구조 (목 데이터)
- 컴포넌트는 **함수 선언식**으로 쓰고, 유틸 함수는 **화살표 함수**로 쓰기
- 프리티어 설정
    - `‘` 사용
    - tab spacing 2
    - import 순서 정렬
        - 기준 마련하기
        - 정렬 단축키도 따로 있음
- ESLint
    - default 설정
    - 특정 문제가 발생할시 디스코드에 알리고 관련 설정 끄기
- 함수 이름 동사로 작성하기
    - `handleClick`
- 타입 any 사용 지양
- 컴포넌트.js 에서는 **컴포넌트만 export default**
유틸함수.js 에서는 상관없음
    - 컴포넌트는 앞에 export 안 붙이기
- 가능한 한 컴포넌트에서 div 3번까지만 쓰기 (depth)
- 선언 순서 (최대한 노력하기)

## **Feature**

‘>’ 클릭 시 해당 특징 설명을 보실 수 있습니다.
<details>
<summary>페이지</summary>

<details>
<summary>회원가입</summary>

- react-hook-form을 사용
- useForm의 controller를 사용하여 각 input의 역할을 구분
- 유효성 검사를 통해 에러메세지 전달
- 모든 유효성 검사를 통과하면 회원가입 버튼이 활성화
</details>

<details>
<summary>로그인</summary>

- react-hook-form을 사용
- useForm의 controller를 사용하여 각 input의 역할을 구분
- 유효성 검사를 통해 에러메세지 전달
- 모든 유효성 검사를 통과하면 로그인 버튼이 활성화
</details>

<details>
<summary>나의 대시보드</summary>

<details>
<summary>참여중인 대시보드</summary>

- 페이지네이션 기반 UI 구축. 클릭 시 각 대시보드로 이동
</details>

<details>
<summary>새로운 대시보드 생성</summary>

- 모달 통해 폼 제출 시 post 요청
</details>

<details>
<summary>초대받은 대시보드</summary>

- 초대 거절 / 수락
    - 초대 거절 / 수락 시 초대목록에서 삭제, 사이드메뉴와 참여중인 대시보드에 반영
- 초대 목록 검색
    - 커스텀 훅 **useSearchInvitedDashboards** 을 사용해 get 요청을 통해 필터링된 초대목록만 보이게 함
</details>

</details>
</details>
<details>
<summary>Hook</summary>

<details>
<summary>api 연결</summary>

### useRequest

- 프로젝트 내부에서 보내는 모든 api 요청을 useRequest이라는 커스텀 훅으로 통일시켜 관심사의 분리 적용
- 파라미터로 받은 주소로 데이터 요청을 보내어 받은 데이터 또는 오류를 리턴
- 요청이 진행되고 있음을 알 수 있는 isLoading 변수를 같이 리턴해주어 스켈레톤 UI 등에 사용할 수 있도록 구현

</details>

<details>
<summary>axios interceptor</summary>

- axios interceptor을 활용하여 매번 요청을 보낼 때 access token을 넣어주지 않아도 access token을 갖고 있다면 자동으로 요청에 추가되도록 구현

</details>

<details>
<summary>무한스크롤</summary>

### useInfiniteScroll

- `Intersection Observer API` 사용
- 서비스 내 다수의 페이지에서 무한스크롤 기능을 활용하고 있어 커스텀 훅을 통해 observe와 unobserve 상태를 관리하도록 함
- 무한스크롤 작동 시 실행 될 함수를 보내 `containerRef` 를 리턴받기 때문에, 무한스크롤이 작동될 곳에 위치시켜 작동

</details>
</details>
<details>
<summary>전역 상태 관리 및 환경 변수 관리</summary>

<details>
<summary>전역 상태관리 (Jotai)</summary>

Jotai를 사용해 로그인 정보와 다크모드 상태 저장

</details>

<details>
<summary>환경변수 관리 (.env)</summary>

.env: API url (.gitgnore 미포함)

</details>

</details>

<details>
<summary>공통 컴포넌트</summary>

<details>
<summary>헤더</summary>

- 각 페이지 및 접근 권한에 따라 보이는 헤더가 다르도록 구현

</details>

<details>
<summary>모달</summary>

- 컴파운드 패턴 적용

</details>

<details>
<summary>사이드메뉴</summary>

사이드 메뉴에서는 무한 스크롤 및 스켈레톤 UI를 적용했습니다.

<details>
<summary>무한 스크롤</summary>

- useInfiniteScroll 훅 사용
- react query 라이브러리에서 제공하는 useInfiniteQuery를 통해 데이터 fetch

</details>

<details>
<summary>스켈레톤 UI</summary>

- 다음 대시보드가 로딩될 동안 보여줄 스켈레톤 UI 구현
- 로딩 시간이 짧을 시 스켈레톤 UI가 짧게 나타났다가 사라지는 현상을 방지하기 위해 로딩 시간이 300ms 이상일 때만 스켈레톤 UI가 나타나도록 함

</details>

</details>

</details>
<details>
<summary>기타</summary>

<details>
<summary>디자인 시스템</summary>

프로젝트에서 tailwind를 더욱 효과적으로 사용할 수 있도록 프로젝트를 시작하기 전에 디자인 시스템을 미리 구축하였습니다.

<details>
<summary><h3>폰트</h3></summary>

프로젝트 내부에서 사용되는 폰트 크기를 총 6가지, 폰트 굵기를 총 3가지로 한정지어 디자인 시스템을 다음과 같이 구성하였습니다. 이를 통해 폰트 스타일을 작성할 때 `heading1-normal`과 같은 방식으로 스타일을 줄 수 있도록 하였습니다.

- heading1 (24px)
- heading2 (20px)
- subheading (18px)
- body1 (16px)
- body2 (14px)
- caption (12px)

- light (400)
- normal (500)
- bold (700)

</details>

<details>
<summary><h3>컬러 팔레트</h3></summary>

프로젝트에서 사용되는 모든 컬러들을 미리 `global.css`에 선언해두어 tailwind의 default color들을 덮어씌워 사용했습니다. 이때 html에 `data-theme` attribute가 dark일 때 각 컬러 변수에 저장되어 있는 컬러 값을 변경 시켜 추가적인 코드 없이 다크 모드를 구현할 수 있도록 했습니다.

</details>

<details>
<summary><h3>컴포넌트</h3></summary>

프로젝트에서 주로 사용되는 컴포넌트들의 스타일을 tailwind의 컴포넌트 레이어 클래스로 선언해두어 사용하였습니다. 이를 통해 중복되는 스타일 코드를 방지하고, 프로젝트에서 스타일이 통일성이 있도록 했습니다.

- input
- text-area
- button
- box
- card
- modal

</details>

</details>

<details>
<summary>레이아웃</summary>

_app.tsx에서 공통 레이아웃을 주어 레이아웃 적용

</details>

</details>



