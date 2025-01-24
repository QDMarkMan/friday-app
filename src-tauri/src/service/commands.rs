/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-24 11:35:26].
 ***************************************************************************/

use sqlx::Error;

use crate::{db, schema::command::CommandSchema};

const TABLE_NAME: &str = "commands";

pub async fn load_all_commands() -> Result<Vec<CommandSchema>, sqlx::Error> {
    let db = db::connection::APP_POOL
        .get()
        .ok_or_else(|| Error::Configuration("Database pool not initialized".into()))?;

    let rows = sqlx::query_as!(
        CommandSchema,
        r#"
        SELECT 
            id,
            name,
            description,
            command,
            sort,
            icon,
            is_default,
            model_id,
            created_at,
            updated_at,
            deleted_at
        FROM commands
        ORDER BY id
        "#
    )
    .fetch_all(db)
    .await?;

    Ok(rows)
}
