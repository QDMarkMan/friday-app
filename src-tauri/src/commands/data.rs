/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-24 16:57:10].
 *  @Description All data communication.
 ***************************************************************************/
use crate::{schema::command::CommandSchema, service, utils::error::AppError};

#[tauri::command]
pub async fn get_local_commands_data() -> Result<Vec<CommandSchema>, AppError> {
    let result = service::commands::load_all_commands().await?;
    Ok(result)
}
