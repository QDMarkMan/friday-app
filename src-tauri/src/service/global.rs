/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 15:49:03].
 ****************************************************************************/

use tauri::WebviewWindow;

use crate::client::config::MAIN_WINDOW;
use std::sync::MutexGuard;

pub fn get_main_window() -> MutexGuard<'static, WebviewWindow> {
    MAIN_WINDOW
        .get()
        .expect("Failed to get MAIN_WINDOW")
        .lock()
        .expect("Failed to lock MAIN_WINDOW")
}
