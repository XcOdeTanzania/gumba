package com.qlicue.gumba.response;


import com.qlicue.gumba.exception.NotFoundException;


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

@AllArgsConstructor
@Service
public class ResponseService {
    private final ResponseRepository responseRepository;
    private  final SurveyRepository surveyRepository;
    private  final UserRepository userRepository;
    public List<Response> getAllResponses() {

        return responseRepository.findAll();
    }

    public void addResponse(Response response, Long surveyId, Long userId) {

        //find the question by id
        Survey survey = surveyRepository.findById(surveyId ).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));


        //find the question by id
        User user = userRepository.findById(userId ).orElseThrow(() ->
                new NotFoundException("User\twith\tid\t" + userId + "\tdoes\tnot\texists"));

        //add dates
        response.setCreatedAt(LocalDate.now());
        response.setUpdatedAt(LocalDate.now());

        //add question to response
        response.setSurvey(survey);

        //add user to response
        response.setUser(user);

        //save the response
        responseRepository.save(response);
    }

    public void deleteResponse(Long responseId) {
        if (!responseRepository.existsById(responseId)) {
            throw new NotFoundException("Response\twith\tid\t" + responseId + "\tdoes\tnot\texists");
        }
        responseRepository.deleteById(responseId);
    }

    @Transactional
    public void updateResponse(Long responseId, String title ) {
        Response response = responseRepository.findById(responseId).orElseThrow(() ->
                new NotFoundException("Response\twith\tid\t" + responseId + "\tdoes\tnot\texists"));


//        if (title != null && title.length() > 0 && !Objects.equals(response.getTitle(), title)) {
//            response.setTitle(title);
//        }


    }

    public List<Response> getSurveyResponses(Long surveyId) {
        //find the survey by id
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(() ->
                new NotFoundException("Survey\twith\tid\t" + surveyId + "\tdoes\tnot\texists"));

        return   responseRepository.findBySurvey(survey, Sort.by("id"));
    }
}
