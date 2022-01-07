package com.qlicue.gumba.excel;

import com.qlicue.gumba.form.model.FormData;
import com.qlicue.gumba.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.util.List;

@AllArgsConstructor
@Controller
@RequestMapping(path = "api/v1/excels")
public class ExcelController {


    private final   ExcelService fileService;

    @GetMapping("/download")
    public ResponseEntity<Resource> getFile() {
        String filename = "surveys.xlsx";
        InputStreamResource file = new InputStreamResource(fileService.downloadAllSurveys());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }

    @PostMapping(path="{surveyId}")
    public ResponseEntity<Resource> addResponse(@PathVariable("surveyId" ) Long surveyId, @RequestBody List<FormData> formData){
        String filename = "survey.xlsx";
        InputStreamResource file = new InputStreamResource(fileService.downloadSurveyResponse(surveyId,formData));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }

}