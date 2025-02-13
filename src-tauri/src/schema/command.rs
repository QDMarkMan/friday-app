/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-24 14:11:51].
 ***************************************************************************/
use crate::utils::serialize::{
    serialize_datetime_as_timestamp, serialize_option_datetime_as_timestamp,
};
use serde::{Deserialize, Serialize};
use time::OffsetDateTime;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
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
    pub uuid: String,
    // pub created_at: OffsetDateTime,
    // pub updated_at: OffsetDateTime,
    // pub deleted_at: Option<OffsetDateTime>,
    #[serde(serialize_with = "serialize_datetime_as_timestamp")]
    pub created_at: OffsetDateTime,
    #[serde(serialize_with = "serialize_datetime_as_timestamp")]
    pub updated_at: OffsetDateTime,
    #[serde(serialize_with = "serialize_option_datetime_as_timestamp")]
    pub deleted_at: Option<OffsetDateTime>,
}

#[derive(Debug, Deserialize)]
pub struct CommandRequest {
    pub name: String,
    pub title: String,
    pub description: Option<String>,
    pub command: String,
    pub sort: Option<i32>,
    pub icon: Option<String>,
    #[serde(default)]
    pub is_default: bool,
    pub model_id: Option<i64>,
}
