/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 14:13:06].
 ****************************************************************************/

use log::info;
use macos_accessibility_client;
use tauri::Manager;

use crate::client::config::StringWrapper;

use super::{
    // clipboard::setup_clipboard,
    config::{init_globals, init_window},
    shortcut::register_global_shortcuts,
    tray::create_system_tray,
};

pub fn setup(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error + 'static>> {
    info!("============== Setup App ==============");

    #[cfg(target_os = "macos")]
    {
        app.set_activation_policy(tauri::ActivationPolicy::Accessory);
        let trusted =
            macos_accessibility_client::accessibility::application_is_trusted_with_prompt();
        info!("MacOS Accessibility Trusted: {}", trusted);
    }

    init_globals(app);

    init_window(app);

    let _ = create_system_tray(app)?;

    register_global_shortcuts(app)?;

    // Text
    app.manage(StringWrapper(std::sync::Mutex::new("".to_string())));

    // setup_clipboard(app);

    Ok(())
}
