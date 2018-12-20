<template>
  <div class="about_page">
    <ul class="my_profile">
      <li>
          <h2>이 름</h2>
          <p>김 관 (Kim Kwan)</p>
      </li>
      <li>
          <h2>나 이</h2>
          <p>1990.09.22 (29)</p>
      </li>
      <li class="slidetag">
          <h2 @click="slideup">스 킬<span> {{ arrow }}</span></h2>
          <transition name="slide">
            <div v-if="skills">
              <div class="my_skill">
                  <div class="skill_mark">
                    <i class="fab fa-html5"></i>
                  </div>
                  <div class="skill_detail">
                    HTML <br />
                    (Accessibility / UX) <br />
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
              </div>
              <div class="my_skill">
                  <div class="skill_mark">
                    <i class="fab fa-css3"></i>
                  </div>
                  <div class="skill_detail">
                    CSS <br />
                    (responsive / animation) <br />
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
              </div>
              <div class="my_skill">
                  <div class="skill_mark">
                    <i class="fab fa-js-square"></i>
                  </div>
                  <div class="skill_detail">
                    JavaScript <br />
                    (Vanilla JS / Jquery) <br />
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
              </div>
              <div class="my_skill">
                  <div class="skill_mark">
                    <i class="fab fa-vuejs"></i>
                  </div>
                  <div class="skill_detail">
                    Vue.js <br />
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
              </div>
              <div class="my_skill">
                  <div class="skill_mark">
                    <i class="fab fa-node-js"></i>
                  </div>
                  <div class="skill_detail">
                    Node.js <br />
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                  </div>
              </div>
              <div class="my_skill">
                  <div class="skill_mark">
                  </div>
                  <div class="skill_detail">
                    경험해본것 <br />
                    MySQL / MongoDB / CORDOVA
                  </div>
              </div>
            </div>
          </transition>
      </li>
      <li class="slidetag">
          <h2 @click="slideup2">커리어<span> {{ arrow2 }}</span></h2>
          <transition name="slide">
            <div v-if="skills2">
              <div class="career">
                  <div class="career_tit">
                    - 삼성물산 패션부문 SSF SHOP ( 협력업체 )
                  </div>
                  <div class="career_detail">
                    SSF-SHOP 온라인영업팀 에서 퍼블리셔로 2년간 근무하였습니다.
                    <br />
                    JS(Jquery) 를 활용한 이벤트 와 동적인 효과등을 주로 작업하였고, HTML 마크업 코딩과
                    CSS3 를 이용해 animation 과 반응형 작업을 했습니다.
                    웹 디자이너들과 타 업체 기획자,개발자 들과 협업하였습니다.
                    <br /><br />
                    기간 : 2016.09 ~ 2018.10
                  </div>
              </div>
              <div class="career">
                  <div class="career_tit">
                    - CHEAT FIELD ( 개인작업 )
                  </div>
                  <div class="career_detail">
                    HTML 5 기반 웹 게임을 기획/개발 후 CORDOVA 를 이용해 App 을 출시 했습니다.
                    <br />
                    CHEAT FIELD 는 보드게임이며 유저간 1:1 실시간 대전 게임 App 입니다.
                    현재 구글 플레이스토어 와 애플 앱스토어 , 원스토어에 배포된 상태입니다.
                    서버 는 node.js(express) , 클라이언트 는 HTML 5,CSS 3,JS 로 구현하였고(vue.js로 업데이트)
                    DB 는 mysql 유저간 통신은 socket.io 로 구현하였습니다.
                    <br /><br />
                    배운점 : 기획부터 개발,디자인 까지 1인 개발로 진행 하면서, 규모가 커질수록 협업의 중요성을 강하게 깨달았다.
                    나 자신 과 프론트엔드 로써 한단계 성장하는 중요한 프로젝트 였다.
                  </div>
              </div>
            </div>
          </transition>
      </li>
      <li>
          <h2>
            코딩에 임하는 자세
          </h2>
          <p>
            modesty
          </p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        skills : true,
        skills2 : true,
        arrow : '▼',
        arrow2 : '▼'
      }
    },
    methods:{
      slideup(){
        if(this.skills){
          this.skills = false;
          this.arrow = '▲'
        }else{
          this.skills = true;
          this.arrow = '▼'
        }
      },
      slideup2(){
        if(this.skills2){
          this.skills2 = false;
          this.arrow2 = '▲'
        }else{
          this.skills2 = true;
          this.arrow2 = '▼'
        }
      }
    }
  }
</script>

<style>
.about_page{
  max-width:640px;
  min-width:320px;
  margin:20px auto;
  border:4px outset #8c8c8c;
  border-radius:15px;
  padding:1% 2% 2% 2%;
  box-shadow: 4px 4px 20px #555;
  color:#000;
  font-size:18px;
  background:#f6f6f6;
}
.my_profile li{
  width:100%;
  padding:2% 2% 0;
  overflow:hidden;
}
.my_profile li p{
  font-size:20px;
  line-height:2.4rem;
}

.my_profile li.slidetag>h2{
  cursor:pointer;
}
.my_profile .my_skill{
  display:inline-block;
  padding:2% 0;
  width:49%;
  height:120px;
}
.my_profile .skill_mark{
  width:70px;
  font-size:68px;
  float:left;
}
.my_profile .skill_detail{
  float: left;
}
.career{
  padding:2% 0;
}
.career_tit{
  font-size:24px;
}
.career_detail{
  font-size:14px;
  font-family: 'Nanum Gothic', sans-serif;
  line-height:25px;
  font-weight:bold;
}
.slide-enter-active{
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   height: 400px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   height: 0;
}
@media (max-width:600px){
  .about_page{
    max-width:640px;
    min-width:320px;
    margin:0px auto;
    border:none;
    border-radius:0px;
    padding:6%;
    box-shadow: 4px 4px 20px #555;
    color:#000;
    font-size:18px;
    background:#f6f6f6;
  }

  .my_profile .my_skill{
    display:block;
    min-width:280px;
    margin:0 auto;
    height:100px;
  }
}
</style>
