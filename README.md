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
<ul>
<details>
<summary>회원가입</summary>
<ul>
<li> react-hook-form을 사용 </li>
<li> useForm의 controller를 사용하여 각 input의 역할을 구분 </li>
<li> 유효성 검사를 통해 에러메세지 전달 </li>
<li> 모든 유효성 검사를 통과하면 회원가입 버튼이 활성화 </li>
    </ul>
</details>

<details>
<summary>로그인</summary>
<ul>
<li> react-hook-form을 사용 </li>
<li> useForm의 controller를 사용하여 각 input의 역할을 구분 </li>
<li> 유효성 검사를 통해 에러메세지 전달 </li>
<li> 모든 유효성 검사를 통과하면 로그인 버튼이 활성화 </li>
    </ul>
</details>

<details>
<summary>나의 대시보드</summary>
<ul>
<details>
<summary>참여중인 대시보드</summary>

<ul><li>페이지네이션 기반 UI 구축. 클릭 시 각 대시보드로 이동</li></ul> 
</details>

<details>
<summary>새로운 대시보드 생성</summary>

<ul><li>모달 통해 폼 제출 시 post 요청</li></ul>
</details>

<details>
<summary>초대받은 대시보드</summary>
<details>
<summary>초대 거절 / 수락</summary>
    <ul><li>초대 거절 / 수락 시 초대목록에서 삭제, 사이드메뉴와 참여중인 대시보드에 반영</li></ul> 
</details>
<details>
    <summary>초대 목록 검색</summary>
    <ul><li>커스텀 훅 **useSearchInvitedDashboards** 을 사용해 get 요청을 통해 필터링된 초대목록만 보이게 함</li></ul>
</details>
</ul>
</details>
</details>
</details>
<details>
<summary>Hook</summary>
<ul>
  <details>
<summary>api 연결</summary>
      
### useRequest

- 프로젝트 내부에서 보내는 모든 api 요청을 useRequest이라는 커스텀 훅으로 통일시켜 관심사의 분리 적용
- 파라미터로 받은 주소로 데이터 요청을 보내어 받은 데이터 또는 오류를 리턴
- 요청이 진행되고 있음을 알 수 있는 isLoading 변수를 같이 리턴해주어 스켈레톤 UI 등에 사용할 수 있도록 구현

### axios interceptor

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
</ul>
    </ul>
    </details>
<details>    
<summary>전역 상태 관리 및 환경 변수 관리</summary>
<ul>
<details>
<summary>전역 상태관리 (Jotai)</summary>

Jotai를 사용해 로그인 정보와 다크모드 상태 저장

</details>

<details>
<summary>환경변수 관리 (.env)</summary>

.env: API url (.gitgnore 미포함)
</ul>
</details>

</details>
</details>
<details>
<summary>공통 컴포넌트</summary>
<ul>
<details>
<summary>헤더</summary>

<ul><li> 각 페이지 및 접근 권한에 따라 보이는 헤더가 다르도록 구현</li></ul>

</details>

<details>
<summary>모달</summary>

<ul><li> 컴파운드 패턴 적용 </li></ul>

</details>
<details>
<summary>사이드메뉴</summary>

사이드 메뉴에서는 무한 스크롤 및 스켈레톤 UI를 적용했습니다.
</ul>
<details>
<summary>무한 스크롤</summary>
<ul>
<li> useInfiniteScroll 훅 사용 </li>
<li> react query 라이브러리에서 제공하는 useInfiniteQuery를 통해 데이터 fetch </li>
</ul>
</details>

<details>
<summary>스켈레톤 UI</summary>
<ul>
<li> 다음 대시보드가 로딩될 동안 보여줄 스켈레톤 UI 구현</li>
<li> 로딩 시간이 짧을 시 스켈레톤 UI가 짧게 나타났다가 사라지는 현상을 방지하기 위해 로딩 시간이 300ms 이상일 때만 스켈레톤 UI가 나타나도록 함</li>
</ul>
</details>

</details>

</details>
<details>
<summary>기타</summary>
<ul>
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
</ul>
</details>

</details>

