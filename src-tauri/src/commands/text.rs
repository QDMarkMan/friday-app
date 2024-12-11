/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-11 11:45:40].
 ****************************************************************************/

use log::info;

use crate::client::config::StringWrapper;

#[tauri::command]
pub fn get_selection_text(state: tauri::State<StringWrapper>) -> String {
    use selection::get_text;
    let value = get_text();
    info!("get_text: {}", value);
    // return state.0.lock().unwrap().to_string();
    return value;
}
