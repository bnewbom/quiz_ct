<template>
    <div class="quizcard-warp">
        <div v-for="(quiz, index) in quizList" :key="index">
            <div v-if="quiz.active">
                <h3>{{index+1}}. {{quiz.question}}</h3>
                <ul v-for="(answer, i) in quiz.answers" :key="i">
                    <li @click="checkAnswer(answer, index)">
                        <input type="checkbox" :id="'answer_'+i" name="scales">
                        <label :for="'answer_'+i">{{answer}}</label>
                    </li>
                </ul>
                <p v-if="quiz.solved && quiz.correct">Correct</p>
                <p v-if="quiz.solved && !quiz.correct">Incorrect</p>
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