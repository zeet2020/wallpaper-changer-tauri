#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use wallpaper;
use std::error::Error;
use std::fs::File;
use tauri::api::path::cache_dir;
use reqwest::blocking;




fn download_image(url: &str) -> Result<String,Box<dyn std::error::Error>> {
   
   let cdir =  cache_dir().unwrap();
   let file_path = cdir.join("wallpaper_changer_temp_file");
   //println!("{:?}",&file_path);
   let mut file = File::create(&file_path).unwrap();
   reqwest::blocking::get(url)?.copy_to(&mut file).unwrap();
   Ok(file_path.to_str().to_owned().ok_or("no file path")?.into())

}



#[tauri::command]
fn set_wallpaper(url: &str) -> String {
    
    let path = download_image(url).unwrap();
    wallpaper::set_from_path(&path).unwrap();
    format!("wallpaper set {:?}", &path)
}


fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![set_wallpaper])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
