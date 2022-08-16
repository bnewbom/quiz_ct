<template>
    <div class="quiz-wrap">
        <QuizCard 
            v-if="quizArr !== ''"
            :quizList = quizArr
            @checkAnswer="checkAnswer">
        </QuizCard>
        <div v-if="!completeQuiz">
            <button class="next-btn" @click="setNextActive" :disabled="!activeNext">Next</button>
        </div>
        <div v-if="completeQuiz" class="complete-btns">
            <button class="result-btn">RESULT</button>
            <button class="retry-btn" @click="retry">RETRY</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import QuizCard from "../components/QuizCard.vue";
export default {
    components: { QuizCard },
    data() {
        return {
            quizArr: "",
            completeQuiz: false,
            activeNext: false,
            quizCount: 0
        };
    },
    computed:{
        ...mapState({
            quizListOrigin: 'quizListOrigin',
        }),
    },
    mounted() {
        this.getQuizList();
    },
    methods: {
        //원본 퀴즈를 저장하기 위한 mutation
        ...mapMutations(
            ['setQuizListOrigin']
        ),

        //API
        async getQuizList() {
            try {
                const res = await this.$api.quiz.quizList();
                if (res.status === 200 && res.data.results.length > 0) {
                    this.setQuizListOrigin(res.data.results)
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
            return this.shuffle([...arr, item]);
        },

        //답안지 순서 랜덤으로 배치
        shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        },

        //답안 체크
        checkAnswer(answer, i, answer_i){
            this.quizArr = this.quizArr.map((el, index)=>{
                if(index === i){
                    return el.correct_answer === answer ? 
                    {...el, solved:true, correct:true, sel_answer:answer} 
                    : {...el, solved:true, correct:false, sel_answer:answer}       
                }
                return el
            })    
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
            this.completeQuiz = false,
            this.activeNext = false,
            this.quizCount = 0
        }
    }
}
</script>