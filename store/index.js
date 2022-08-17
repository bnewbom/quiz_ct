export const state = () => ({
    quizListOrigin: null,
    isRetry: false
})

export const mutations = {
    setQuizListOrigin(state, obj){
        state.quizListOrigin = obj
    },
    setRetry(state, status){
        state.isRetry = status
    }
}