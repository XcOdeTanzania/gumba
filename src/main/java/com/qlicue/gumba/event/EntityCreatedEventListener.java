package com.qlicue.gumba.event;

import com.qlicue.gumba.answer.Answer;
import com.qlicue.gumba.answer.AnswerService;
import com.qlicue.gumba.question.Question;
import com.qlicue.gumba.question.QuestionService;
import com.qlicue.gumba.question.QuestionType;
import com.qlicue.gumba.section.Section;
import com.qlicue.gumba.section.SectionService;
import com.qlicue.gumba.survey.Survey;
import lombok.AllArgsConstructor;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;


@AllArgsConstructor
@Component
public class EntityCreatedEventListener implements
        ApplicationListener<EntityCreatedEvent> {


    private SectionService sectionService;
    private QuestionService questionService;
    private AnswerService answerService;


    @Override
    public void onApplicationEvent(EntityCreatedEvent event) {

      //create a section
        if (event.getEntity() != null && event.getEntity() instanceof Survey) {
            Section section = new Section("Untitled Section","Description (Optional)",( (Survey)  event.getEntity()).getId(),"SUBMIT" );
             System.out.println("i reach here...");
           sectionService.addSection(section );
        }

        //create a question
        if (event.getEntity() != null && event.getEntity() instanceof Section) {
            Question question = new Question("Untitled Question",false, QuestionType.MULTIPLE,( (Section)  event.getEntity()).getId(),false );

            questionService.addQuestion(question  );
        }


        //create an answer
        if (event.getEntity() != null && event.getEntity() instanceof Question) {
            Answer answer = new Answer("Option",( (Question)  event.getEntity()).getId() );

            answerService.addAnswer(answer  );
        }
    }
}
