/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-23 11:06:19].
 ***************************************************************************/
use log;
use sqlx::SqlitePool;
use std::{
    path::{Path, PathBuf},
    sync::OnceLock,
};

const DB_DIR_NAME: &str = ".hits";
const DB_FILE_NAME: &str = "hits.sqlite";
const DEV_DB_FILE_NAME: &str = "hits-dev.sqlite";

pub static APP_POOL: OnceLock<SqlitePool> = OnceLock::new();

fn get_db_dir() -> PathBuf {
    let home = dirs::home_dir().unwrap();
    let db_path = Path::new(&home).join(DB_DIR_NAME);
    log::info!("DB Path: {:?}", db_path);
    db_path
}

fn init_db_file() {
    let db_path = get_db_dir();

    if !db_path.exists() {
        if let Err(e) = std::fs::create_dir_all(&db_path) {
            log::error!("Failed to create db dir: {:?}, error: {}", db_path, e);
        } else {
            log::info!("Create db dir: {:?}", db_path);
        }
    }
    let db_file_name = DEV_DB_FILE_NAME;

    // #[cfg(debug_assertions)]
    // let db_file_name = DEV_DB_FILE_NAME;

    let db_file = db_path.join(db_file_name);

    if !db_file.exists() {
        std::fs::File::create(&db_file).unwrap();
        log::info!("Create db file: {:?}", db_file);
    }
}

fn get_database_url(db_filename: &str) -> String {
    let db_dir = get_db_dir();
    let db_file = db_dir.join(db_filename);
    format!("sqlite://{}?mode=rwc", db_file.to_str().unwrap())
}

pub async fn init_pool() -> Result<(), sqlx::Error> {
    init_db_file();
    let db_url = if cfg!(debug_assertions) {
        get_database_url(DEV_DB_FILE_NAME)
    } else {
        get_database_url(DB_FILE_NAME)
    };

    [cfg!(debug_assertions)];
    {
        log::info!("Database URL: {}", db_url);
    }
    let db = SqlitePool::connect(&db_url)
        .await
        .expect("Failed to connect to database");
    log::info!("Database connected: {:?}", db);
    // Ok(db)
    APP_POOL.set(db).unwrap();
    Ok(())
}
