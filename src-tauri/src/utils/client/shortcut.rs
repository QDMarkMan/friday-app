/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-04 10:30:26].
 ****************************************************************************/
use crate::print_log;
use crate::service::window::toggle_window_display;
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};

pub fn register_global_shortcuts(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let ctrl_space = Shortcut::new(Some(Modifiers::CONTROL), Code::Space);
    app.handle().plugin(
        tauri_plugin_global_shortcut::Builder::new()
            .with_handler(move |_app, shortcut, event| {
                print_log!("Shortcut detected: {:?}", event);
                if shortcut == &ctrl_space && event.state == ShortcutState::Pressed {
                    toggle_window_display();
                }
            })
            .build(),
    )?;
    app.handle().global_shortcut().register(ctrl_space)?;
    Ok(())
}
