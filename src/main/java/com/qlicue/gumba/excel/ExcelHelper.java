package com.qlicue.gumba.excel;

import com.qlicue.gumba.form.Form;
import com.qlicue.gumba.form.model.FormData;
import com.qlicue.gumba.question.Question;
import com.qlicue.gumba.response.Response;
import com.qlicue.gumba.section.Section;
import com.qlicue.gumba.survey.Survey;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelHelper {

    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] SURVEY_HEADERS = {
            "Id",
            "Title",
            "Meta Title",
            "Slug",
            "Summary",
            "Description",
            "Slug",
            "Published",
            "Accessibility",
            "Total Responses",
            "Created At",
            "Published At" };

    static String SURVEY_SHEET = "Surveys";

    //responses

    static String[] SURVEY_RESPONSE_HEADERS = {
            "Id",
            "Question",
            "Question Type",
            "Answer"  };
    static String SURVEY_RESPONSE_SHEET = "Surveys";

    public static ByteArrayInputStream surveysToExcel(List<Survey> surveys) {

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SURVEY_SHEET);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < SURVEY_HEADERS.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(SURVEY_HEADERS[col]);
            }

            int rowIdx = 1;
            for (Survey survey : surveys) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(survey.getId());
                row.createCell(1).setCellValue(survey.getTitle());
                row.createCell(2).setCellValue(survey.getMetaTitle());
                row.createCell(3).setCellValue(survey.getSlug());

                row.createCell(4).setCellValue(survey.getSummary());
                row.createCell(5).setCellValue(survey.getDescription());
                row.createCell(6).setCellValue(survey.getSlug());
                row.createCell(7).setCellValue(survey.isPublish());


                row.createCell(8).setCellValue(survey.getAccessibility().toString().replace("Accessibility.",""));
                row.createCell(9).setCellValue(survey.getTotalResponses());
                row.createCell(10).setCellValue(survey.getCreatedAt().toString());
                row.createCell(11).setCellValue(survey.getPublishedAt().toString());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

    public static ByteArrayInputStream individualSurveyResponseToExcel(Survey  surveys, List<FormData> formData) {

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SURVEY_RESPONSE_SHEET);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < SURVEY_RESPONSE_HEADERS.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(SURVEY_RESPONSE_HEADERS[col]);
            }
            //survey questions...
            int rowIdx = 1;


             for (Section section : surveys.getSections()){
                 for(Question question: section.getQuestions()){
                     Row row = sheet.createRow(rowIdx++);
                     row.createCell(0).setCellValue(question.getId());
                     row.createCell(1).setCellValue(question.getTitle());
                     row.createCell(2).setCellValue(question.getType().toString().replace("",""));
                     for(FormData data : formData){
                         if(data.getQuestionNumber() == question.getId()){
                             row.createCell(4).setCellValue(data.getAnswer());
                             break;
                         }
                     }

                 }
             }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }




    public static ByteArrayInputStream summarySurveyResponsesToExcel(Survey  surveys ) {

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SURVEY_RESPONSE_SHEET);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < SURVEY_RESPONSE_HEADERS.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(SURVEY_RESPONSE_HEADERS[col]);
            }
            //survey questions...
            int rowIdx = 1;


            for (Section section : surveys.getSections()){
                for(Question question: section.getQuestions()){
                    Row row = sheet.createRow(rowIdx++);
                    row.createCell(0).setCellValue(question.getId());
                    row.createCell(1).setCellValue(question.getTitle());
                    row.createCell(2).setCellValue(question.getType().toString().replace("",""));
                    row.createCell(3).setCellValue(question.getResponses().size());
                    for(Response data : question.getResponses()){
                        if(data.getQuestionNumber() == question.getId()){
                            row.createCell(4).setCellValue(data.getAnswer());
                            break;
                        }
                    }

                }
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

}
