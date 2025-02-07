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
            uuid,
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

pub async fn create_command(data: CommandSchema) -> Result<(), sqlx::Error> {
    use uuid::Uuid;

    let db = db::connection::APP_POOL
        .get()
        .ok_or_else(|| Error::Configuration("Database pool not initialized".into()))?;
    let uuid = Uuid::new_v4().to_string();

    let _ = sqlx::query!(
        r#"
        INSERT INTO commands (uuid, name, description, command, sort, icon, is_default, model_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        "#,
        uuid,
        data.name,
        data.description,
        data.command,
        data.sort,
        data.icon,
        data.is_default,
        data.model_id
    )
    .execute(db)
    .await?;

    Ok(())
}
