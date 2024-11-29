/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-11-28 11:38:42].
 *-------------------------------------------------------------------------------------------- */

use tauri::{
    menu::{ Menu, MenuItem },
    tray::TrayIconBuilder,
    Error,
    Manager
};
use tauri_plugin_global_shortcut::GlobalShortcutExt;
use tauri_plugin_global_shortcut::{ Shortcut, Code, Modifiers };

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn setup_tray(app: &tauri::App) -> Result<(), tauri::Error> {
    let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&quit_i])?;

    let _tray = TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .build(app)?
        .on_menu_event(|app, event| match event.id.as_ref() {
            "quit" => {
                app.exit(0);
            }
            _ => {
                println!("menu item {:?} not handled", event.id);
            }
        });
    Ok(())
}

// fn toggle_window_display(app: &tauri::App, show: bool) -> Result<(), tauri::Error> {
//     dbg!(&app);
//     // 获取主窗口的句柄
//     if let Some(window) =  app.get_webview_window("main") {
//         // 根据 `show` 参数决定是显示还是隐藏窗口
//         if show {
//             window.show()?;
//         } else {
//             window.hide()?;
//         }
//     } else {
//         // 如果未找到窗口，返回错误
//         return Err(Error::WindowNotFound);
//     }
//     Ok(())
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(desktop)]
            {   
                // setup_shortcuts(app)?;
                let ctrl_command_f = Shortcut::new(Some(Modifiers::CONTROL | Modifiers::SHIFT), Code::KeyF);
                app.handle().plugin(
                    tauri_plugin_global_shortcut::Builder::new().with_handler(move |_app, shortcut, _| {
                        println!("{:?}", shortcut);
                        if shortcut == &ctrl_command_f {
                            println!("Ctrl + Shift + F Detected!");
                        }
                        // let window = app.get_webview_window("main");
                        // window.show()?;
                    }).build()
                )?;
                app.handle().global_shortcut().register(ctrl_command_f)?;
                
                setup_tray(app)?;
            }
            Ok(())
        })
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
