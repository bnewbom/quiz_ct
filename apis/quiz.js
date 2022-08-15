export default axios => ({
    //퀴즈 리스트 요청
    quizList(){
        return axios.get('https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple')
    },
})