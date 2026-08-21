CREATE TABLE users (
    id  SERIAL PRIMARY KEY,
    username    VARCHAR(50) NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,

    role    VARCHAR(20) NOT NULL
        CHECK (role IN ('CUSTOMER', 'ARTISAN', 'ADMIN')),

    is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE artisans (
    id  SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL UNIQUE
        REFERENCES users(id)
        ON DELETE CASCADE,

    display_name    VARCHAR(100) NOT NULL,
    bio TEXT,

    craft_speciality    VARCHAR(100),

    location    VARCHAR(150),
    district    VARCHAR(100),
    state   VARCHAR(100),

    years_of_experience INTEGER
        CHECK (years_of_experience >= 0),

    profile_image   TEXT,

    verification_status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (
            verification_status
            IN ('PENDING', 'VERIFIED', 'REJECTED')
        )
);

CREATE TABLE categories (
    id  SERIAL PRIMARY KEY,

    name    VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE products (
    id  SERIAL PRIMARY KEY,

    artisan_id  INTEGER NOT NULL
        REFERENCES artisans(id)
        ON DELETE RESTRICT,

    category_id INTEGER NOT NULL
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    name    VARCHAR(200) NOT NULL,
    description TEXT,

    price   NUMERIC(10,2) NOT NULL
        CHECK (price >= 0),

    quantity    INTEGER NOT NULL DEFAULT 1
        CHECK (quantity >= 0),

    origin_location VARCHAR(150),
    origin_district VARCHAR(100),
    origin_state    VARCHAR(100),

    status  VARCHAR(20) NOT NULL DEFAULT 'PENDING_REVIEW'
        CHECK (
            status IN (
                'DRAFT',
                'PENDING_REVIEW',
                'APPROVED',
                'REJECTED',
                'SOLD_OUT',
                'ARCHIVED'
            )
        )
);

CREATE TABLE product_images (
    id  SERIAL PRIMARY KEY,

    product_id  INTEGER NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    image_url   TEXT NOT NULL,

    image_type  VARCHAR(20) NOT NULL DEFAULT 'PRODUCT'
        CHECK (
            image_type IN (
                'PRODUCT',
                'PROCESS',
                'ARTISAN',
                'DOCUMENT'
            )
        ),

    display_order   INTEGER NOT NULL DEFAULT 0
        CHECK (display_order >= 0)
);

CREATE TABLE provenance (
    id  SERIAL PRIMARY KEY,

    product_id  INTEGER NOT NULL UNIQUE
        REFERENCES products(id)
        ON DELETE CASCADE,

    origin_description  TEXT,

    origin_location VARCHAR(150),
    origin_region   VARCHAR(150),

    craft_tradition VARCHAR(200),

    artisan_statement   TEXT,

    verification_status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (
            verification_status IN (
                'PENDING',
                'VERIFIED',
                'REJECTED'
            )
        ),

    verified_by INTEGER
        REFERENCES users(id)
        ON DELETE SET NULL
);

CREATE TABLE craft_process (
    id  SERIAL PRIMARY KEY,

    product_id  INTEGER NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    step_number INTEGER NOT NULL
        CHECK (step_number > 0),

    title   VARCHAR(150) NOT NULL,

    description TEXT,

    image_url   TEXT,

    UNIQUE (product_id, step_number)
);

CREATE TABLE orders (
    id  SERIAL PRIMARY KEY,

    customer_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE RESTRICT,

    status  VARCHAR(20) NOT NULL DEFAULT 'PLACED'
        CHECK (
            status IN (
                'PLACED',
                'CONFIRMED',
                'PROCESSING',
                'SHIPPED',
                'DELIVERED',
                'CANCELLED'
            )
        ),

    total_amount    NUMERIC(10,2) NOT NULL DEFAULT 0
        CHECK (total_amount >= 0),

    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id  SERIAL PRIMARY KEY,

    order_id    INTEGER NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

    product_id  INTEGER NOT NULL
        REFERENCES products(id)
        ON DELETE RESTRICT,

    quantity    INTEGER NOT NULL
        CHECK (quantity > 0),

    unit_price  NUMERIC(10,2) NOT NULL
        CHECK (unit_price >= 0),

    UNIQUE (order_id, product_id)
);

CREATE TABLE product_verifications (
    id  SERIAL PRIMARY KEY,

    product_id  INTEGER NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    admin_id    INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE RESTRICT,

    status  VARCHAR(20) NOT NULL
        CHECK (
            status IN (
                'PENDING',
                'VERIFIED',
                'REJECTED',
                'FLAGGED'
            )
        ),

    remarks TEXT
);