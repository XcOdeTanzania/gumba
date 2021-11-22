package com.qlicue.gumba.converter;
import java.io.IOException;
import java.util.Map;

import javax.persistence.AttributeConverter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class HashMapConverter implements AttributeConverter<Map<String, Object>, String> {
 
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, Object> dataInfo) {

        String dataInfoJson = null;
        try {
            dataInfoJson = objectMapper.writeValueAsString(dataInfo);
        } catch (final JsonProcessingException e) {
            
        }

        return dataInfoJson;
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String dataInfoJSON) {

        Map<String, Object> dataInfo = null;
        try {
            dataInfo = objectMapper.readValue(dataInfoJSON, Map.class);
        } catch (final IOException e) {

        }

        return dataInfo;
    }

}