---
title: render tests
desc: this is a test page for the markdown renderer
---

<div id="toc"></div>

# main title

this is pretty cool :3

## subtitle

oooooooo 

### inline code

Nice code: `print("hello world")`
Empty thing: ``

Imagine `a world` where you `can` do whatever y`ou` want.

### test code

```python
print("hello world")
```

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("god i love lume");
    }
}
```

```haskell
putTodo :: (Int, String) -> IO ()
putTodo (n, todo) = putStrLn (show n ++ ": " ++ todo)

prompt :: [String] -> IO ()
prompt todos = do
    putStrLn ""
    putStrLn "Current TODO list:"
    mapM_ putTodo (zip [0..] todos)
    command <- getLine
    interpret command todos

interpret :: String -> [String] -> IO ()
interpret ('+':' ':todo) todos = prompt (todo:todos)
interpret ('-':' ':num ) todos =
    case delete (read num) todos of
        Nothing -> do
            putStrLn "No TODO entry matches the given number"
            prompt todos
        Just todos' -> prompt todos'
interpret  "q"           todos = return ()
interpret  command       todos = do
    putStrLn ("Invalid command: `" ++ command ++ "`")
    prompt todos

delete :: Int -> [a] -> Maybe [a]
delete 0 (_:as) = Just as
delete n (a:as) = do
    as' <- delete (n - 1) as
    return (a:as')
delete _  []    = Nothing

main = do
    putStrLn "Commands:"
    putStrLn "+ <String> - Add a TODO entry"
    putStrLn "- <Int>    - Delete the numbered entry"
    putStrLn "q          - Quit"
    prompt []
```

```cs
using System.Diagnostics;

[STAThread]
public static void Main()
{
  StackTrace stackTrace = new StackTrace();           // get call stack
  StackFrame[] stackFrames = stackTrace.GetFrames();  // get method calls (frames)

  // write call stack method names
  foreach (StackFrame stackFrame in stackFrames)
  {
    Console.WriteLine(stackFrame.GetMethod().Name);   // write method name
  }
}
```

```
writing in unknown language, what will happen?
```

Invalid:
```js
console.log {
    "hello": "world"
}
```

### test list

- a
- b

### test table

| a | b |
|---|---|
| 1 | 2 |
| 3 | 4 |

### test link

[link](https://xtrm.me)

### test quote

> quote

### test blockquote

> cool
> blockquote
> hahahah long as frick see i can write long stuff ooo that looks pretty cool hahahahaha funny lol

### test format

*italic*

_italic_

**bold**

__underline__

~~strikethrough~~

__*italic underlined*__

_**italic bold**_