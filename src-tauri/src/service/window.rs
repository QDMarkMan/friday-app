/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 15:53:47].
 ****************************************************************************/
use super::global::get_main_window;
use crate::print_log;
use mouse_position::mouse_position::{Mouse, Position};
use tauri::{Monitor, PhysicalPosition};

pub fn toggle_window_display() {
    if get_main_window().is_visible().unwrap() {
        print_log!("Hiding window");
        get_main_window().hide().unwrap();
    } else {
        // locate_window_by_cursor();
        print_log!("Showing window");
        get_main_window().show().unwrap();
    }
}

// Get monitor where the mouse is currently located
fn get_current_monitor(x: i32, y: i32) -> Monitor {
    print_log!("Mouse position: {}, {}", x, y);
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
            print_log!("Current Monitor: {:?}", m);
            return m;
        }
    }
    print_log!("Current Monitor not found, using primary monitor");
    daemon_window.primary_monitor().unwrap().unwrap()
}

fn get_activate_position() -> Position {
    let mouse_position = match Mouse::get_mouse_position() {
        Mouse::Position { x, y } => Position { x, y },
        Mouse::Error => {
            print_log!("Mouse position not found, using (0, 0) as default");
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
    window.show().unwrap();
}
