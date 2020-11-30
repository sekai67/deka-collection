extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

use scraper::{Html, Selector};
use serde::Serialize;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[derive(Serialize)]
struct Profile {
    full_name: String,
    screen_name: String,
    bio: String,
}

fn get_text_by_selector(doc: &Html, selector: &str) -> Option<String> {
    Some(
        doc.select(&Selector::parse(selector).unwrap())
            .next()?
            .text()
            .collect::<String>()
            .trim()
            .into(),
    )
}
async fn parse_profile(id: Option<String>) -> Result<Profile, Box<dyn std::error::Error>> {
    let url = format!("https://mobile.twitter.com/{}", id.ok_or("id is null")?);
    let body = reqwest::get(&url).await?.text().await?;
    let doc = Html::parse_document(&body);

    Ok(Profile {
        full_name: get_text_by_selector(&doc, ".profile .fullname")
            .ok_or("cannot find full_name")?,
        screen_name: get_text_by_selector(&doc, ".screen-name").ok_or("cannot find screen_name")?,
        bio: get_text_by_selector(&doc, ".bio").ok_or("cannot find bio")?,
    })
}

#[wasm_bindgen]
pub async fn get_profile(id: JsValue) -> Result<JsValue, JsValue> {
    match parse_profile(id.as_string()).await {
        Ok(p) => Ok(JsValue::from_serde(&p).unwrap()),
        Err(err) => Err(format!("{}", err).into()),
    }
}
