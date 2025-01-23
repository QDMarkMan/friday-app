/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 14:13:06].
 ****************************************************************************/

use log::info;
use tauri::Manager;

use super::{
    // clipboard::setup_clipboard,
    config::{init_globals, init_main_window, StringWrapper},
    permissions::setup_permissions,
    shortcut::register_global_shortcuts,
    tray::create_system_tray,
};

pub fn setup(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error + 'static>> {
    info!("============== Setup App ==============");
    setup_permissions(app);
    init_globals(app);
    init_main_window(app);
    let _ = create_system_tray(app)?;
    register_global_shortcuts(app)?;
    // Text
    app.manage(StringWrapper(std::sync::Mutex::new("".to_string())));
    Ok(())
}
