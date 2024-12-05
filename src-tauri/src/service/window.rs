/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 15:53:47].
 ****************************************************************************/
use super::global::get_main_window;
use crate::print_log;

// pub fn locate_window_by_cursor() {
//     use tauri::PhysicalPosition;
//     let window = get_main_window();

//     if let Ok(cursor_position) = window.cursor_position() {
//         let window_size = window.outer_size().unwrap();

//         let current_monitor = window
//             .available_monitors()
//             .unwrap()
//             .into_iter()
//             .find(|monitor| {
//                 let pos = monitor.position();
//                 let size = monitor.size();
//                 let bounds = (
//                     pos.x as f64,
//                     pos.y as f64,
//                     pos.x as f64 + size.width as f64,
//                     pos.y as f64 + size.height as f64,
//                 );

//                 cursor_position.x >= bounds.0
//                     && cursor_position.x < bounds.2
//                     && cursor_position.y >= bounds.1
//                     && cursor_position.y < bounds.3
//             })
//             .unwrap_or_else(|| window.primary_monitor().unwrap().unwrap());

//         let scale_factor = current_monitor.scale_factor();
//         let monitor_pos = current_monitor.position();
//         let monitor_size = current_monitor.size();

//         // Calculate window position with offset
//         let pos = PhysicalPosition::new(
//             ((cursor_position.x + 10.0) * scale_factor) as i32,
//             ((cursor_position.y + 10.0) * scale_factor) as i32,
//         );

//         // Calculate monitor bounds in physical pixels
//         let monitor_bounds = (
//             (monitor_pos.x as f64 * scale_factor) as i32,
//             (monitor_pos.y as f64 * scale_factor) as i32,
//             (monitor_pos.x as f64 * scale_factor + monitor_size.width as f64 * scale_factor) as i32,
//             (monitor_pos.y as f64 * scale_factor + monitor_size.height as f64 * scale_factor)
//                 as i32,
//         );

//         // Constrain window position within monitor bounds
//         let final_pos = PhysicalPosition::new(
//             pos.x
//                 .max(monitor_bounds.0)
//                 .min(monitor_bounds.2 - window_size.width as i32),
//             pos.y
//                 .max(monitor_bounds.1)
//                 .min(monitor_bounds.3 - window_size.height as i32),
//         );

//         window.set_position(final_pos).unwrap();
//     }
// }

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
