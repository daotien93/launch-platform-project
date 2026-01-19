# Hướng dẫn Test API với Postman

## Base URL
```
http://localhost:3000
```

## 1. Authentication APIs

### 1.1. Đăng ký (Register)
**Endpoint:** `POST /auth/register`  (done)

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 1.2. Đăng nhập (Login)
**Endpoint:** `POST /auth/login`  (Done)

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 2. Products APIs (Protected - Cần JWT Token)

**Lưu ý:** Tất cả các API Products đều yêu cầu JWT token trong header.

**Headers cần thiết:**
```
Content-Type: application/json
Authorization: Bearer <your_access_token>
```

### 2.1. Tạo sản phẩm (Create Product)
**Endpoint:** `POST /products`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <your_access_token>
```

**Body (raw JSON):**
```json
{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with A17 Pro chip",
  "price": 999.99
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with A17 Pro chip",
  "price": 999.99,
  "userId": "user_uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 2.2. Lấy danh sách sản phẩm (Get All Products)
**Endpoint:** `GET /products`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with A17 Pro chip",
    "price": 999.99,
    "userId": "user_uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": "user_uuid",
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
]
```

### 2.3. Lấy chi tiết sản phẩm (Get Product by ID)
**Endpoint:** `GET /products/:id`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Example:** `GET /products/123e4567-e89b-12d3-a456-426614174000`

**Response:**
```json
{
  "id": "uuid",
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with A17 Pro chip",
  "price": 999.99,
  "userId": "user_uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "user": {
    "id": "user_uuid",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### 2.4. Cập nhật sản phẩm (Update Product)
**Endpoint:** `PUT /products/:id`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <your_access_token>
```

**Example:** `PUT /products/123e4567-e89b-12d3-a456-426614174000`

**Body (raw JSON):** (Tất cả các field đều optional)
```json
{
  "name": "iPhone 15 Pro Max",
  "description": "Updated description",
  "price": 1199.99
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "iPhone 15 Pro Max",
  "description": "Updated description",
  "price": 1199.99,
  "userId": "user_uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Lưu ý:** Chỉ có thể update sản phẩm của chính mình.

### 2.5. Xóa sản phẩm (Delete Product)
**Endpoint:** `DELETE /products/:id`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Example:** `DELETE /products/123e4567-e89b-12d3-a456-426614174000`

**Response:**
```json
{
  "id": "uuid",
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with A17 Pro chip",
  "price": 999.99,
  "userId": "user_uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Lưu ý:** Chỉ có thể xóa sản phẩm của chính mình.

---

## 3. Users APIs (Protected - Cần JWT Token)

### 3.1. Lấy thông tin profile (Get Profile)
**Endpoint:** `GET /users/profile`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 3.2. Lấy danh sách users (Get All Users)
**Endpoint:** `GET /users`

**Headers:**
```
Authorization: Bearer <your_access_token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

## 4. Các bước Test trên Postman

### Bước 1: Khởi động Server
```bash
cd backend
npm run start:dev
```

### Bước 2: Đăng ký User mới
1. Tạo request mới: `POST http://localhost:3000/auth/register`
2. Chọn tab **Body** → **raw** → **JSON**
3. Nhập JSON body như ví dụ trên
4. Click **Send**

### Bước 3: Copy Access Token
- Sau khi register/login thành công, copy `access_token` từ response

### Bước 4: Sử dụng Token cho Protected APIs
1. Mở request mới (ví dụ: `POST http://localhost:3000/products`)
2. Chọn tab **Headers**
3. Thêm header:
   - Key: `Authorization`
   - Value: `Bearer <paste_your_access_token_here>`
4. Thêm body (nếu cần) và click **Send**

---

## 5. Postman Collection Variables (Optional)

Để dễ dàng hơn, bạn có thể setup variables trong Postman:

1. Tạo Environment Variables:
   - `base_url`: `http://localhost:3000`
   - `access_token`: (sẽ được set sau khi login)

2. Sau khi login, dùng script này để auto-set token:
```javascript
// Trong Tests tab của Login request
const response = pm.response.json();
if (response.access_token) {
    pm.environment.set("access_token", response.access_token);
}
```

3. Sử dụng trong requests:
   - URL: `{{base_url}}/products`
   - Authorization: `Bearer {{access_token}}`

---

## 6. Error Responses

### 401 Unauthorized (Thiếu hoặc Token không hợp lệ)
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden (Không có quyền)
```json
{
  "statusCode": 403,
  "message": "You can only update your own products"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Product with ID xxx not found"
}
```

### 400 Bad Request (Validation Error)
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

---

## 7. Checklist Test

- [ ] POST /auth/register - Đăng ký thành công
- [ ] POST /auth/login - Đăng nhập thành công
- [ ] POST /products - Tạo sản phẩm (với token)
- [ ] GET /products - Lấy danh sách sản phẩm (với token)
- [ ] GET /products/:id - Lấy chi tiết sản phẩm (với token)
- [ ] PUT /products/:id - Cập nhật sản phẩm của mình (với token)
- [ ] DELETE /products/:id - Xóa sản phẩm của mình (với token)
- [ ] GET /users/profile - Lấy profile (với token)
- [ ] Test 401 khi không có token
- [ ] Test 403 khi update/delete sản phẩm của user khác
