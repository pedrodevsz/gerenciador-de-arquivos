package driver.managment.api.controllers;

import driver.managment.api.dto.CreateFolderRequestDTO;
import driver.managment.api.service.interfaces.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/storage")
@RequiredArgsConstructor
public class FileStorageController {

    private final FileStorageService fileStorageService;

    @PostMapping("/folder")
    public ResponseEntity<String> createFolder(@RequestBody CreateFolderRequestDTO request) {
        fileStorageService.createFolder(request.getFolderName());
        return ResponseEntity.ok("Folder created: " + request.getFolderName());
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(
            @RequestParam String folder,
            @RequestParam MultipartFile file) throws Exception {
        return ResponseEntity.ok(fileStorageService.uploadFile(folder, file));
    }

    @GetMapping("/list")
    public ResponseEntity<?> list() {
        return ResponseEntity.ok(fileStorageService.listAll());
    }

    @DeleteMapping("/folder/{name}")
    public ResponseEntity<String> delete(@PathVariable String name) {
        fileStorageService.deleteFolder(name);
        return ResponseEntity.ok("Folder deleted: " + name);
    }
}
