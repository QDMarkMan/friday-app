/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 15:54:18].
 ****************************************************************************/
use std::sync::{Arc, Mutex, OnceLock};

use tauri::{LogicalSize, Manager, WebviewWindow};

pub static MAIN_WINDOW_X: i32 = 468;
pub static MAIN_WINDOW_Y: i32 = 400;

pub static APP_HANDLE: OnceLock<tauri::AppHandle> = OnceLock::new();
pub static MAIN_WINDOW: OnceLock<Arc<Mutex<WebviewWindow>>> = OnceLock::new();

pub struct StringWrapper(pub Mutex<String>);

pub fn init_globals(app: &mut tauri::App) {
    APP_HANDLE
        .set(app.handle().clone())
        .unwrap_or_else(|_| panic!("Failed to initialize APP"));
}

pub fn init_window(app: &mut tauri::App) {
    let window = app.get_webview_window("main").unwrap();
    let _ = window.set_size(LogicalSize::new(MAIN_WINDOW_X, MAIN_WINDOW_Y));

    #[cfg(any(windows, target_os = "macos"))]
    {
        let _ = window.set_decorations(true);
        let _ = window.set_shadow(true);
        let _ = window.set_visible_on_all_workspaces(false);
    }

    #[cfg(debug_assertions)]
    {
        window.open_devtools();
    }
    MAIN_WINDOW
        .set(Arc::new(Mutex::new(window)))
        .unwrap_or_else(|_| panic!("Failed to initialize MAIN_WINDOW"));
}
