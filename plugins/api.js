import Quiz from '@/apis/quiz'

export default (context, inject) => {
	// API Factories를 초기설정
    const factories = {
    	quiz: Quiz(context.$axios),
    }

    // $api를 Inject
    inject('api', factories)
}