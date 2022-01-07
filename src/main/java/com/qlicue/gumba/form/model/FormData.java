package com.qlicue.gumba.form.model;


import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormData {
    private String answer;
    private Long questionNumber;
    private Long surveyId;
    private Long sectionId;
}
