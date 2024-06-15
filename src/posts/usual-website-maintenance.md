---
title: Mid-april update
description: "spoiler: i'm doing some cool stuff :3"
date: 2024-04-09 
tags:
- meta
- personal
- update
---

Heya fuckos it's been {length_of_time}. how yall been doin'?

> **Update of the update** *(wow)*  
> 16/04/2024 - links have been updated :3

## migration time! yippee

I'm currently in the process of migrating most of my [GitHub](https://github.com/xtrm-en) stuff over to [Codeberg](https://codeberg.org/xtrm), the **vastly-superior** alternative *(according to my subjectively correct objective opinion of course)*.

Speaking of migration, I've decided to fully commit to fediverse shinanigans by moving my old and unused [tech.lgbt profile](https://tech.lgbt/@xtrm) over to [blahaj.zone](https://blahaj.zone/@xtrm), finally switching over from [Mastodon](https://mastodon.org) to [MissKey](https://misskey-hub.net) (or, erm, rather [Sharkey](https://joinsharkey.org/), a cool[^1] fork).  Rest In Peace to my old [miruku.cafe account](https://miruku.cafe/@xtrm) to which I've lost my 2fa key lol.

Finally, I'm also trying to setup proper a PGP setup, *and*, a an [ariadne id](https://ariadne.id). You can verify I'm really myself on [Keyoxide](https://keyoxide.org/E10E571571E763E41245024E8B06E1A7DCED2740)

## website changes

You can now come see me somewhere else on the world wide web over on [my links page](/pages/links.vto)!!!

The front-page of the site will get updated soon to have more of a "lightweight global-infos about-me" section feel to it, no clue how I'll pull that.

## changes = breakage

> because of course this happens

This website also keeps coming back to bite me in the ass whenever I least expect it to.

While trying to deploy my cool(tm) changes via the GitHub mirror repo that's hooked into Cloudflare Pages, it shit itself:

[![Screenshot of Cloudflare Pages dashboard showing a failed deployment because of twemoji's CDN being offline](/static/data/posts/usual-website-maintenance/cloudflare-brokey.png)](/static/data/posts/usual-website-maintenance/cloudflare-brokey.png)

now one would look at this issue and go: i'll do my research, then stumble upon [#580](https://github.com/twitter/twemoji/issues/580), and try and change cdns! simple, right?

well as for the steps, I did all of those *(maybe not in the right order but still-)*

my issue doesn't stem from the random breaking moment (as a programmer you're dealing with those on a daily basis, both in mind and in software), but rather this oddity:

[![Screenshot of Cloudflare Pages dashboard telling me that I did, in fact, deploy a month ago (mid march)](/static/data/posts/usual-website-maintenance/cloudflare-not-that-brokey.png)](/static/data/posts/usual-website-maintenance/cloudflare-not-that-brokey.png)

> **bro.**

it worked. a month ago. why.

The GitHub issue says it was down in January?? Does Cloudflare have some sort of cache for popular projects like that? What were they thinking???? Who's lying here?? Who's trying to make me a fool of myself?!

oh well. it works now: yay!!!!

## the end of the hero's journey

thanks for reading you're a very poggers person :3

for real, i'll see you around to when I either do another project writeup, or I finally decide to update the [projects page](/pages/projects.md) (if ever).

:wave: bye

---

## subnotes

[^1]: it's cool because shark hehe
