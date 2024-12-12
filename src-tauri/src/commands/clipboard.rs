/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-05 11:22:33].
 ****************************************************************************/
use arboard::Clipboard;

use crate::print_log;

#[tauri::command]
pub fn get_clipboard() -> String {
    print_log!("Start get clipboard");
    let mut clipboard = Clipboard::new().unwrap();
    let data = clipboard.get_text().unwrap();
    data
}
