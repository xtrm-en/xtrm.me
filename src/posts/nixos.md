---
title: switching to NixOS
description: wait theres a new nixpkgs pr brb
date: '2024-06-14'
draft: true
tags:
  - linux
  - nixos
---
# I hate to admit it, you were right.

I've done it, I switched - against my will - at 2 AM on a Friday when my laptop's Arch install broke for the first time.

I could've just went on with it and debugged it, and I'm sure if I spent like 20 minutes or so looking into it I could've been back up and running.

but no. Instead, let's take months to properly learn and use a spooky distro that all the cool kids named "The new Arch" *(**by the w**- wait no i'm not supposed to say that anymore)*

## Okay, but why?

Honestly, I just wanted to try the new cool thing:tm: and took a deeper dive than I anticipated.

On the surface, the idea of a fully declarative system *sounded* really cool, but that's it.

"A typical setup isn't that painful" I thought, "everything in a single file? that sounds like it's gonna get messy really quick" I assumed.

Many were the questions I had about the true benefits of it. But I didn't care. I jumped in and, honestly? never looked back.

## Taking the pill

So... what even IS [NixOS](https://nixos.org)?

Ahem-

> NixOS is a Linux distribution based on the Nix package manager and build system.
>
> It supports reproducible and declarative system-wide configuration management as well as atomic upgrades and rollbacks, although it can additionally support-
  
*alright you get it*

At it's core, NixOS is simply a Linux-based distro built on-top of the [Nix](https://nix.dev/) programming-language and ecosystem, supported by the [Nixpkgs](https://github.com/NixOS/nixpkgs) project, a repository of well over 100 000 software packages.

With NixOS, your distribution's configuration and administation (setting up services, users, and &mdash; most importantly &mdash; which packages are installed) are all managed within **a singular place** *(not necessairly singular file)*.

That configuration can then be backed-up or shared around, bringing the *reproducible* aspect of NixOS into the spotlight.

After around two months of usage, let's see what I find most useful about it:

### Development usecase

A philosophy of Nix is that libraries aren't meant to be installed directly, only software. Software can depend on it, and it will be downloaded alongside it, but those transitive libraries cannot be used in the global scope of your operating system other than by the program that needs it.

I didn't understand this at first, since- well.. how do I use libraries now???

Introducing Nix shells, or devshells, no clue which one is the right term.
