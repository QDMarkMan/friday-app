/****************************************************************************
 *  @Author [Tongfu.E].
 *  @Email [etongfu@outlook.com].
 *  @Date [2024-12-26 10:40:50].
 *  @Description [The Agent manage service].
 ****************************************************************************/
use reqwest;
use serde_json::json;

pub async fn get_model_response(input: &String) -> Result<String, reqwest::Error> {
    const OPENAI_API_KEY: &str = "";
    const OPENAI_API_URL: &str = "";

    let client = reqwest::Client::new();

    let url = format!("{}/v1/chat/completions", OPENAI_API_URL);

    let response = client
        .post(url)
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", OPENAI_API_KEY))
        .json(&json!({
          "model": "gpt-4o",
          "messages": [
            {
              "role": "system",
              "content": "You are a helpful assistant."
            },
            {
              "role": "user",
              "content": input
            }
          ]
        }))
        .send()
        .await?;
    let response_text = response.text().await?;
    log::info!("Response text: {:?}", response_text);
    let response_json: serde_json::Value = match serde_json::from_str(&response_text) {
        Ok(json) => json,
        Err(e) => {
            println!("Error parsing response: {:?}", e);
            return Ok(String::from("Error parsing response"));
        }
    };
    let content = response_json["choices"][0]["message"]["content"]
        .as_str()
        .unwrap();
    println!("Response: {:?}", response_text);
    Ok(String::from(content))
}
