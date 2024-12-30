/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-04 10:30:26].
 ****************************************************************************/
use crate::{
    client::events::emit_current_selected, commands::text::get_selection_text,
    service::window::display_window,
};
use log::info;
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};

fn handle_active_shortcut() {
    let current_text = get_selection_text();
    emit_current_selected(&current_text);
    let locate_window = Some(!current_text.is_empty());
    display_window(locate_window);
}

pub fn register_global_shortcuts(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let ctrl_space = Shortcut::new(Some(Modifiers::CONTROL), Code::Space);
    app.handle().plugin(
        tauri_plugin_global_shortcut::Builder::new()
            .with_handler(move |_app, shortcut, event| {
                info!("Shortcut ctrl_space Pressed: {:?}", event);
                if shortcut == &ctrl_space && event.state == ShortcutState::Pressed {
                    handle_active_shortcut();
                }
            })
            .build(),
    )?;
    app.handle().global_shortcut().register(ctrl_space)?;
    Ok(())
}
