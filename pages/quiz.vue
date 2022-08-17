<template>
    <div class="quiz-wrap">
        <p v-if="quizArr === ''"> 로딩중..</p>
        <QuizCard 
            v-if="quizArr !== '' && !showResult"
            :quizList = quizArr
            @checkAnswer="checkAnswer">
        </QuizCard>
        <div v-if="!completeQuiz">
            <button class="next-btn" @click="setNextActive" v-if="activeNext"> >> </button>
        </div>
        <div v-if="completeQuiz" class="complete-btns">
            <button class="result-btn" @click="setComplete">RESULT</button>
            <button class="retry-btn" @click="retry">RETRY</button>
        </div>
        <div v-if="showResult" class="report">
            <h3>Result report</h3>
            <p class="score">score: {{correctQuiz}}/{{quizCount}}</p>
            <PieChart 
                :chartData="chartData"
                :width="200"
                :height="200"></PieChart>
            <div>
                <h3>Note</h3>
                <div v-for="(quiz, index) in wrongNote" :key="index">
                    <p class="quiz">Q. <em v-html="quiz.question"></em></p>
                    <p class="wrong">My: {{quiz.sel_answer.name}}</p>
                    <p class="correct">Correct: {{quiz.correct_answer}}</p>
                    <br/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import QuizCard from "../components/QuizCard.vue";
import PieChart from "../components/PieChart.vue";
export default {
    components: { QuizCard, PieChart },
    data() {
        return {
            quizArr: '',
            wrongNote: '',
            completeQuiz: false,
            activeNext: false,
            quizCount: 0,
            showResult: false,
            chartData: {
                labels: [ 'Correct', 'Incorrect'],
                datasets: ''
            }
        };
    },
    computed:{
        ...mapState({
            quizListOrigin: 'quizListOrigin',
        }),
        correctQuiz(){
            if(this.quizArr !== ''){
                let correctCount = 0
                for(const el of this.quizArr){
                    if(el.correct){
                        correctCount++
                    }
                }
                return correctCount
            }
        }
    },
    mounted() {
        this.getQuizList();
    },
    methods: {
        //원본 퀴즈를 저장하기 위한 mutation
        ...mapMutations(
            ['setQuizListOrigin', 'setRetry']
        ),

        //API
        async getQuizList() {
            try {
                const res = await this.$api.quiz.quizList();
                if (res.status === 200 && res.data.results.length > 0) {
                    //원본 데이터와 재응시 상태 장
                    this.setQuizListOrigin(res.data.results)
                    this.setRetry(false)
                    this.quizArr = this.initQuizList(res.data.results)
                }
            }
            catch (err) {
                console.log(err);
            }
        },

        //퀴즈리스트 init
        initQuizList(arr){
            const quizList = arr.map((el, index) => {
                        const answers = this.setAnswers(el.incorrect_answers, el.correct_answer);
                        if(index === 0){
                            return { ...el, active: true, answers: answers, solved: false, correct: false };
                        }
                            return { ...el, active: false, answers: answers, solved: false, correct: false };
                    });
            return quizList
        },

        //답안지 배열 생성
        setAnswers(arr, item) {
            arr=[...arr, item]
            arr=arr.map(el=>{
                return {name:el, checked:false}
            })
            return this.shuffle(arr);
        },

        //답안지 순서 랜덤으로 배치
        shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        },

        //답안 체크
        checkAnswer(answer, i){
            this.quizArr = this.quizArr.map((el, index)=>{
                if(index === i){
                    return el.correct_answer === answer ? 
                    {...el, solved:true, correct:true, sel_answer:answer} 
                    : {...el, solved:true, correct:false, sel_answer:answer}       
                }
                return el
            })
            answer.checked = true
            this.activeNext = true
        },

        //다음 문제 활성화
        setNextActive(){
            this.quizCount = this.quizCount + 1
            if(this.quizCount < this.quizArr.length){
                this.quizArr.at(this.quizCount - 1).active = false
                this.quizArr.at(this.quizCount).active = true
            }else{
                this.completeQuiz = true
            }
            this.activeNext = false
        },

        //다시풀기
        retry(){
            this.quizArr = this.initQuizList([...this.quizListOrigin])
            this.completeQuiz = false
            this.activeNext = false
            this.showResult = false
            this.quizCount = 0
            this.setRetry(true)
        },

        //퀴즈 완료
        setComplete(){
            this.setWrongNote()
            this.setChartData()
            this.showResult = true
        },

        //차트 데이터 생성
        setChartData(){
            const dataset = [
                {
                    backgroundColor: '#f87979',
                    data: [this.correctQuiz, this.quizCount - this.correctQuiz]
                }
            ]
            this.chartData.datasets = dataset
        },

        //오답노트 생성
        setWrongNote(){
            this.wrongNote = this.quizArr.filter(el=>{
                if(!el.correct){
                    return el
                }
            })
        }
    }
}
</script>