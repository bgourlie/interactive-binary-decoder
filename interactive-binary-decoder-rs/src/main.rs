#[macro_use]
extern crate stdweb;

fn main() {
    stdweb::initialize();

    let number = -1323453234_f64;
    let number_bytes: [u8; 8] = unsafe {std::mem::transmute(number)};
    let message = format!("{:?}", number_bytes);
    js! {
        alert( @{message} );
    }

    stdweb::event_loop();
}