use crate::database::DrizzleState;
use drizzle::sqlite::prelude::*;

use super::super::utils::*;

use jittered_fractional_indexing::{generate_key_between, Options};

pub(super) fn get_new_max_sort_order(drizzle: &DrizzleState) -> Result<String, String> {
    let clipboards = &drizzle.schema.clipboards;

    let max_sort_order: Result<(String,), _> = drizzle
        .db
        .select((clipboards.sort_order,))
        .from(*clipboards)
        .order_by(desc(clipboards.sort_order))
        .get();

    let options = Options {
        jitter_bits: 16,
        ..Options::default()
    };

    match max_sort_order {
        Ok((sort_order,)) => {
            let new_sort_order =
                generate_key_between(Some(&sort_order), None, options).map_err(error_to_string)?;

            Ok(new_sort_order)
        }
        Err(_) => {
            let new_sort_order =
                generate_key_between(None, None, options).map_err(error_to_string)?;

            Ok(new_sort_order)
        }
    }
}
