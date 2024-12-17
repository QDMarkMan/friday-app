/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-28 11:38:42].
 *-------------------------------------------------------------------------------------------- */
mod client;
mod commands;
mod service;

use client::setup;
use commands::{clipboard, text, window};
use log::warn;

#[macro_export]
macro_rules! print_log {
    ($($arg:tt)*) => {
        {
            use chrono::{Local, DateTime};
            let now: DateTime<Local> = Local::now();
            let millis = now.timestamp_subsec_millis();
            println!("Log: {}.{:03}: {}", now.format("%Y-%m-%d %H:%M:%S"), millis, format!($($arg)*));
        }
    };
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // .plugin(tauri_plugin_single_instance::init(|_app, _, cwd| {
        //     warn!("Single instance started with cwd: {}", cwd);
        // }))
        .setup(setup::setup)
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            window::window_display_toggle,
            clipboard::get_clipboard,
            text::get_selection_text
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    // .run(|_app_handle, event| {
    //     // 窗口
    //     if let tauri::RunEvent::ExitRequested { api, .. } = event {
    //         api.prevent_exit();
    //     }
    // });
}
