#!/bin/sh
curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=./deno-v1.39.2 sh -s v1.39.2
rm -f deno.lock
NO_COLOR=1 DENO_VERSION=v1.39.2 \
    ./deno-v1.39.2/bin/deno task lume --allow-all 