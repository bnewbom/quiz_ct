<template>
    <div class="quizcard-warp">
        <div v-for="(quiz, index) in quizList" :key="index">
            <div v-if="quiz.active">
                <h4>Quiz. {{index+1}} </h4>
                <h3 v-html="quiz.question"></h3>
                <div class="answer-wrap">
                    <div class="answers" v-for="(answer, i) in quiz.answers" :key="i">
                        <button :class="{'checked':answer.checked}" 
                            @click="checkAnswer(answer, index)"
                            :disabled="quiz.solved">
                            {{i+1}}. <em v-html="answer.name"></em>
                        </button>
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
        checkAnswer(answer, index){
            this.$emit('checkAnswer', answer, index)
        }
    }
}
</script>