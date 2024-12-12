/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-12 11:21:07].
 ****************************************************************************/

use log::{info, warn};

pub fn setup_permissions(app: &mut tauri::App) {
    use macos_accessibility_client;
    #[cfg(target_os = "macos")]
    {
        app.set_activation_policy(tauri::ActivationPolicy::Accessory);
        let trusted =
            macos_accessibility_client::accessibility::application_is_trusted_with_prompt();

        if trusted {
            info!("MacOS Accessibility Trusted: {}", trusted);
        } else {
            warn!("MacOS Accessibility Not Trusted: {}", trusted);
        }
    }
}
