# xtrm.me

my new website, built on top of [Lume](https://lume.land), a static site generator for [deno](https://deno.land).

## build & serve

Building: `deno task build`

Serve locally: `deno task serve`

## serve on CF Pages

This one's a bit of a mess:
```
curl -fsSL https://deno.land/x/install/install.sh | sh && sed -i "s/develop$/$(git log -1 --format='%h')/" src/_data.yml && /opt/buildhome/.deno/bin/deno task build
```

## license
ARR for now, we'll see if i get bored one day and put a license file in here
