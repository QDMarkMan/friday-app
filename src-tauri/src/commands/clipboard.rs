/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-05 11:22:33].
 ****************************************************************************/
use arboard::Clipboard;

#[tauri::command]
pub fn get_clipboard() -> String {
    let mut clipboard = Clipboard::new().unwrap();
    let data = clipboard.get_text().unwrap();
    data
}
