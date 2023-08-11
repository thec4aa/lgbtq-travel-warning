#!/bin/bash
# this expects you're using a recent macOS
# mac sed has a different "-i" than GNU/Linux iirc
# and we're using `open` for drag & drop convenience
# pull requests welcome as always :) ty

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
dirname=$(basename "$dir")
echo $dir

sed -i '' 's/^const devMode = true;$/const devMode = false;/' "$dir/content.js"

cd "$dir/.."
zip -q -r "$dirname.zip" "$dirname/"

outfile="$(pwd)/lgbtq-travel-alert.zip"
echo "Package built: $outfile"

open -R "$outfile"
