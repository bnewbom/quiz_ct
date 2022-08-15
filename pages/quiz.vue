<template>
    <div>
        <QuizCard 
            v-if="quizArr !== ''"
            :quizList = quizArr
            @checkAnswer="checkAnswer">
        </QuizCard>
        <button>Prev</button>
        <button>Next</button>
    </div>
</template>

<script>
import QuizCard from "../components/QuizCard.vue";
export default {
    data() {
        return {
            quizArr: ""
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
                    this.quizArr = res.data.results.map((el, index) => {
                        const answers = this.setAnswers(el.incorrect_answers, el.correct_answer);
                        if(index === 0){
                            return { ...el, active: true, answers: answers, solved: false, correct: false };
                        }
                            return { ...el, active: false, answers: answers, solved: false, correct: false };
                    });
                    console.log(res);
                }
            }
            catch (err) {
                console.log(err);
            }
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
        checkAnswer(quiz, answer, index){
            console.log(quiz, answer, index)
        }
    },
    components: { QuizCard }
}
</script>