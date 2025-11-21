package driver.managment.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileItemDTO {

    private String name;
    private String url;
    private Long size;
    private String contentType;
}
