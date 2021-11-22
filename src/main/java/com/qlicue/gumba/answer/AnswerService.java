package com.qlicue.gumba.answer;


import com.qlicue.gumba.exception.NotFoundException;


import com.qlicue.gumba.question.Question;
import com.qlicue.gumba.question.QuestionRepository;
import com.qlicue.gumba.survey.Survey;
import com.qlicue.gumba.survey.SurveyRepository;
import com.qlicue.gumba.user.User;
import com.qlicue.gumba.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private  final SurveyRepository surveyRepository;
    private  final UserRepository userRepository;
    public List<Answer> getAllAnswers() {

        return answerRepository.findAll();
    }

    public void addAnswer(Answer answer, Long surveyId, Long userId) {

        //find the question by id
        Survey survey = surveyRepository.findById(surveyId ).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));


        //find the question by id
        User user = userRepository.findById(userId ).orElseThrow(() ->
                new NotFoundException("User\twith\tid\t" + userId + "\tdoes\tnot\texists"));

        //add dates
        answer.setCreatedAt(LocalDate.now());
        answer.setUpdatedAt(LocalDate.now());

        //add question to answer
        answer.setSurvey(survey);

        //add user to answer
        answer.setUser(user);

        //save the answer
        answerRepository.save(answer);
    }

    public void deleteAnswer(Long answerId) {
        if (!answerRepository.existsById(answerId)) {
            throw new NotFoundException("Answer\twith\tid\t" + answerId + "\tdoes\tnot\texists");
        }
        answerRepository.deleteById(answerId);
    }

    @Transactional
    public void updateAnswer(Long answerId, String title ) {
        Answer answer = answerRepository.findById(answerId).orElseThrow(() ->
                new NotFoundException("Answer\twith\tid\t" + answerId + "\tdoes\tnot\texists"));


//        if (title != null && title.length() > 0 && !Objects.equals(answer.getTitle(), title)) {
//            answer.setTitle(title);
//        }


    }

    public List<Answer> getSurveyAnswers(Long surveyId) {
        //find the survey by id
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));

        return   answerRepository.findBySurvey(survey, Sort.by("id"));
    }
}
