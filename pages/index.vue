<template>
  <div class="main-wrap">
    <h3>클래스팅 사전 과제</h3>
    <p class="info">본 사이트는 클래스팅 채용을 위한 사전 과제 제출용으로 제작되었습니다. <br/>
    과제의 요구 사항을 반영하여 페이지를 구성하였으며, 자세한 내용은 다음과 같습니다.</p>
    
    <h4>페이지 구현 내용</h4>
    <p><strong>/quiz</strong> : 퀴즈 페이지입니다.<br/><br/>
    API로 받아온 퀴즈를 출력하며, 사용자는 문항의 답안을 보기 중 선택할 수 있습니다.<br/>
    선택 즉시 정오답 체점 결과를 알 수 있고 다음 문제 버튼이 활성화됩니다.<br/>
    모든 문제를 풀 경우 정오답 결과와 오답 노트를 확인할 수 있습니다.</p>
  
    <div class="link">
      <Nuxt-link to="quiz">과제 페이지로 이동</Nuxt-link>
    </div>
  </div>
</template>