export const loadQuestions = async (amount = 10, category = 9, difficulty = 'easy', type = 'multiple') => {
    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}&type=${type}`;

    try {
        const res = await fetch( url );
        const { results } = await res.json();
        return convertQuestionsFromAPI(results);
    } catch(err) {
        console.error(err);
    }
}


const convertQuestionsFromAPI = questions => {
    return questions.map( question => {
        const formattedQuestion = {
            question: question.question,
            choices: [...question.incorrect_answers ]
        }
        const randomIndex = Math.floor( Math.random() * 4 );
        formattedQuestion.answer = randomIndex;
        formattedQuestion.choices.splice(randomIndex, 0, question.correct_answer);
        return formattedQuestion;
    })
}
