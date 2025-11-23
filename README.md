# Driver Management API & Frontend

Um sistema completo para gerenciamento de pastas e arquivos utilizando **Spring Boot**, **S3 (MinIO)** e um **frontend moderno em Next.js com ShadCN UI**.

---

## 🚀 Tecnologias Utilizadas

### **Backend (Java / Spring Boot)**

* Java 17+
* Spring Boot 3+
* Spring Web
* Spring Validation
* AWS SDK v2 (S3)
* Lombok
* MinIO (para armazenamento S3-like)

### **Frontend (Next.js / React)**

* Next.js 14 (App Router)
* React 18
* Axios
* Zustand (para estado global)
* ShadCN/UI (biblioteca de componentes elegante e moderna)
* TailwindCSS
* TypeScript

---

## 📦 Funcionalidades Principais

### **Backend**

✔ Criar pastas no S3
✔ Upload de arquivos
✔ Listagem de pastas e arquivos
✔ Download de uma pasta inteira em ZIP
✔ Download individual de arquivos
✔ Exclusão de pastas e seus arquivos
✔ URLs públicas e privadas via MinIO

### **Frontend**

✔ Listagem de pastas e arquivos em UI moderna
✔ Upload por arrastar e soltar
✔ Navegação animada usando Framer Motion
✔ Modal para download individual de arquivos
✔ Download de pastas inteiras (ZIP)
✔ Tooltip, Dialogs e ícones com ShadCN

---

## 📁 Estrutura do Backend

```
src/main/java/driver/managment/api
├── controllers
│   └── FileStorageController.java
├── dto
│   ├── CreateFolderRequestDTO.java
│   ├── FileItemDTO.java
│   └── FolderDTO.java
├── service
│   ├── interfaces
│   │   └── FileStorageService.java
│   └── impl
│       └── FileStorageServiceImpl.java
└── config
```

---

## 🔧 Configuração do Backend

### **application.properties**

```properties
storage.bucket=driver-files
storage.public-url=http://localhost:9000
spring.servlet.multipart.max-file-size=20MB
spring.servlet.multipart.max-request-size=20MB
```

### **Executar MinIO**

```bash
docker run -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minio \
  -e MINIO_ROOT_PASSWORD=minio123 \
  -v ./data:/data \
  minio/minio server /data --console-address ":9001"
```

---

## 🖥️ Frontend – Estrutura Simplificada

```
src
├── app
│   ├── page.tsx
│   └── layout.tsx
├── components
|---|-- files
|   |    |--add-file.tsx
|   |    |...
│   ├── folders
│   │   ├── folder-item.tsx
│   │   └── folder-content.tsx
│   ├── files
│   │   └── select-file-modal.tsx
│   └── ui (shadcn)
├── lib
│   └── api.ts
└── services
    ├── folder-service.ts
    └── file-service.ts
```

---

## 🔥 Endpoints Principais

### Criar pasta

```
POST /api/storage/folder
{
  "folderName": "seu-arquivo"
}
```

### Upload de arquivo

```
POST /api/storage/upload?folder=arquivo
multipart/form-data
```

### Download de pasta (ZIP)

```
GET /api/storage/download-folder?folder=arquivo
```

### Download de arquivo

```
GET /api/storage/download-file?folder=x&fileName=arquivo
```

### Listar estrutura completa

```
GET /api/storage/list
```

---

## 📥 Instalação – Frontend

```bash
pnpm install
pnpm run dev
```

---



