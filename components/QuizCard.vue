<template>
    <div class="quizcard-warp">
        <div v-for="(quiz, index) in quizList" :key="index">
            <div v-if="quiz.active">
                <h3>{{index+1}}. {{quiz.question}}</h3>
                <div class="answer-wrap">
                    <div class="answers" v-for="(answer, i) in quiz.answers" :key="i" @click="checkAnswer(answer, index, i)">
                        <input type="radio" :id="'answer_'+i">
                        <label :for="'answer_'+i">{{answer}}</label>
                    </div>
                </div>
                <div v-if="quiz.solved" class="correct-check">
                    <p v-if="quiz.correct">Correct</p>
                    <p v-if="!quiz.correct">Incorrect</p>
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
export default {
    props:{
        quizList: Array
    },
    methods:{
        checkAnswer(answer, index, answer_i){
            this.$emit('checkAnswer', answer, index, answer_i)
        }
    }
}
</script>