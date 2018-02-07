#[macro_use]
extern crate stdweb;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate serde_json;

use stdweb::web::document;

#[derive(Clone, Serialize, Deserialize)]
struct HelloProps {
    compiler: String,
    framework: String
}

js_serializable!(HelloProps);

fn main() {
    stdweb::initialize();

    let hello_props = HelloProps {
        compiler: "rust webassembly".to_owned(),
        framework: "react + webassembly".to_owned()
    };

    update(hello_props);
    stdweb::event_loop();
}

fn update(props: HelloProps) {
    let example_div = document().get_element_by_id("example").unwrap();
    js! {
        update( @{props} );
    }
}