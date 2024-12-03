/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 14:12:08].
 ****************************************************************************/
use crate::service::window::toggle_window_display;

#[tauri::command]
pub fn window_display_toggle() {
    toggle_window_display();
}
