/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-05 11:22:33].
 ****************************************************************************/
use clipboard::{ClipboardContext, ClipboardProvider};

use crate::print_log;

#[tauri::command]
pub fn get_clipboard() -> String {
    print_log!("Start get clipboard");
    let mut clipboard: ClipboardContext = ClipboardProvider::new().unwrap();
    let data = clipboard.get_contents().unwrap();
    print_log!("data: {}", data);
    data
}
