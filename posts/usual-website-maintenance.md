---
title: Mid-april update
desc: "spoiler: i'm doing some cool stuff :3"
date: 2024-04-09 
tags:
- meta
- personal
- update
---

Heya fuckos it's been {length_of_time}. how yall been doin'?

## migration time! yippee

I'm currently in the process of migrating most of my [github](https://github.com/xtrm-en) stuff over to [Codeberg](https://codeberg.org/xtrm) the **vastly-superior** alternative (according to my subjectively correct objective opinion of course).

Speaking of migration, I've decided to fully commit to fediverse shinanigans by moving my old and unused [tech.lgbt profile](https://tech.lgbt/@xtrm) over to [blahaj.zone](https://blahaj.zone/@xtrm), finally switching over from [Mastodon](https://mastodon.org) to [MissKey](https://misskey-hub.net) (or, erm, rather [Sharkey](https://joinsharkey.org/), a cool[^1] fork).

Finally, I'm also trying to setup proper a PGP setup, *and*, a an [ariadne](https://ariadne.id) [Keyoxide](https://keyoxide.org) 

## website changes

You can also now come see me somewhere else on the world wide web over on [my links page](../pages/links.vto)

## changes = breakage

This website also keeps coming back to bite me in the ass whenever I least expect it to.

While trying to deploy my cool(tm) changes via the GitHub mirror repo that's hooked into Cloudflare Pages, it shit itself:

[![Screenshot of Cloudflare Pages dashboard showing a failed deployment because of twemoji's CDN being offline](/static/data/posts/usual-website-maintenance/1.png)](/static/data/posts/usual-website-maintenance/1.png)

now one would look at this issue and go: i'll do my research, then stumble upon [#580](https://github.com/twitter/twemoji/issues/580), and try and change cdns! simple, right?

well as for the steps, I did all of those *(maybe not in the right order but still-)*

my issue doesn't stem from the random breaking moment, but rather this:

[![Screenshot of Cloudflare Pages dashboard telling me that I did, in fact, deploy a month ago (mid march)](/static/data/posts/usual-website-maintenance/1.png)](/static/data/posts/usual-website-maintenance/1.png)

> **bro.**

it worked. a month ago. why.

The GitHub issue says it was down in January?? Does Cloudflare have some sort of cache for popular projects like that? What were they thinking???? Who's lying here?? Who's trying to make me a fool of myself?!

oh well it works now yay!!!!

---

## subnotes

[^1]: it's cool because shark hehe
