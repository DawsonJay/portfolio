# Dev log

### 05/04/2025

- Started setting up the project. I've used vite as a base because its so much faster and typescript because
  I'm used to it and it's widely used. I setup sass too just because I enjoy using it so much.
- For the theme I picked up a few palettes on pinterest, all with 4 colours. There's so vivid accent colour
  but I'm hoping I can do without. I really like these muted palettes and it would be great to just be able to
  use them directly.
- I suppose the next step is to think about how I want to lay out the project. I know it's a portfolio,
  but I need to think of how I'm going to represent projects and how to reflect that in the app.

### 06/04/2025

- Okay, well I thought about the layout and for now all I need is a good blank home page and a sidebar. I need
  options for projects, about me and contact, maybe work history too. The menu needs to be able to have sub menus and
  to be responsive on smaller screens. I want to create a mixin to use textures on certain backgrounds.
- Worked on creating a gradiant background effect for buttons, need to adapt it for icons.
- The menus don't need to be multi-layered. single layer that changes screen makes perfect sense.
- I need to setup the ability to get icons from fontawesome. They're easier to style than mui ones.
- I'm having issues with the textures too where they're placed in front of all the other children.
- Started on the glow effect for icons.

### 07/04/2025

- I think I've resolved the texture problem. Simplifying the mixin to just a brightness filter and a texture, and using
it as absolutely positioned panel separate from everything else. Hopefully I'll just need it on the main page anyway as
a background and everything else can be layered on top with no background.
- Should I find a deep purple or red as a shadow colour? I'd do that for an art project.
- I'm working on the Navbar now, which is probably going to be the most complicated thing on the app. I broke it into
two versions, vertical and compressed for wide screens and mobile respectively. It's easier to make two distinct navbars
than to try and make one that does it all. I want a tray to slid out when you hover an icon to show the full text, so
that's the next thing I need to work out.
- 
