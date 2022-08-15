<template>
    <div>
        퀴즈 화면
        <button>Prev</button>
        <button>Next</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            quizArr:''
        }
    },
    mounted(){
            this.getQuizList()
        },
    methods:{
        //API
        async getQuizList(){
            try{
                const res = await this.$api.quiz.quizList()
                if(res.status === 200){
                    console.log(res)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>