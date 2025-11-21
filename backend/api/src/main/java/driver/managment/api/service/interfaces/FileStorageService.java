package driver.managment.api.service.interfaces;

import java.util.List;
import driver.managment.api.dto.FolderDTO;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    void createFolder(String folderName);

    String uploadFile(String folderName, MultipartFile file) throws Exception;

    List<FolderDTO> listAll();

    void deleteFolder(String folderName);
}
