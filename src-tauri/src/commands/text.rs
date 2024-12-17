/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-11 11:45:40].
 ****************************************************************************/
use log::info;

#[tauri::command]
pub fn get_selection_text() -> String {
    // _state: tauri::State<StringWrapper>
    // FIXME: This is a workaround to get the selected text
    use selection::get_text;
    let text = get_text();
    info!("Get selection text: {}", text);
    if !text.trim().is_empty() {
        // let app_handle = APP.get().unwrap();
        // // Write into State
        // let state: tauri::State<StringWrapper> = app_handle.state();
        // state.0.lock().unwrap().replace_range(.., &text);
        info!("Get selection text: {}", text);
    }
    text
}
