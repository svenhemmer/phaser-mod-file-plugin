# phaser-mod-file-plugin
This plugin should provide a mean to provide amiga mod file support in the amazing (Phaser framework)[https://phaser.io/].

For me this project starts out of curiosity, trying to figure out how to write a plugin for phaser, using the web-audio-api to play music (individual notes), learning something about mod-files (by communicating with an AI, here ChatGPT).

## Creating a Phaser Plugin
I followed this very short but great (description on how to create a phaser plugin)[https://saricden.com/intro-to-developing-phaser-3-plugins]. Unfortunately, there is no description on how to add the typisation. I just added an ```index.d.ts``` file in the root directory and added the corresponding entry into the ```package.json```:

```
  ...
  "main": "index.js",
  "types": "index.d.ts",
  ...
```

## Reading a Mod file
Starting with ChatGPT lead to a lot of falsy information, so I read the file following this (description for the assembly of a mod file)[https://www.ocf.berkeley.edu/~eek/index.html/tiny_examples/ptmod/ap12.html]