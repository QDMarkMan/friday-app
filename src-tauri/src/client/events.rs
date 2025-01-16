/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-18 11:23:30].
 ***************************************************************************/
use super::config::APP_HANDLE;
use tauri::Emitter;

pub fn emit_current_selected(value: &String) {
    println!("Emitting current-select event with value: {}", &value);
    let app = APP_HANDLE.get().unwrap();
    app.emit("current-select", value).unwrap();
}
