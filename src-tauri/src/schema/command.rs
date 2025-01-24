/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-24 14:11:51].
 ***************************************************************************/
use serde::Serialize;
use time::OffsetDateTime;

#[derive(Debug, Serialize)]
pub struct CommandSchema {
    pub name: Option<String>,
    pub description: Option<String>,
    pub command: String,
    pub sort: Option<i64>,
    pub icon: Option<String>,
    pub is_default: Option<bool>,
    pub model_id: Option<i64>,
    // Common fields
    pub id: i64,
    pub created_at: OffsetDateTime,
    pub updated_at: OffsetDateTime,
    pub deleted_at: Option<OffsetDateTime>,
}
