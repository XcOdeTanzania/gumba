package com.qlicue.gumba.skip;


import com.qlicue.gumba.answer.Answer;
import com.qlicue.gumba.answer.AnswerRepository;
import com.qlicue.gumba.exception.NotFoundException;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class SkipService {
    private final SkipRepository skipRepository;
    private  final AnswerRepository answerRepository;

    public List<Skip> getAllSkips() {

        return skipRepository.findAll();
    }

    public List<Skip> getAnswerSkips(Long answerId) {
        //find the skip by id
        Answer answer = answerRepository.findById(answerId).orElseThrow(() ->
                new NotFoundException("Answer\twith\tid\t" + answerId + "\tdoes\tnot\texists"));

        return   skipRepository .findByAnswer(answer, Sort.by("id"));
    }



    public void addSkip(Skip skip ) {

        //find the answerType by id
        Answer answer = answerRepository.findById(skip.getAnswerId()).orElseThrow(() ->
                new NotFoundException("Answer\twith\tid\t" + skip.getAnswerId() + "\tdoes\tnot\texists"));



        //add dates
        skip.setCreatedAt(LocalDate.now());
        skip.setUpdatedAt(LocalDate.now());

        //add answerType to skip
        skip.setAnswer(answer);


        skipRepository.save(skip);
    }

    public void deleteSkip(Long skipId) {
        if (!skipRepository.existsById(skipId)) {
            throw new NotFoundException("Skip\twith\tid\t" + skipId + "\tdoes\tnot\texists");
        }
        skipRepository.deleteById(skipId);
    }

    @Transactional
    public void updateSkip(Long skipId, Skip skipParams  ) {
        Skip skip = skipRepository.findById(skipId).orElseThrow(() ->
                new NotFoundException("Skip\twith\tid\t" + skipId + "\tdoes\tnot\texists"));


        if (skipParams.getLogic() != null && !Objects.equals(skip.getLogic(), skipParams.getLogic())) {
            skip.setLogic(skipParams.getLogic());
        }


        if (  !Objects.equals(skip.isSkipAll(), skipParams.isSkipAll())) {
            skip.setSkipAll(skipParams.isSkipAll());
        }


    }




}
