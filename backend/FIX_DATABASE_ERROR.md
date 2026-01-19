# Khắc phục lỗi: "The table `public.User` does not exist"

## Nguyên nhân

Lỗi này xảy ra vì:
1. ❌ **Chưa chạy Prisma migrations** để tạo tables trong database
2. ❌ Database chưa có bảng `User` và `Product`

## Cách khắc phục

### Bước 1: Kiểm tra DATABASE_URL trong .env

Mở file `.env` và đảm bảo `DATABASE_URL` đúng format:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

**Lưu ý:**
- Thay `username` bằng username PostgreSQL của bạn
- Thay `password` bằng password của bạn  
- Thay `localhost:5432` nếu PostgreSQL chạy ở host/port khác
- Thay `database_name` bằng tên database (ví dụ: `launch_platform`)

### Bước 2: Tạo database (nếu chưa có)

Nếu database chưa tồn tại, bạn cần tạo nó trước:

```bash
# Kết nối PostgreSQL
psql -U postgres

# Tạo database
CREATE DATABASE launch_platform;

# Thoát
\q
```

### Bước 3: Generate Prisma Client (nếu chưa)

```bash
cd backend
npm run prisma:generate
```

### Bước 4: Tạo và chạy migrations

Đây là bước quan trọng nhất - tạo tables trong database:

**Cách 1: Dùng `prisma db push` (Khuyến nghị - nhanh và đơn giản)**

```bash
cd backend
npx prisma db push
```

Lệnh này sẽ:
- Tạo tables trong database dựa trên schema
- Không cần shadow database (tránh lỗi permission)
- Tự động generate Prisma Client

**Cách 2: Dùng `prisma migrate dev` (Cho production)**

```bash
cd backend
npm run prisma:migrate
```

Hoặc:

```bash
cd backend
npx prisma migrate dev --name init
```

Lệnh này sẽ:
- Tạo thư mục `prisma/migrations/`
- Tạo migration file dựa trên schema
- Áp dụng migration vào database (tạo tables)
- Tự động generate Prisma Client
- ⚠️ **Lưu ý:** Cần quyền CREATE DATABASE cho shadow database

### Bước 5: Kiểm tra lại

Sau khi chạy migrations thành công, bạn sẽ thấy:
- Thư mục `prisma/migrations/` được tạo
- Tables `User` và `Product` đã được tạo trong database
- Server có thể chạy mà không còn lỗi

Kiểm tra database:
```bash
npx prisma studio
```

Hoặc kiểm tra qua PostgreSQL:
```bash
psql -U postgres -d launch_platform
\dt  # Liệt kê tất cả tables
```

## Lệnh đầy đủ (nếu chưa setup)

Nếu đây là lần đầu setup, chạy các lệnh sau:

```bash
cd backend

# 1. Cài dependencies (nếu chưa)
npm install

# 2. Generate Prisma Client
npm run prisma:generate

# 3. Tạo và chạy migrations (chọn 1 trong 2 cách)
# Cách 1: Dùng db push (khuyến nghị - không cần shadow database)
npx prisma db push

# Cách 2: Dùng migrate dev (cần quyền CREATE DATABASE)
npm run prisma:migrate

# 4. Khởi động server
npm run start:dev
```

## Troubleshooting

### Lỗi: "Can't reach database server"

- Kiểm tra PostgreSQL đang chạy chưa
- Kiểm tra `DATABASE_URL` trong `.env` đúng chưa
- Kiểm tra firewall/network

### Lỗi: "Database does not exist"

- Tạo database trước (xem Bước 2)

### Lỗi: "Permission denied"

- Kiểm tra username/password trong `DATABASE_URL`
- Đảm bảo user có quyền tạo tables

### Lỗi: "Prisma Migrate could not create the shadow database"

Nếu gặp lỗi này khi chạy `prisma migrate dev`, bạn có 2 cách:

**Cách 1: Dùng `prisma db push` thay vì `migrate dev`** (Khuyến nghị)
```bash
npx prisma db push
```

**Cách 2: Cấp quyền CREATE DATABASE cho user**
```sql
-- Kết nối PostgreSQL với user có quyền admin
psql -U postgres

-- Cấp quyền
ALTER USER launch_user CREATEDB;

-- Hoặc tạo database shadow manually
CREATE DATABASE launch_platform_shadow;
GRANT ALL PRIVILEGES ON DATABASE launch_platform_shadow TO launch_user;
```

### Reset database (nếu cần)

```bash
# Xóa tất cả migrations và reset database
npx prisma migrate reset

# Sau đó chạy lại migrations
npm run prisma:migrate
```

## Kết quả mong đợi

Sau khi chạy migrations thành công:

```
✔ Generated Prisma Client
✔ Applied migration `YYYYMMDDHHMMSS_init` to the database.

Your database is now in sync with your schema.
```

Và trong database sẽ có 2 tables:
- `User` - Bảng người dùng
- `Product` - Bảng sản phẩm
