/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-02-06 14:38:17].
 ***************************************************************************/
use time::OffsetDateTime;

pub fn serialize_datetime_as_timestamp<S>(
    datetime: &OffsetDateTime,
    serializer: S,
) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    serializer.serialize_i128(datetime.unix_timestamp_nanos() / 1_000_000)
}

pub fn serialize_option_datetime_as_timestamp<S>(
    datetime: &Option<OffsetDateTime>,
    serializer: S,
) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    match datetime {
        Some(dt) => serialize_datetime_as_timestamp(dt, serializer),
        None => serializer.serialize_none(),
    }
}
