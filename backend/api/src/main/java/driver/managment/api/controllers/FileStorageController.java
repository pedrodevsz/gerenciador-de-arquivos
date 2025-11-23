package driver.managment.api.controllers;

import driver.managment.api.dto.CreateFolderRequestDTO;
import driver.managment.api.service.interfaces.FileStorageService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
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

    @GetMapping("/download-file")
    public ResponseEntity<byte[]> downloadFile(
            @RequestParam String folder,
            @RequestParam String fileName) throws Exception {

        byte[] content = fileStorageService.downloadFile(folder, fileName);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(content);
    }

    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    @GetMapping("/download-folder")
    public ResponseEntity<byte[]> downloadFolder(@RequestParam String folder) throws Exception {
        byte[] zip = fileStorageService.downloadFolderAsZip(folder);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"" + folder + ".zip\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(zip);
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
