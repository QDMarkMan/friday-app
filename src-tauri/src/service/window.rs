/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 15:53:47].
 ****************************************************************************/
use super::global::get_main_window;
use crate::print_log;

pub fn toggle_window_display() {
    if get_main_window().is_visible().unwrap() {
        print_log!("Hiding window");
        get_main_window().hide().unwrap();
    } else {
        print_log!("Showing window");
        get_main_window().show().unwrap();
    }
}
