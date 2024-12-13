/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 15:53:47].
 ****************************************************************************/
use super::global::get_main_window;
use log::info;
use mouse_position::mouse_position::{Mouse, Position};
use tauri::{Monitor, PhysicalPosition};

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
        get_main_window().show().unwrap();
    }
}

// Get monitor where the mouse is currently located
fn get_current_monitor(x: i32, y: i32) -> Monitor {
    info!("Mouse position: {}, {}", x, y);
    let daemon_window = get_main_window();
    let monitors = daemon_window.available_monitors().unwrap();

    for m in monitors {
        let size = m.size();
        let position = m.position();

        if x >= position.x
            && x <= (position.x + size.width as i32)
            && y >= position.y
            && y <= (position.y + size.height as i32)
        {
            info!("Current Monitor: {:?}", m);
            return m;
        }
    }
    info!("Current Monitor not found, using primary monitor");
    daemon_window.primary_monitor().unwrap().unwrap()
}

fn get_activate_position() -> Position {
    let mouse_position = match Mouse::get_mouse_position() {
        Mouse::Position { x, y } => Position { x, y },
        Mouse::Error => {
            info!("Mouse position not found, using (0, 0) as default");
            Position { x: 0, y: 0 }
        }
    };
    mouse_position
}

pub fn activate_window_by_mouse() {
    let window = get_main_window();
    window.set_focus().unwrap();
    let target_position = get_activate_position();
    // let monitor = get_current_monitor(target_position.x, target_position.y);
    // let position = monitor.position();
    window
        .set_position(PhysicalPosition {
            x: target_position.x,
            y: target_position.y,
        })
        .unwrap();
}

pub fn position_window_near_cursor() {
    let window = get_main_window();

    if let Ok(cursor_position) = window.cursor_position() {
        let window_size = window.outer_size().expect("Failed to get window size");

        // Get current monitor or fallback to primary
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

        // Calculate window position with offset
        let pos = PhysicalPosition::new(
            ((cursor_position.x + 10.0) * scale_factor) as i32,
            ((cursor_position.y + 10.0) * scale_factor) as i32,
        );

        // Calculate monitor bounds in physical pixels
        let monitor_bounds = (
            (monitor_pos.x as f64 * scale_factor) as i32,
            (monitor_pos.y as f64 * scale_factor) as i32,
            (monitor_pos.x as f64 * scale_factor + monitor_size.width as f64 * scale_factor) as i32,
            (monitor_pos.y as f64 * scale_factor + monitor_size.height as f64 * scale_factor)
                as i32,
        );

        // Constrain window position within monitor bounds
        let final_pos = PhysicalPosition::new(
            pos.x
                .max(monitor_bounds.0)
                .min(monitor_bounds.2 - window_size.width as i32),
            pos.y
                .max(monitor_bounds.1)
                .min(monitor_bounds.3 - window_size.height as i32),
        );

        window
            .set_position(final_pos)
            .expect("Failed to set window position");
    }
}
