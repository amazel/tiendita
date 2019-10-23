package com.hlezama.tiendita.service;

import com.hlezama.tiendita.domain.Product;
import com.hlezama.tiendita.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;

import static org.apache.http.entity.ContentType.*;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final AWSFileStore awsFileStore;

    public ProductService(ProductRepository productRepository, AWSFileStore awsFileStore) {
        this.productRepository = productRepository;
        this.awsFileStore = awsFileStore;
    }

    public void uploadProductImage(Long id, MultipartFile file) {
        // 1. Check if image is not empty
        isFileEmpty(file);
        // 2. If file is an image
        isImage(file);
        // 3. The user exists in our database
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("No user found"));

        String path = String.format("%s/%s", "tiendita-nice-images", product.getCategory().getCategoryName());
        String name = String.format("%s-%s", product.getId(), product.getProductName());
        try {
            awsFileStore.save(path, name, file.getInputStream());

        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

    }


    private void isImage(MultipartFile file) {
        if (!Arrays.asList(
            IMAGE_JPEG.getMimeType(),
            IMAGE_PNG.getMimeType(),
            IMAGE_GIF.getMimeType()).contains(file.getContentType())) {
            throw new IllegalStateException("File must be an image [" + file.getContentType() + "]");
        }
    }

    private void isFileEmpty(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file [ " + file.getSize() + "]");
        }
    }
}
