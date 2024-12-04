/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 14:13:06].
 ****************************************************************************/

use super::{
    config::{init_globals, init_window},
    shortcut::register_global_shortcuts,
    tray::create_system_tray,
};

pub fn setup(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error + 'static>> {
    init_globals(app);

    init_window(app);

    register_global_shortcuts(app)?;

    let _ = create_system_tray(app)?;

    Ok(())
}
