/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-24 17:43:01].
 ***************************************************************************/

use serde::Serialize;
use std::fmt;

#[derive(Debug, Serialize)]
pub enum AppError {
    Database(String),
    Config(String),
    BadRequest,
    Internal,
}

impl std::error::Error for AppError {}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::Database(msg) => write!(f, "Database error: {}", msg),
            AppError::Config(msg) => write!(f, "Configuration error: {}", msg),
            AppError::Internal => write!(f, "Internal server error"),
            AppError::BadRequest => write!(f, "Bad request"),
        }
    }
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        AppError::Database(err.to_string())
    }
}
