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

    public void addSkip(Skip skip, Long answerId) {

        //find the answerType by id
        Answer answer = answerRepository.findById(answerId).orElseThrow(() ->
                new NotFoundException("Answer\twith\tid\t" + answerId + "\tdoes\tnot\texists"));

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
    public void updateSkip(Long skipId, String title,   boolean isRequired) {
        Skip skip = skipRepository.findById(skipId).orElseThrow(() ->
                new NotFoundException("Skip\twith\tid\t" + skipId + "\tdoes\tnot\texists"));


//        if (title != null && title.length() > 0 && !Objects.equals(skip.getTitle(), title)) {
//            skip.setTitle(title);
//        }
//
//        if (type != null && !Objects.equals(skip.getType(), type)) {
//            skip.setType(type);
//        }
//
//        if (!Objects.equals(skip.getType(), isRequired)) {
//            skip.setRequired(isRequired);
//        }
    }
}
