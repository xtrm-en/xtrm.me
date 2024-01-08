# blog.xtrm.me

welcome to my blog's repo! feel free to take a look at this horrendous mess :3

i swear i'm actually trying to make this nice i spent all night barely putting it together give me a chance guys--!_!!!!

## build
`deno task build`

## serve locally
`deno task serve`

## serve on CF Pages
`curl -fsSL https://deno.land/x/install/install.sh | sh && sed -i "s/develop$/$(git log -1 --format='%h')/" _data.yml && /opt/buildhome/.deno/bin/deno task build`

## license
ARR for now, we'll see if i get bored one day and put a license file in here