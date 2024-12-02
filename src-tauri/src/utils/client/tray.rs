/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-02 15:23:40].
 ****************************************************************************/
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
};

pub fn create_system_tray(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let quiet = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
    let open = MenuItem::with_id(app, "open", "Open", true, None::<&str>)?;

    let menu = Menu::with_items(app, &[&open, &quiet])?;

    let _tray = TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .on_menu_event(|app, event| match event.id.0.as_str() {
            "open" => println!("Clicked on open"),
            "quit" => app.exit(0),
            id => println!("Unhandled menu item: {:?}", id),
        })
        .build(app)?;

    Ok(())
}
