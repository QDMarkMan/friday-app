/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-10 10:59:27].
 ****************************************************************************/
use std::sync::Mutex;

pub struct ClipboardMonitorEnableWrapper(pub Mutex<String>);

pub fn start_clipboard_monitor(app: tauri::AppHandle) {
    tauri::async_runtime::spawn(async move {
        let mut _pre_text = "".to_string();
    });
}

pub fn setup_clipboard(app: &mut tauri::App) {
    // let clipboard_monitor = match get("clipboard_monitor") {
    //     Some(v) => v.as_bool().unwrap(),
    //     None => {
    //         set("clipboard_monitor", false);
    //         false
    //     }
    // };

    // app.manage(ClipboardMonitorEnableWrapper(Mutex::new(
    //     clipboard_monitor.to_string(),
    // )));
    let _handle = app.handle();
    dbg!(_handle);
}
