/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-04 10:30:26].
 ****************************************************************************/
use crate::{commands::text::get_selection_text, service::window::activate_window_by_mouse};
use log::info;
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};

pub fn register_global_shortcuts(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let ctrl_space = Shortcut::new(Some(Modifiers::CONTROL), Code::Space);
    app.handle().plugin(
        tauri_plugin_global_shortcut::Builder::new()
            .with_handler(move |_app, shortcut, event| {
                info!("Shortcut ctrl_space Pressed: {:?}", event);
                if shortcut == &ctrl_space && event.state == ShortcutState::Pressed {
                    info!("get_selection_text ===========>, {}", get_selection_text());
                    activate_window_by_mouse();
                }
            })
            .build(),
    )?;
    app.handle().global_shortcut().register(ctrl_space)?;
    Ok(())
}