### Feature Demonstration GIF
<details>
    <summary>페이지</summary>
     <ul>
  <details>
  <summary>랜딩페이지</summary>
  
  ![랜딩페이지](https://github.com/Peachy-Peachy/Taskify/assets/119280160/0bcb5070-b67b-40f8-aa3a-94e625088a66)
  
  </details>
  <details>
  <summary>회원가입</summary>
  
  
  </details>
  <details>
  <summary>로그인</summary>
      
  ![로그인](https://github.com/Peachy-Peachy/Taskify/assets/119280160/92ec67f0-8380-4293-bc70-e9d4c577e94c)

  </details>
   <details>
  <summary>나의 대시보드 </summary>
       <ul>
  <details>
  <summary>참여중인 대시보드 </summary>
      
  ![참여중인대시보드](https://github.com/Peachy-Peachy/Taskify/assets/119280160/09d19da6-77bb-4610-9917-27f96b464b15)
  </details>
  <details>
  <summary> 새로운 대시보드 생성 </summary>
      
  ![새로운대시보드](https://github.com/Peachy-Peachy/Taskify/assets/119280160/916b69d2-161b-4031-98a1-97b64f52732b)

  </details>
   <details>
  <summary>초대받은 대시보드 </summary>
       <ul>
<details>
  <summary>초대 목록 무한스크롤 </summary>
    
![초대목록 무한스크롤](https://github.com/Peachy-Peachy/Taskify/assets/119280160/0c772086-7f7c-40d8-a3e1-3c3da93262fa)

  </details>
  <details>
  <summary>초대 거절, 수락 </summary>
      
![초대수락거절](https://github.com/Peachy-Peachy/Taskify/assets/119280160/753c29a4-c78d-4a63-a296-5b3911484977)

  </details>
  <details>
  <summary>초대 목록 검색</summary>
      
![초대목록검색2](https://github.com/Peachy-Peachy/Taskify/assets/119280160/b403fa85-229a-4c3c-b256-215160619956)

  </details>
  </ul>
  </ul>
  </details>
   <details>
      <summary>대시보드</summary>
        <ul>
            <details>
              <summary>DnD</summary>
            </details>
            <details>
              <summary>더보기 버튼</summary>
            </details>
            <details>
              <summary>무한 스크롤</summary>
            </details>
            <details>
              <summary>컬럼관리</summary>
            </details>
            <details>
              <summary>할 일 생성, 수정</summary>
            </details>
        </ul>
  </details>
  <details>
      <summary>마이 페이지</summary>
      <ul>
           <details>
              <summary>프로필 수정 및 비밀번호 변경</summary>
               
![프로필변경2](https://github.com/Peachy-Peachy/Taskify/assets/119280160/f7412c42-6dbd-4a1b-99e4-88c00050225d)

![비밀번호변경](https://github.com/Peachy-Peachy/Taskify/assets/119280160/768878f6-e59b-4cd9-b89f-9e3d6bd1db89)

          </details>
      </ul>
  </details>
  </details>
  </ul>
</details>
  <details>
      <summary>공통 컴포넌트</summary>
      <ul>
           <details>
              <summary>헤더</summary>
           </details>
          <details>
              <summary>모달</summary>
              <ul>
                  <li>
                  <bold>대시보드 생성하기</bold>
                  
![대시보드생성하기](https://github.com/Peachy-Peachy/Taskify/assets/119280160/336ad772-2423-4b9c-8b16-3f5e3b5ad0d5)</li>
                <li>
                <bold>칼럼 생성</bold>
                
![칼럼생성](https://github.com/Peachy-Peachy/Taskify/assets/119280160/1804ccc8-b915-424a-a9be-bd177b208b4d)</li>
 
<li>
    <bold>칼럼 생성 초과</bold>
    
![칼럼생성초과](https://github.com/Peachy-Peachy/Taskify/assets/119280160/5c9af165-866d-4cf8-a7ba-d2de03b303c1)
</li>
 
<li>
    <bold>칼럼 수정</bold>
    
    
![칼럼수정](https://github.com/Peachy-Peachy/Taskify/assets/119280160/a0165998-7cff-47bd-8bf0-f633ae95eac4)
 </li>
 <li>
     
<bold>대시보드 초대하기</bold>  
     ![대시보드초대](https://github.com/Peachy-Peachy/Taskify/assets/119280160/d5ae7f13-dab6-4559-9d06-b566234a39c0)
 </li>
 <li>
     <bold>대시보드 초대하기 (없는 이메일)</bold>
     
![대시보드초대에러](https://github.com/Peachy-Peachy/Taskify/assets/119280160/3de007fb-e705-4dcb-ac58-001c37677a93)
 </li>
 </ul>
           </details>
           <details>
              <summary>사이드메뉴</summary>
               
  </details>



