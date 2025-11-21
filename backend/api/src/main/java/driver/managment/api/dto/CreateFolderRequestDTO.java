package driver.managment.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateFolderRequestDTO {
    @NotBlank(message="O nome da pasta é obrigatório")
    private String folderName;
}
