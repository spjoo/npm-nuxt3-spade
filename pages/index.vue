<script setup>
import {onMounted, onUnmounted, onUpdated, ref} from "vue";

const ticketList = ref([
  {
    id: "1",
    type:['horizontal', 'straight'],
    price: "50",
    unit: "%",
    name: "스타벅스 할인",
    term: "10만원 이상 결제 시 최대 50만원 사용 가능",
    period: "2021.06.01 ~ 2021.06.30",
    down:false,
  },
  {
    id: "2",
    type:['horizontal', 'round'],
    price: "50",
    unit: "%",
    name: "스타벅스 할인",
    term: "10만원 이상 결제 시 최대 50만원 사용 가능",
    period: "2021.06.01 ~ 2021.06.30",
    down:false,
  },
  {
    id: "3",
    type:['vertical', 'round'],
    price: "50",
    unit: "%",
    name: "스타벅스 할인",
    term: "10만원 이상 결제 시 최대 50만원 사용 가능",
    period: "2021.06.01 ~ 2021.06.30",
    down:false,
  },
  {
    id: "4",
    type:['vertical', 'straight'],
    price: "50",
    unit: "%",
    name: "스타벅스 할인",
    term: "10만원 이상 결제 시 최대 50만원 사용 가능",
    period: "2021.06.01 ~ 2021.06.30",
    down:false,
  },
]);
const edge = '15'

const ticketInfoRefs = ref([]);
const ticketBtnRefs = ref([]);

const verticalPath = ref(0);
const verticalInnerPath = ref(0);
const horizontalPath = ref(0);
const horizontalInnerPath = ref(0);
const verticalBtnPath = ref(0);
const horizontalBtnPath = ref(0);

//티켓 다운로드 이벤트
const ticketDown = (item) => {
  item.down = true;
};
//ticket width, height
const checkTicket = () => {
  const createPath = (w, h, edge, horizontal) => {
    if (horizontal) {
      return `path('M 0 0 L ${w - edge} 0 Q ${w - edge} ${edge} ${w} ${edge} L ${w} ${h - edge} Q ${w - edge} ${h - edge} ${w - edge} ${h} L 0 ${h} Z')`;
    } else {
      return `path('M 0 0 L ${w} 0 L ${w} ${h - edge} Q ${w - edge} ${h - edge} ${w - edge} ${h} L ${edge} ${h} Q ${edge} ${h - edge} 0 ${h - edge} L 0 0 Z')`;
    }
  };

  // 티켓정보영역 path
  ticketInfoRefs.value.forEach(ref => {
    const isRound = ref.classList.contains('round');
    const isVertical = ref.classList.contains('vertical');
    const isHorizontal = ref.classList.contains('horizontal');

    if (isRound) {
      const width = ref.clientWidth;
      const height = ref.clientHeight;

      if (isVertical) {
        console.log(width - 1)
        verticalPath.value = createPath(width, height, edge, false);
        verticalInnerPath.value = createPath(width - 2, height-2, edge, false);
      } else if (isHorizontal) {
        horizontalPath.value = createPath(width, height, edge, true);
        horizontalInnerPath.value = createPath(width - 2, height - 2, edge, true);

      }
    }
  });

  // 티켓버튼영역 path
  ticketBtnRefs.value.forEach(ref => {
    const isRound = ref.classList.contains('round');
    const isVertical = ref.classList.contains('vertical');
    const isHorizontal = ref.classList.contains('horizontal');

    if (isRound) {
      const width = ref.clientWidth;
      const height = ref.clientHeight;

      if (isVertical) {
        verticalBtnPath.value = `path('M 0 ${edge} Q ${edge} ${edge} ${edge} 0 L ${width - edge} 0 Q ${width - edge} ${edge} ${width} ${edge} L ${width} ${height} L 0 ${height} L 0 ${edge} Z')`;
      } else if (isHorizontal) {
        horizontalBtnPath.value = `path('M 0 ${edge} Q ${edge} ${edge} ${edge} 0 L ${width} 0 L ${width} ${height} L ${edge} ${height} Q ${edge} ${height - edge} 0 ${height - edge} L 0 ${edge} Z')`;
      }
    }
  });
};

onMounted(() => {
  checkTicket();
  window.addEventListener('resize', checkTicket);
});

onUpdated(() => {
  checkTicket();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkTicket);
});

</script>
<template>
	<main id="main">
		<div class="ticket_area">
      <div v-for="(item, index) in ticketList" :key="item.id" class="ticket" :class="item.type" @click="ticketDown(item)">
        <div class="ticket_info" :class="item.type" ref="ticketInfoRefs" >
          <div>
            <img src="@/assets/img/logo01.png" class="logo" alt="로고" />
            <p class="discount"><strong>{{ item.price }}{{ item.unit }}</strong> 할인</p>
            <p class="name">{{ item.name }}</p>
            <div v-if="item.type[0] === 'horizontal'" class="textarea">
              <p>{{item.term}}</p>
              <p>유효기간 : {{item.period}}</p>
            </div>
          </div>
        </div>
        <div class="ticket_btn" :class="[{check : item.down }, item.type]" ref="ticketBtnRefs">
          <div v-if="item.type[0] === 'vertical'" class="textarea">
            <p>{{item.term}}</p>
            <p>유효기간 : {{item.period}}</p>
          </div>
          <p class="down">
            {{item.down ? "다운로드 완료" : "쿠폰 다운로드"}}
          </p>
        </div>
      </div>
    </div>
	</main>
