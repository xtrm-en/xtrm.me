---
title: 'push_swap, a 42 project'
description: Because some smartass thought `sort()` was too easy...
date: '2024-01-09'
link: 'https://github.com/27network/push_swap'
tags:
  - C
  - 42-project
  - writeup
  - sorting-algorithms
draft: false
---
## 📖 prelude

This is a project I did for my school [42 Angoulême][42angouleme].

The goal was to parse a list of integers given as program arguments, and then sort them using a limited set of instructions.

This would naturally involve some kind of sorting algorithm, although we would need to make it ourselves, or at least adapt a known one to the rules...  
That may prove to be quite the challenge depending on which algorithm you thought of first :^)

## table of contents

<div id="toc"></div>

## 📏 the rules

The rules are as follows:

- You have two stacks, A and B.
- At the start of the program, A is filled with a random **set** of integers, and B is empty.
  - The set is guaranteed to be unique, meaning no duplicates. The numbers can be negative, positive, or zero, as long as they fit in an `int`.
- You must sort A in ascending order using the following instructions:
  - `sa`: swap the first two elements of A.
  - `sb`: swap the first two elements of B.
  - `pa`: move the first element of B to the beginning of A.
  - `pb`: move the first element of A to the beginning of B.
  - `ra`: rotate A: move A's first element to its end.
  - `rb`: rotate B: move B's first element to its end.
  - `rra`: reverse rotate A: move A's last element to its beginning.
  - `rrb`: reverse rotate B: move B's last element to its beginning.
  - `ss`: `sa` and `sb` at the same time.
  - `rr`: `ra` and `rb` at the same time.
  - `rrr`: `rra` and `rrb` at the same time.
- You must display the instructions used to sort A, with a newline at the end.

## 🔥⬇️🕳️ jumping in! [^1]

so... how do we do this? where do we start?

### 🔨 the struct

Well first we have to implement some sort of structure to hold our stack data; let's define it as `t_stack`:

```c
typedef struct s_stack
{
  int     *values;
  size_t  size;
  size_t  capacity;
} t_stack;
```
##### *reminder that I'm bound to write C according to the [norm], which can prove quite painful sometimes...*

So let's break this down:

- `values` is a pointer to the first element (bottom) of the stack, which is an array of `int`s.
- `size` is the number of elements currently in the stack.
- `capacity` is the maximum number of elements the stack can hold, basically how much we told `malloc` to give us.

The `capacity` of both our stacks (A and B) will always be the same `n`, since to consider all scenarios,
A or B could be filled with `n` values at some point; this will ensure us that we can always store what we need.

### 🖊️ the instructions..?

Now that we have our structure, we need to implement the instructions, maybe by making simple functions?

Let's start with `swap`. Since our implementation defines `values` as an array from which the `0`-th index represents the bottom of the stack, we'll need to get the top two values by accessing `stack->size - 1` and `stack->size - 2` respectively: 

```c
void    swap(t_stack *stack)
{
  int   tmp;

  // if the stack has less than 2 elements, do nothing (as per the subject)
  if (stack->size < 2)
    return ;
  // otherwise, swap the first two elements
  tmp = stack->values[stack->size - 1];
  stack->values[stack->size - 1] = stack->values[stack->size - 2];
  stack->values[stack->size - 2] = tmp;
}
```

Pretty simple. Now we can just call `swap` on a stack whenever we need it... right?

Well, yeah, but one can do better. 

See the thing we forgot is that our `push_swap` program needs to print the instructions used to sort the stack; how do we tackle that?  
We could extend our code in two different ways:
1. We could add a `printf` call each time we call our instruction methods
2. We could let the instruction function (`swap` in that case) call `printf` for us.

The first option is pretty bad, since we'd have a lot of `printf` calls, and would require *not forgetting any*.  
The second option could work, but we'd have to pass which stack we're working on to the instruction function, which is also annoying.

So what do we do now? It's not as if there's a better way right?

### 🖋️ the better way:tm:

We can use function pointers!

*..ahem.*

The first idea is definitely a no-go, but the second one is actually pretty good. Having the instruction execution also print the instruction itself would be pretty nice.

A way of doing that in a clean and extensible way would be to have an array, which would hold pointers to functions that execute the instructions. Sounds lovely doesn't it?

First, let's define an `enum` of all the instructions, so we can use them as indices for our array:

```c
typedef enum e_insn
{
  NONE = 0,
  PA,
  PB,
  SA,
  SB,
  SS,
  RA,
  RB,
  RR,
  RRA,
  RRB,
  RRR,
} t_insn;
```

Then, I'll define a struct `t_insn_info` to hold the instruction name and the function pointer:

```c
typedef struct s_insn_info
{
  t_insn  insn;
  void    (*f)(t_stack *, t_stack *);
}  t_insn_info;
```

Finally, let's define a function that will execute the instruction and print it.

**Note**: Since global variables are **forbidden** for this project, we'll just be a little tricky and use a static variable inside our function to hold the array:

```c
void  ps_insn_exec(t_insn insn, t_stack *a, t_stack *b)
{
  size_t              i;
  // Array of t_insn_info, with the last element being {0, NULL}
  static t_insn_info  insn_info_map[] = {
  {PA, ps_insn_pa}, {PB, ps_insn_pb},
  {SA, ps_insn_sa}, {SB, ps_insn_sb}, {SS, ps_insn_ss},
  {RA, ps_insn_ra}, {RB, ps_insn_rb}, {RR, ps_insn_rr},
  {RRA, ps_insn_rra},  {RRB, ps_insn_rrb},  {RRR, ps_insn_rrr},
  {0, NULL}
  };

  i = 0;
  // Loop through the array until we find the instruction we want
  while (insn_info_map[i].f)
  {
    if (insn_info_map[i].insn == insn)
    {
      // Execute the instruction and print it!
      insn_info_map[i].f(a, b);
      ft_printf("%s\n", ps_get_name(insn));
      return ;
    }
    i++;
  }
}
```

