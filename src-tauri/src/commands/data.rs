/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-24 16:57:10].
 *  @Description All data communication.
 ***************************************************************************/
use crate::{
    schema::command::{CommandRequest, CommandSchema},
    service,
    utils::{error::AppError, response::Response},
};

#[tauri::command]
pub async fn get_local_commands_data() -> Result<Response<Vec<CommandSchema>>, AppError> {
    let data: Vec<CommandSchema> = service::commands::load_all_commands().await?;
    // println!("CommandSchemas Data: {:?}", data);
    // let json_vec = data
    //     .iter()
    //     .map(|&x| {
    //         CommandSchema {
    //             id: x.id,
    //             name: x.name.clone(),
    //             description: x.description.clone(),
    //             command: x.command.clone(),
    //             sort: x.sort,
    //             icon: x.icon.clone(),
    //             is_default: x.is_default,
    //             model_id: x.model_id,
    //             created_at: x.created_at,
    //             updated_at: x.updated_at,
    //             deleted_at: x.deleted_at,
    //         }
    //     })
    //     .collect();
    let result = Response::success(data);
    Ok(result)
}

#[tauri::command(rename_all = "snake_case")]
pub async fn create_local_command(json: String) -> Result<Response<CommandSchema>, AppError> {
    let command: CommandRequest = serde_json::from_str(&json).unwrap();
    let uuid = service::commands::create_local_command(command).await?;
    let data = service::commands::get_local_command_by_id(&uuid).await?;
    let result = Response::success(data);
    Ok(result)
}

#[tauri::command(rename_all = "snake_case")]
pub async fn get_local_command(uuid: &str) -> Result<Response<CommandSchema>, AppError> {
    let data: CommandSchema = service::commands::get_local_command_by_id(uuid).await?;
    let result = Response::success(data);
    Ok(result)
}

#[tauri::command(rename_all = "snake_case")]
pub async fn update_local_command(uuid: &str, json: String) -> Result<Response<()>, AppError> {
    let command: CommandRequest = serde_json::from_str(&json).unwrap();
    service::commands::update_local_command_by_id(uuid, command).await?;
    let result = Response::success(());
    Ok(result)
}

#[tauri::command(rename_all = "snake_case")]
pub async fn delete_local_command(uuid: &str) -> Result<Response<()>, AppError> {
    service::commands::delete_local_command_by_id(uuid).await?;
    let result = Response::success(());
    Ok(result)
}
