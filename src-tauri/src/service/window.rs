/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 15:53:47].
 ****************************************************************************/
use super::global::get_main_window;
use crate::client::config::APP_HANDLE;
use log::info;

use tauri::{LogicalSize, Manager, PhysicalPosition, WebviewWindow};
pub fn toggle_window_display() {
    if get_main_window().is_visible().unwrap() {
        info!("Hiding window");
        get_main_window().hide().unwrap();
    } else {
        display_window(None);
    }
}

pub fn display_window(locate_window: Option<bool>) {
    // locate_window_by_cursor();
    if locate_window == Some(true) {
        position_window_near_cursor();
    } else {
        let window = get_main_window();
        window.center().unwrap();
        window.set_focus().unwrap();
        window.show().unwrap();
    }
}

pub fn position_window_near_cursor() {
    let window = get_main_window();

    if let Ok(cursor_position) = window.cursor_position() {
        // let window_size = window.outer_size().expect("Failed to get window size");

        let current_monitor = window
            .available_monitors()
            .expect("Failed to get available monitors")
            .into_iter()
            .find(|monitor| {
                let pos = monitor.position();
                let size = monitor.size();

                let bounds = (
                    pos.x as f64,
                    pos.y as f64,
                    pos.x as f64 + size.width as f64,
                    pos.y as f64 + size.height as f64,
                );

                cursor_position.x >= bounds.0
                    && cursor_position.x < bounds.2
                    && cursor_position.y >= bounds.1
                    && cursor_position.y < bounds.3
            })
            .unwrap_or_else(|| {
                window
                    .primary_monitor()
                    .expect("Failed to get primary monitor")
                    .expect("Failed to get primary monitor")
            });

        let scale_factor = current_monitor.scale_factor();
        let monitor_pos = current_monitor.position();
        let monitor_size = current_monitor.size();

        // Calculate monitor bounds in physical pixels
        let monitor_bounds = (
            (monitor_pos.x as f64 * scale_factor) as i32,
            (monitor_pos.y as f64 * scale_factor) as i32,
            (monitor_pos.x as f64 * scale_factor + monitor_size.width as f64 * scale_factor) as i32,
            (monitor_pos.y as f64 * scale_factor + monitor_size.height as f64 * scale_factor)
                as i32,
        );

        // Convert cursor position to physical pixels relative to monitor
        let monitor_relative_x = cursor_position.x - monitor_pos.x as f64;
        let monitor_relative_y = cursor_position.y - monitor_pos.y as f64;

        let final_pos = PhysicalPosition::new(
            (monitor_pos.x + (monitor_relative_x + 10.0) as i32)
                .max(monitor_bounds.0)
                .min(monitor_bounds.2 as i32),
            (monitor_pos.y + (monitor_relative_y + 10.0) as i32)
                .max(monitor_bounds.1)
                .min(monitor_bounds.3 as i32),
        );

        window
            .set_position(final_pos)
            .expect("Failed to set window position");
        window.show().unwrap();
        window.set_focus().unwrap();
    }
}

// Crate A webview window by label
fn build_window(label: &str, title: &str, url: Option<&str>) -> (WebviewWindow, bool) {
    let app_handle = APP_HANDLE.get().unwrap();
    let _url = url.unwrap_or("index.html");

    match app_handle.get_webview_window(label) {
        Some(v) => {
            info!("Window existence: {}", label);
            v.set_focus().unwrap();
            (v, true)
        }
        None => {
            info!("Window not existence, Creating new window: {}", label);
            let mut builder = tauri::webview::WebviewWindowBuilder::new(
                app_handle,
                label,
                tauri::WebviewUrl::App(_url.into()),
            )
            .focused(true)
            .title(title)
            .visible(true);

            #[cfg(target_os = "macos")]
            {
                builder = builder
                    .title_bar_style(tauri::TitleBarStyle::Overlay)
                    .hidden_title(true);
            }
            #[cfg(not(target_os = "macos"))]
            {
                builder = builder.transparent(true).decorations(false);
            }
            let window = builder.build().unwrap();
            // if label != "screenshot" {
            //     #[cfg(not(target_os = "linux"))]
            //     set_shadow(&window, true).unwrap_or_default();
            // }
            (window, false)
        }
    }
}

pub fn configure_window(window: &WebviewWindow) {
    #[cfg(any(windows, target_os = "macos"))]
    {
        window.set_decorations(false).unwrap();
        window.set_shadow(true).unwrap();
        window.set_resizable(true).unwrap();
        window.set_visible_on_all_workspaces(false).unwrap();
    }
}

pub fn build_setting_window() {
    let (window, _) = build_window("setting", "Setting", Some("index.html/setting"));
    window.set_size(LogicalSize::new(600, 800)).unwrap();
    configure_window(&window);
    window.center().unwrap();
    window.set_focus().unwrap();
    window.show().unwrap();
}