Now we can just call `ps_insn_exec` with the instruction we want to execute, and it'll do it for us!

I find that solution more elegant than the other two, and it's also more flexible, since we can easily add more instructions without having to change a lot.

## ⚠️ special interlude

Not so fast my friend.

We currently have implemented the stack instructions properly (I hope), and we could start the algorithm right now... but. *but*. hear me out:

This project also has a bonus part, which is to recreate the `checker` binary: basically another program that, taking the same arguments as `push_swap`, as well as 
**your** `push_swap` output, will check if your outputted instructions are valid and do indeed sort the list.

I'm not gonna go over the bonus in this post but, if you're not running low on time, I **hightly recommend** that you do it.

This simple exercice will allow you to build up even more your understanding of the project, as well as firmly test the code you just wrote; 
because yes, everything we just did can be &mdash; and should be &mdash; reused for the checker program.

All of this aside, we can finally start writing our sorting algorithm!

## 🚬 we recap

alright. recap time. 

So far we've made:
- a stack system
- multiple operations/instructions
- a extensible instruction execution system
- maybe a `checker` program

What possibly could be left hahaha oh fuc-

## 🔢 the algorithm

In terms of algorithms, a lot could go into the descision-making here:
- how much are you willing to commit to understanding your solution (you should master it completely)
- what floats your neurons best
- your knowledge in sorting algorithms

You've probably already seen your standard insertion / selection sort in CS classes, maybe even went as far as merge / quicksort.

Divide and conquer is always a good sorting strategy, and is sure to give you the best results.  
That being said, is it *really* necessary here?

Let's take another approach.

### 🦋 butterfly sort [^2]

Let us make a living creature, more precisely and intrestingly a **butterfly**. This name is based on the shape that happens halfway through this algorithm's sorting process:
![A half-sorted B stack's visualization](/static/data/posts/push-swap/butterfly-sort-presort-result.png)
> *woah so pretty, see how interested your brain becomes when it sees a funny color-y picture?*

This "V" shape is basically what allows us to keep our instruction count so low, by doing some sort of "pre-sorting" that does the heavy lifting.

### 🔨 the construction

First, we need to aquire this beautiful structure of a stack.

We'll try and find groups of values that fit in "boxes", and let's say we want 10 values per box. For example, let's say `0-9` is the first box, `10-19` the second, etc.

We're gonna iterate sequentially: for each box, we want to lookup its numbers (0, 1, 2, 3, ...) and push them to stack B, but with the following twist: if the number is lower than the mid point of the box's values, push it at the bottom of stack B.

What this means is after pushing to stack B, if the number is lower than the mid point, reverse rotate stack B.

```c
void    ps_butterfly_push_number(size_t n_box, size_t box_size, t_stack *a, t_stack *b)
{
    const size_t  start = n_box * box_size;
    const size_t  end = ft_min((n_box + 1) * box_size, a->size);
    const size_t  mid = ft_ceil((start + end) / 2.);

    while (start < end)
    {
        // First we try and get the current number to the top
        while (a->values[0] != start)
            ps_insn_exec(RRA, a, b);
        // This could of course be optimiezed (your move, youenn)

        // We push our number to stack B
        ps_insn_exec(PB, a, b);
        // We then push it at the bottom of B if it's inferior to the midpoint
        if (start < mid)
            ps_insn_exec(RRB, a, b);

        // Next item
        start++;
    }
}
```

At the end of it, we should have something that resembles this kind of movement:

<video src="/static/data/posts/push-swap/butterfly-sort-presort.mp4" controls></video>

### 📚 putting it all together

Now the only thing missing is getting all those butterfly-ly goodness back into stack A to finalize our sorting.

With the V shape our stack has, we can now apply basic number fetching, starting from the highest to the lowest, and push everything in order. The cool part is that since we have a staircase-like shape, the highest number will be in the highest "step", so pretty close instructions-wise. 

The reason we have this double staircase is so that we have fast access to both sides of the staircase simply by (reverse) rotating the stack.

`TODO: this is still unfinished, 6 months after. damn.`

## 🔖 conclusion

We did it! We made a useless program!! yay us (you)!!!

`TODO: ramble about the project's grading`

---

## 🐈 meta talk

This is my first time writing a writeup, so I'm not sure how it'll turn out, but hopefully someone understands this garbled mess of a brain dump.

I tried to keep this article as close as possible to my thought process when making this project, but I've left out 
some details or changes I made in my code to keep it as concise as possible, while still keeping a good amount of information.

Things left out may include:
- writing instructions to a `t_list` of `char *` instead of printing directly to allow running multiple algorithms and picking the shortest list of instructions
- some finer butterfly sort optimizations
- the [generic optimizer] that's the result of being too lazy to properly optimize one's own algorithm

## 🏷️ footnotes

[^1]: gd reference hehehe
[^2]: `butterfly sort` is the name i gave it because that's how it looks, idk if it's a real sorting algorithm truely used anywhere else

[42angouleme]: https://www.42angouleme.fr/ "42 Angoulême website"
[norm]: https://github.com/42School/norminette/blob/master/pdf/en.norm.pdf "norm pdf"
[generic optimizer]: https://github.com/27network/push_swap/blob/main/src/push_swap/optimizer/ps_optimize.c "generic optimizer source file"
