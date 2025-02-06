/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-11 11:45:40].
 ****************************************************************************/
use crate::client::config::{StringWrapper, APP_HANDLE};
use log::info;
use selection::get_text;
use tauri::Manager;

#[tauri::command]
pub fn get_selection_text() -> String {
    // _state: tauri::State<StringWrapper>
    let text = get_text();
    if !text.trim().is_empty() {
        let app = APP_HANDLE.get().unwrap();
        let state: tauri::State<StringWrapper> = app.state::<StringWrapper>();
        state.0.lock().unwrap().replace_range(.., &text);
        info!("Update state: {}", text);
    }
    text
}
