# Kế hoạch & Thiết kế Database (MongoDB & Neo4j)

Hệ thống kết hợp MongoDB làm System of Record (lưu trữ toàn bộ thông tin) và Neo4j làm Knowledge Graph (phục vụ đồ thị và phân tích polypharmacy).

## 1. MongoDB (Hệ Cơ Sở Dữ Liệu Chính)

MongoDB sẽ lưu trữ chi tiết các thông tin về thuốc, thành phần, tương tác và người dùng. Dưới đây là các Collection (Bảng) chính:

### 1. `users`
Lưu thông tin người dùng (sinh viên, giảng viên, admin).
- `_id`: ObjectID
- `email`: String (unique)
- `password`: String (hashed - Argon2)
- `role`: String (enum: `STUDENT`, `INSTRUCTOR`, `ADMIN`)
- `name`: String
- `createdAt`, `updatedAt`: Date

### 2. `drugs`
Lưu thông tin chính về các loại thuốc (danh sách khoảng 150-200 thuốc).
- `_id`: ObjectID
- `name`: String (Tên thuốc gốc/Generic name, vd: "Digoxin")
- `vietnameseName`: String
- `pubChemCid`: String
- `drugBankId`: String
- `atcCode`: String
- `description`: String (Mô tả, chỉ định)
- `drugClasses`: Array of ObjectIDs (ref: `drug_classes`)
- `activeIngredients`: Array of ObjectIDs (ref: `active_ingredients`)
- `reviewStatus`: String (enum: `DRAFT`, `APPROVED`)
- `createdAt`, `updatedAt`: Date

### 3. `active_ingredients`
Lưu thông tin các hoạt chất.
- `_id`: ObjectID
- `name`: String
- `description`: String

### 4. `drug_classes`
Lưu thông tin nhóm thuốc (vd: Kháng sinh, Tim mạch...).
- `_id`: ObjectID
- `name`: String
- `atcCode`: String
- `description`: String

### 5. `interactions`
Lưu thông tin tương tác giữa 2 loại thuốc (được duyệt từ ChCh-Miner & chuyên môn).
- `_id`: ObjectID
- `drugA`: ObjectID (ref: `drugs`)
- `drugB`: ObjectID (ref: `drugs`)
- `severity`: String (enum: `MINOR`, `MODERATE`, `MAJOR`)
- `mechanism`: String (Cơ chế tương tác)
- `effect`: String (Ảnh hưởng lâm sàng)
- `educationalExplanation`: String (Giải thích chuyên sâu dùng cho giáo dục)
- `evidenceSources`: Array (Lưu nguồn tham khảo từ `references`)
- `reviewStatus`: String (enum: `DRAFT`, `APPROVED`)
- `createdAt`, `updatedAt`: Date

### 6. `references`
Lưu nguồn chứng cứ Y khoa (RxNav, PubMed, Dược thư...).
- `_id`: ObjectID
- `sourceType`: String (enum: `PUBMED`, `RXNAV`, `GUIDELINE`, `OTHER`)
- `title`: String
- `url`: String
- `year`: Number

### 7. `clinical_cases` (Mở rộng sau)
- Case study lâm sàng để sinh viên thực hành phân tích DDI.

### 8. `learning_progress` & `quizzes` (Mở rộng sau)
- Lịch sử học tập, câu hỏi đánh giá.

---

## 2. Neo4j (Knowledge Graph Layer)

Neo4j không lưu toàn bộ text/description mà chỉ đóng vai trò lưu đồ thị (Node & Relationship) để query tương tác mạng lưới đa thuốc (Polypharmacy). Chỉ đồng bộ những dữ liệu có `reviewStatus = APPROVED` từ MongoDB sang.

### Nodes
- `(d:Drug {id, name, atcCode})`
- `(c:DrugClass {id, name})`
- `(i:ActiveIngredient {id, name})`
- `(e:Enzyme {id, name})` (Tuỳ chọn mở rộng)

### Relationships (Edges)
- `(Drug) -[:BELONGS_TO]-> (DrugClass)`
- `(Drug) -[:HAS_ACTIVE_INGREDIENT]-> (ActiveIngredient)`
- `(Drug) -[:INTERACTS_WITH { severity, mechanism }]-> (Drug)`

**Tác dụng chính của Neo4j:** Khi sinh viên nhập 5 loại thuốc cùng lúc, hệ thống sẽ gọi Neo4j để tìm Subgraph chứa 5 node này và trả về tất cả các path (cạnh `INTERACTS_WITH`) liên kết giữa chúng, giúp vẽ mạng lưới D3.js nhanh chóng.

---

## 3. Quy trình đồng bộ dữ liệu (Sync Strategy)
1. Thêm/Sửa thuốc và tương tác diễn ra trên **MongoDB**.
2. Người duyệt (Reviewer) xem xét và đổi trạng thái thành `APPROVED`.
3. Backend (NestJS) tự động trigger một Event đồng bộ dữ liệu đồ thị sang **Neo4j** (Cập nhật Node và Edge).
4. Phía Frontend truy vấn tra cứu thông tin text bằng MongoDB và truy vấn Graph bằng Neo4j.
