/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-28 11:38:42].
 *-------------------------------------------------------------------------------------------- */
mod client;
mod commands;
mod db;
mod schema;
mod service;
mod utils;

use client::setup;
use commands::{agent, clipboard, data, text, window};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // .plugin(tauri_plugin_single_instance::init(|_app, _, cwd| {
        //     warn!("Single instance started with cwd: {}", cwd);
        // }))
        .setup(setup::setup)
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            window::window_display_toggle,
            window::open_setting_window,
            clipboard::get_clipboard,
            text::get_selection_text,
            agent::get_agent_response,
            data::get_local_commands_data,
            data::create_local_command
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
