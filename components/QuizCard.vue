<template>
    <div class="quizcard-warp">
        <div v-for="(quiz, index) in quizList" :key="index">
            <div v-if="quiz.active">
                <h3>{{index+1}}. {{quiz.question}}</h3>
                <ul v-for="(answer, index) in quiz.answers">
                    <li><a @click="checkAnswer(quiz, answer, index)">{{answer}}</a></li>
                </ul>
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
        checkAnswer(quiz, answer, index){
            this.$emit('checkAnswer',quiz, answer, index)
        }
    }
}
</script>