package driver.managment.api.service.impl;

import driver.managment.api.dto.FileItemDTO;
import driver.managment.api.dto.FolderDTO;
import driver.managment.api.service.interfaces.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {

        private final S3Client s3Client;

        @Value("${storage.bucket}")
        private String bucket;

        @Value("${storage.public-url}")
        private String publicUrl;

        @Override
        public void createFolder(String folderName) {
                String key = folderName.endsWith("/") ? folderName : folderName + "/";
                s3Client.putObject(
                                PutObjectRequest.builder()
                                                .bucket(bucket)
                                                .key(key)
                                                .build(),
                                RequestBody.empty());
        }

        @Override
        public String uploadFile(String folderName, MultipartFile file) throws Exception {

                String key = folderName + "/" + file.getOriginalFilename();

                s3Client.putObject(
                                PutObjectRequest.builder()
                                                .bucket(bucket)
                                                .key(key)
                                                .contentType(file.getContentType())
                                                .build(),
                                RequestBody.fromBytes(file.getBytes()));

                return publicUrl + "/" + bucket + "/" + key;
        }

        @Override
        public List<FolderDTO> listAll() {
                ListObjectsV2Response res = s3Client.listObjectsV2(
                                ListObjectsV2Request.builder()
                                                .bucket(bucket)
                                                .build());
                Map<String, List<S3Object>> grouped = res.contents().stream()
                                .filter(obj -> obj.key().contains("/"))
                                .collect(Collectors.groupingBy(obj -> obj.key().split("/")[0]));
                List<FolderDTO> folders = new ArrayList<>();
                for (Map.Entry<String, List<S3Object>> entry : grouped.entrySet()) {

                        String folderName = entry.getKey();
                        List<S3Object> objects = entry.getValue();

                        List<FileItemDTO> files = objects.stream()
                                        .filter(o -> !o.key().endsWith("/"))
                                        .map(obj -> new FileItemDTO(
                                                        obj.key().replace(folderName + "/", ""),
                                                        publicUrl + "/" + bucket + "/" + obj.key(),
                                                        obj.size(),
                                                        null))
                                        .collect(Collectors.toList());

                        folders.add(new FolderDTO(folderName, files));
                }
                return folders;
        }

        @Override
        public void deleteFolder(String folderName) {
                ListObjectsV2Response res = s3Client.listObjectsV2(
                                ListObjectsV2Request.builder()
                                                .bucket(bucket)
                                                .prefix(folderName + "/")
                                                .build());
                for (S3Object obj : res.contents()) {
                        s3Client.deleteObject(
                                        DeleteObjectRequest.builder()
                                                        .bucket(bucket)
                                                        .key(obj.key())
                                                        .build());
                }
        }
}
