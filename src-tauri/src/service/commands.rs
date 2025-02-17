/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-24 11:35:26].
 ***************************************************************************/

use sqlx::Error;

use crate::{
    db,
    schema::command::{CommandRequest, CommandSchema},
};

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

pub async fn create_local_command(data: CommandRequest) -> Result<String, sqlx::Error> {
    use uuid::Uuid;

    let db = db::connection::APP_POOL
        .get()
        .ok_or_else(|| Error::Configuration("Database pool not initialized".into()))?;
    let uuid = Uuid::new_v4().to_string();
    let sort = 0; // default sort is 0

    let _ = sqlx::query!(
        r#"
        INSERT INTO commands (uuid, name, description, command, sort, icon, is_default, model_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        "#,
        uuid,
        data.name,
        data.description,
        data.command,
        sort,
        data.icon,
        data.is_default,
        data.model_id
    )
    .execute(db)
    .await?;

    Ok(uuid)
}

pub async fn get_local_command_by_id(uuid: &str) -> Result<CommandSchema, sqlx::Error> {
    let db = db::connection::APP_POOL
        .get()
        .ok_or_else(|| Error::Configuration("Database pool not initialized".into()))?;

    let row = sqlx::query_as!(
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
        WHERE uuid = ?
        "#,
        uuid
    )
    .fetch_one(db)
    .await?;

    Ok(row)
}

pub async fn update_local_command_by_id(
    uuid: &str,
    data: CommandRequest,
) -> Result<(), sqlx::Error> {
    let db = db::connection::APP_POOL
        .get()
        .ok_or_else(|| Error::Configuration("Database pool not initialized".into()))?;

    let _ = sqlx::query!(
        r#"
        UPDATE commands
        SET name = ?, description = ?, command = ?, icon = ?, is_default = ?, model_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE uuid = ?
        "#,
        data.name,
        data.description,
        data.command,
        data.icon,
        data.is_default,
        data.model_id,
        uuid
    )
    .execute(db)
    .await?;

    Ok(())
}

pub async fn delete_local_command_by_id(uuid: &str) -> Result<(), sqlx::Error> {
    let db = db::connection::APP_POOL
        .get()
        .ok_or_else(|| Error::Configuration("Database pool not initialized".into()))?;

    let _ = sqlx::query!(
        r#"
        DELETE FROM commands
        WHERE uuid = ?
        "#,
        uuid
    )
    .execute(db)
    .await?;

    Ok(())
}
