/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-02-06 11:19:24].
 ***************************************************************************/

use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Response<T> {
    code: i32,
    message: String,
    data: Option<T>,
}

impl<T> Response<T> {
    pub fn new(code: i32, message: String, data: Option<T>) -> Self {
        Self {
            code,
            message,
            data,
        }
    }

    pub fn success(data: T) -> Self {
        Self {
            code: 1,
            message: "Success".to_string(),
            data: Some(data),
        }
    }

    pub fn error(message: String) -> Self {
        Self {
            code: 0,
            message,
            data: None,
        }
    }
}
