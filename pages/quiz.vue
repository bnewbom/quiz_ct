<template>
    <div>
        <QuizCard 
            v-if="quizArr !== ''"
            :quizList = quizArr
            @checkAnswer="checkAnswer">
        </QuizCard>
        <p v-if="completeQuiz">Quiz complete!</p>
        <button>Prev</button>
        <button>Next</button>
    </div>
</template>

<script>
import QuizCard from "../components/QuizCard.vue";
export default {
    components: { QuizCard },
    data() {
        return {
            quizArr: "",
            completeQuiz: false
        };
    },
    mounted() {
        this.getQuizList();
    },
    methods: {
        //API
        async getQuizList() {
            try {
                const res = await this.$api.quiz.quizList();
                if (res.status === 200 && res.data.results.length > 0) {
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
        checkAnswer(quiz, answer, i){
            this.quizArr = this.quizArr.map((el, index)=>{
                if(index === i){
                    return el.correct_answer === answer ? {...el, correct:true, solved:true, active:false} : {...el, correct:false, solved:true, active:false}       
                }
                return el
            })    
            this.setNextActive(i)        
        },

        //다음 문제 활성화
        setNextActive(i){
            console.log(i)
            if(i + 1 < this.quizArr.length){
                this.quizArr.at(i+1).active = true
            }else{
                this.completeQuiz = true
            }
        }
    }
}
</script>