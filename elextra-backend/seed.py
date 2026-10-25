from database.connection import SessionLocal
from models.category import Category
from models.product import Product
def seed_database():
    db = SessionLocal()
    
    try:
        categories = [
            Category(
                name="Laptops & Computers", 
                slug="laptops", 
                image_url="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80"
            ),
            Category(
                name="Smartphones & Tablets", 
                slug="smartphones", 
                image_url="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"
            ),
            Category(
                name="Audio & Headphones", 
                slug="audio", 
                image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
            ),
            Category(
                name="Smartwatches & Wearables", 
                slug="wearables", 
                image_url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
            ),
            Category(
                name="Gaming & Consoles", 
                slug="gaming", 
                image_url="https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500&q=80"
            ),
            Category(
                name="Cameras & Photo", 
                slug="cameras", 
                image_url="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"
            )
        ]
        
        db.add_all(categories)
        db.commit()
        
        # Kategoriyalar ID sini olish uchun bazadan yangilab olamiz
        for cat in categories:
            db.refresh(cat)

        print("3. Har bir toifa uchun 5 tadan (jami 30 ta) mahsulot qo'shilmoqda...")
        products = [
            # ---------------- 1. LAPTOPS ----------------
            Product(name="Apple MacBook Pro 14 M3", slug="macbook-pro-14-m3", brand="Apple", sku="LAP-APP-001",
                    description="Professional darajadagi M3 chipli noutbuk.", price=1999.0, discount_price=1899.0,
                    stock_quantity=15, rating=4.9, reviews_count=120, category_id=categories[0].id,
                    main_image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80"),
            Product(name="Dell XPS 15", slug="dell-xps-15", brand="Dell", sku="LAP-DEL-002",
                    description="Cheksiz ekranli kuchli Windows noutbuki.", price=1750.0, discount_price=None,
                    stock_quantity=22, rating=4.7, reviews_count=85, category_id=categories[0].id,
                    main_image="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80"),
            Product(name="Asus ROG Zephyrus G14", slug="asus-rog-g14", brand="Asus", sku="LAP-ASU-003",
                    description="Geymerlar uchun ixcham va quvvatli yechim.", price=1499.0, discount_price=1399.0,
                    stock_quantity=10, rating=4.8, reviews_count=94, category_id=categories[0].id,
                    main_image="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80"),
            Product(name="Lenovo ThinkPad X1 Carbon", slug="lenovo-x1-carbon", brand="Lenovo", sku="LAP-LEN-004",
                    description="Biznes uchun eng mukammal va yengil noutbuk.", price=1600.0, discount_price=None,
                    stock_quantity=30, rating=4.6, reviews_count=67, category_id=categories[0].id,
                    main_image="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80"),
            Product(name="Acer Swift 3", slug="acer-swift-3", brand="Acer", sku="LAP-ACE-005",
                    description="Talabalar uchun hamyonbop va tezkor noutbuk.", price=699.0, discount_price=649.0,
                    stock_quantity=45, rating=4.4, reviews_count=42, category_id=categories[0].id,
                    main_image="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=500&q=80"),

            # ---------------- 2. SMARTPHONES ----------------
            Product(name="Samsung Galaxy S24 Ultra", slug="samsung-s24-ultra", brand="Samsung", sku="PHO-SAM-001",
                    description="AI imkoniyatlariga ega flagman smartfon.", price=1299.0, discount_price=1199.0,
                    stock_quantity=20, rating=4.9, reviews_count=210, category_id=categories[1].id,
                    main_image="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80"),
            Product(name="Apple iPhone 15 Pro Max", slug="iphone-15-pro-max", brand="Apple", sku="PHO-APP-002",
                    description="Titanium korpus va ajoyib kameralar.", price=1199.0, discount_price=None,
                    stock_quantity=18, rating=4.8, reviews_count=350, category_id=categories[1].id,
                    main_image="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80"),
            Product(name="Google Pixel 8 Pro", slug="pixel-8-pro", brand="Google", sku="PHO-GOO-003",
                    description="Androidning sof ko'rinishi va eng zo'r suratlar.", price=999.0, discount_price=899.0,
                    stock_quantity=15, rating=4.7, reviews_count=130, category_id=categories[1].id,
                    main_image="https://images.unsplash.com/photo-1598327105666-5b89351cb315?w=500&q=80"),
            Product(name="OnePlus 12", slug="oneplus-12", brand="OnePlus", sku="PHO-ONE-004",
                    description="Juda tez quvvatlanish va silliq ishlash.", price=799.0, discount_price=749.0,
                    stock_quantity=25, rating=4.6, reviews_count=88, category_id=categories[1].id,
                    main_image="https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=500&q=80"),
            Product(name="Xiaomi 14 Pro", slug="xiaomi-14-pro", brand="Xiaomi", sku="PHO-XIA-005",
                    description="Leica kamerasi va kuchli ishlash quvvati.", price=850.0, discount_price=None,
                    stock_quantity=40, rating=4.5, reviews_count=112, category_id=categories[1].id,
                    main_image="https://images.unsplash.com/photo-1592899677958-20d045d625af?w=500&q=80"),

            # ---------------- 3. AUDIO ----------------
            Product(name="Sony WH-1000XM5", slug="sony-wh-1000xm5", brand="Sony", sku="AUD-SON-001",
                    description="Shovqinni bekor qiluvchi eng zo'r quloqchinlar.", price=398.0, discount_price=348.0,
                    stock_quantity=30, rating=4.8, reviews_count=450, category_id=categories[2].id,
                    main_image="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80"),
            Product(name="Apple AirPods Pro 2", slug="airpods-pro-2", brand="Apple", sku="AUD-APP-002",
                    description="TWS quloqchinlar bozorining yetakchisi.", price=249.0, discount_price=None,
                    stock_quantity=50, rating=4.9, reviews_count=620, category_id=categories[2].id,
                    main_image="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80"),
            Product(name="Bose QuietComfort 45", slug="bose-qc-45", brand="Bose", sku="AUD-BOS-003",
                    description="Uzoq sayohatlar uchun qulay va sifatli ovoz.", price=329.0, discount_price=299.0,
                    stock_quantity=20, rating=4.7, reviews_count=215, category_id=categories[2].id,
                    main_image="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80"),
            Product(name="JBL Flip 6", slug="jbl-flip-6", brand="JBL", sku="AUD-JBL-004",
                    description="Suvga chidamli portativ Bluetooth kalonka.", price=129.0, discount_price=99.0,
                    stock_quantity=60, rating=4.6, reviews_count=340, category_id=categories[2].id,
                    main_image="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"),
            Product(name="Sennheiser Momentum 4", slug="sennheiser-momentum-4", brand="Sennheiser", sku="AUD-SEN-005",
                    description="60 soatlik batareya va musiqiy sifat.", price=349.0, discount_price=None,
                    stock_quantity=15, rating=4.7, reviews_count=89, category_id=categories[2].id,
                    main_image="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80"),

            # ---------------- 4. WEARABLES ----------------
            Product(name="Apple Watch Series 9", slug="apple-watch-9", brand="Apple", sku="WEA-APP-001",
                    description="Sog'liqni nazorat qiluvchi aqlli soat.", price=399.0, discount_price=None,
                    stock_quantity=45, rating=4.8, reviews_count=310, category_id=categories[3].id,
                    main_image="https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80"),
            Product(name="Samsung Galaxy Watch 6", slug="galaxy-watch-6", brand="Samsung", sku="WEA-SAM-002",
                    description="Android foydalanuvchilari uchun klassik dizayn.", price=299.0, discount_price=249.0,
                    stock_quantity=35, rating=4.6, reviews_count=180, category_id=categories[3].id,
                    main_image="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80"),
            Product(name="Garmin Fenix 7X", slug="garmin-fenix-7x", brand="Garmin", sku="WEA-GAR-003",
                    description="Sportchilar uchun quyosh energiyali soat.", price=899.0, discount_price=849.0,
                    stock_quantity=12, rating=4.9, reviews_count=95, category_id=categories[3].id,
                    main_image="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80"),
            Product(name="Fitbit Charge 6", slug="fitbit-charge-6", brand="Fitbit", sku="WEA-FIT-004",
                    description="Kuzatuv va fitnes uchun ixcham bilaguzuk.", price=159.0, discount_price=129.0,
                    stock_quantity=80, rating=4.4, reviews_count=210, category_id=categories[3].id,
                    main_image="https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?w=500&q=80"),
            Product(name="Amazfit GTR 4", slug="amazfit-gtr-4", brand="Amazfit", sku="WEA-AMA-005",
                    description="Batareyasi uzoqqa yetadigan aqlli soat.", price=199.0, discount_price=None,
                    stock_quantity=25, rating=4.5, reviews_count=134, category_id=categories[3].id,
                    main_image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"),

            # ---------------- 5. GAMING ----------------
            Product(name="PlayStation 5 Console", slug="ps5-console", brand="Sony", sku="GAM-SON-001",
                    description="Yangi avlod o'yin konsoli. 4K va 120fps.", price=499.0, discount_price=None,
                    stock_quantity=60, rating=4.9, reviews_count=850, category_id=categories[4].id,
                    main_image="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80"),
            Product(name="Xbox Series X", slug="xbox-series-x", brand="Microsoft", sku="GAM-MIC-002",
                    description="Xboxning eng kuchli versiyasi. GamePass qo'llab-quvvatlashi.", price=499.0, discount_price=449.0,
                    stock_quantity=45, rating=4.8, reviews_count=610, category_id=categories[4].id,
                    main_image="https://images.unsplash.com/photo-1621259182978-fbf93132e53d?w=500&q=80"),
            Product(name="Nintendo Switch OLED", slug="nintendo-switch-oled", brand="Nintendo", sku="GAM-NIN-003",
                    description="Oila va sayohat uchun eng zo'r portativ konsol.", price=349.0, discount_price=None,
                    stock_quantity=55, rating=4.8, reviews_count=520, category_id=categories[4].id,
                    main_image="https://images.unsplash.com/photo-1617396900799-f4c96d933332?w=500&q=80"),
            Product(name="Meta Quest 3", slug="meta-quest-3", brand="Meta", sku="GAM-MET-004",
                    description="Kabelsiz Virtual Reallik (VR) tajribasi.", price=499.0, discount_price=479.0,
                    stock_quantity=20, rating=4.7, reviews_count=180, category_id=categories[4].id,
                    main_image="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&q=80"),
            Product(name="Steam Deck OLED", slug="steam-deck-oled", brand="Valve", sku="GAM-VAL-005",
                    description="Barcha PC o'yinlarini qo'lda o'ynash imkoniyati.", price=549.0, discount_price=None,
                    stock_quantity=15, rating=4.9, reviews_count=290, category_id=categories[4].id,
                    main_image="https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=500&q=80"),

            # ---------------- 6. CAMERAS ----------------
            Product(name="Sony A7 IV Mirrorless", slug="sony-a7-iv", brand="Sony", sku="CAM-SON-001",
                    description="Gibrid surat va video yaratuvchilar uchun ideal kamera.", price=2499.0, discount_price=2399.0,
                    stock_quantity=10, rating=4.9, reviews_count=155, category_id=categories[5].id,
                    main_image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"),
            Product(name="Canon EOS R6 Mark II", slug="canon-r6-mk2", brand="Canon", sku="CAM-CAN-002",
                    description="Tezkor fokus va ajoyib ranglar balansi.", price=2499.0, discount_price=None,
                    stock_quantity=8, rating=4.8, reviews_count=120, category_id=categories[5].id,
                    main_image="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80"),
            Product(name="Nikon Z6 II", slug="nikon-z6-ii", brand="Nikon", sku="CAM-NIK-003",
                    description="Ajoyib ergonomika va past yorug'likda zo'r sifat.", price=1999.0, discount_price=1850.0,
                    stock_quantity=14, rating=4.7, reviews_count=98, category_id=categories[5].id,
                    main_image="https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=500&q=80"),
            Product(name="Fujifilm X-T5", slug="fujifilm-x-t5", brand="Fujifilm", sku="CAM-FUJ-004",
                    description="Retro dizayn va ajoyib plyonka simulyatsiyalari.", price=1699.0, discount_price=None,
                    stock_quantity=18, rating=4.8, reviews_count=145, category_id=categories[5].id,
                    main_image="https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&q=80"),
            Product(name="GoPro HERO 12 Black", slug="gopro-hero-12", brand="GoPro", sku="CAM-GOP-005",
                    description="Sport va sarguzashtlar uchun mustahkam kamera.", price=399.0, discount_price=349.0,
                    stock_quantity=40, rating=4.6, reviews_count=320, category_id=categories[5].id,
                    main_image="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80")
        ]
        
        db.add_all(products)
        db.commit()
        
        print("✅ Baza muvaffaqiyatli tozalandi! 6 ta kategoriya va 30 ta mahsulot saqlandi.")
        
    except Exception as e:
        print(f"❌ Xatolik yuz berdi: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()