</template>

<style scoped>
main {
  font-size:1.4rem;
  box-sizing: border-box;
  /*max-width:1024px;*/
  padding:2rem;
  width:100%;
  margin:0 auto;
}
.ticket{
  margin: 3rem 0;
  display: flex;
  cursor: pointer;
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.2));
}
.ticket_info{
  display:flex;
  align-items:center;
  justify-content:center;
  background:#e6e6e6;
  position:relative;
}
.ticket_info:before{
  content: '';
  background: #fff;
  position: absolute;
  z-index: -1;
  left: 1px;
  top: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
}
.ticket_info .logo{
  width:15rem;
}
.ticket_info .discount{
  font-size: 3rem;
  margin: 0.5rem 0;
}
.ticket_info .discount strong{
  font-size: 4rem;
}
.ticket_info .name{
  font-size: 2rem;
  font-weight: 600;
}
.ticket_btn{
  background: #165838;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  box-sizing: border-box;
  text-align: center;
  font-size: 1.7rem;
  color: #fff;
  word-break: keep-all;
  line-height: 1.4;
  position:relative;
}
.ticket_btn:before{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
}
.ticket_btn p.down{
  background-image: url("@/assets/img/ic_download.png");
  background-repeat: no-repeat;
  background-size: 3rem;
}
.ticket_btn.check{
  background: #c7c7c7;
}
.ticket_btn.check p.down{
  background-image: url("@/assets/img/ic_check.png");
  background-repeat: no-repeat;
  background-size: 3rem;
}
.textarea{
  width:100%;
}
.textarea p{
  font-size: 1.5rem;
  opacity: .7;
  margin: 0.5rem 0;
}

/*가로형 티켓*/
.ticket.horizontal{
  height:40rem;
}
.ticket.horizontal .ticket_info{
  width:calc(100% - 8rem);
}

.ticket.horizontal.straight .ticket_info{
  clip-path: polygon(0 0, calc(100% - 1.3rem) 0, 100% 1.3rem, 100% calc(100% - 1.3rem), calc(100% - 1.3rem) 100%, 0 100%);
}
.ticket.horizontal.round .ticket_info{
  clip-path: v-bind(horizontalPath);
  /*clip-path: path('M 0 0 L 889 0 Q 889 15 904 15 L 904 385 Q 889 385 889 400 L 0 400 ');*/
}
.ticket.horizontal.straight .ticket_info:before{
  clip-path: polygon(0 0, calc(100% - 1.2rem) 0, 100% 1.2rem, 100% calc(100% - 1.2rem), calc(100% - 1.2rem) 100%, 0 100%);
}
.ticket.horizontal.round .ticket_info:before{
  clip-path: v-bind(horizontalInnerPath);
}

.ticket.horizontal .ticket_info .textarea{
  margin-top: 1rem;
}
.ticket.horizontal .ticket_btn{
  width: 8rem;
}
.ticket.horizontal.straight .ticket_btn{
  clip-path: polygon(1.3rem 0, 100% 0, 100% 100%, 1.3rem 100%, 0 calc(100% - 1.3rem), 0 1.3rem);
}
.ticket.horizontal.round .ticket_btn{
  clip-path: v-bind(horizontalBtnPath);
}
.ticket.horizontal .ticket_btn:before{
  width: 0.15rem;
  height: 100%;
  border-left: 0.15rem dashed rgba(255,255,255,0.5);
}
.ticket.horizontal .ticket_btn p.down{
  background-position: center top;
   padding-top: 4rem;
 }

/*세로형 티켓*/
.ticket.vertical{
  flex-wrap: wrap;
}
.ticket.vertical .ticket_info{
  width:100%;
  height:40rem;
  text-align: center;
}
.ticket.vertical.straight .ticket_info{
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 1.3rem), calc(100% - 1.3rem) 100%, 1.3rem 100%, 0 calc(100% - 1.3rem) );
}
.ticket.vertical.round .ticket_info{
  clip-path: v-bind(verticalPath);
  /*clip-path: path('M 0 0 L 889 0 Q 889 15 904 15 L 904 385 Q 889 385 889 400 L 0 400 ');*/
}
.ticket.vertical.straight .ticket_info:before{
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 1.3rem), calc(100% - 1.3rem) 100%, 1.3rem 100%, 0 calc(100% - 1.3rem) );
}
.ticket.vertical.round .ticket_info:before{
  clip-path: v-bind(verticalInnerPath);
}
.ticket.vertical .ticket_btn{
  width:100%;
  min-height:8rem;
  flex-wrap:wrap;
}
.ticket.vertical.straight .ticket_btn{
  clip-path: polygon(1.3rem 0, calc(100% - 1.3rem) 0, 100% 1.3rem, 100% 100%, 0 100%, 0 1.3rem );
}
.ticket.vertical.round .ticket_btn{
  clip-path: v-bind(verticalBtnPath);
}
.ticket.vertical .ticket_btn:before{
  height: 0.15rem;
  width: 100%;
  border-top: 0.15rem dashed rgba(255,255,255,0.5);
}
.ticket.vertical .ticket_btn p.down{
  padding: 1rem 2rem 0.8rem 5rem;
  background-color: #387d5c;
  background-position: left 1.5rem center;
  background-size: 2.5rem;
}
.ticket.vertical .ticket_btn.check p.down{
  background-color: #b3b3b3;
}
.ticket.vertical .ticket_btn .textarea{
  margin-bottom: 1rem;
}

</style>
