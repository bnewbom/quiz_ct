export const state = () => ({
    quizListOrigin: null,
})

export const mutations = {
    setQuizListOrigin(state, obj){
        state.quizListOrigin = obj
    },
}