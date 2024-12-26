/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-26 13:22:49].
 ****************************************************************************/

use crate::service::agent::get_model_response;

#[tauri::command]
pub async fn get_agent_response(value: String) -> String {
    println!("Get agent response: {:?}", value);
    get_model_response(&value)
        .await
        .unwrap_or_else(|_| "".to_string())
}
