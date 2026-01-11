import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';

const FutureVision = () => {
  return (
    <Article>
      <TitleBlock title="Future Vision" />

      <TextBlock
        text="I plan to expand beyond single ocean diorama to multiple themed dioramas in rectangular arches. I'll support rectangular diorama shapes alongside circles. I'll add entity variety (characters, objects, different animations). I'll integrate dioramas with blog patterns (tags, related articles, reading time). I'll expand content with project deep dives and development stories."
        sectionTitle="Overview"
      />

      <TextBlock
        text="The portfolio is fully functional as an MVP—navigation works, projects are documented, articles render correctly. But I designed the diorama system from the start to support multiple dioramas, not just the single ocean scene currently implemented. The hero page will eventually feature multiple rectangular arches, each containing a different diorama. The current circular ocean diorama establishes the system; future work extends it to rectangular shapes and diverse themes.

The architecture supports this expansion through configuration-driven design. The ocean diorama defines its structure in a config file; new dioramas follow the same pattern with different configurations. Generic DioramaLayer and DioramaEntity components work for any content. Adding a new diorama means creating a config file and importing SVG assets—no new component code required."
        sectionTitle="Multiple Dioramas"
      />

      <TextBlock
        text="The current DioramaFrame component renders circular dioramas with SVG masking for the outer frame. Supporting rectangular shapes requires extending this system to handle different aspect ratios and mask shapes. The rectangular arches on the hero page will frame dioramas just as the current circular frame does, but with rectangular boundaries. The same layered depth system, color spectrum, and clockwork animations apply—only the outer shape changes.

Implementation involves adding shape configuration to diorama definitions: circle (current) or rectangle with specified aspect ratio. The masking system adapts to apply rectangular masks instead of circular ones. The challenge is ensuring all layer SVGs work correctly within rectangular boundaries, particularly for entities that scroll or rotate. Some animations may need adjustment when transitioning from circular to rectangular frames."
        sectionTitle="Rectangular Support"
      />

      <TextBlock
        text="The ocean diorama has three whale entities with scroll animations. Future dioramas will include different entity types: characters with walking or flying animations, objects with rotation or bounce, abstract shapes with morph or fade. Each entity type requires appropriate SVG assets and animation configuration. The entity system already supports configurable animations (rotation, scroll), size, position, and timing—adding new entity types means providing new SVG files and animation parameters.

Different dioramas can have dramatically different feels through entity choice and animation style. A space diorama with orbiting planets emphasizes the rotation animation. A forest diorama with parallax-scrolling trees uses the scroll animation at different speeds. An abstract geometry diorama explores shapes without representational content. The configuration-driven approach makes these variations straightforward once the SVG assets exist."
        sectionTitle="Entity Variety"
      />

      <TextBlock
        text="The article system currently handles project documentation—title blocks, text sections, code examples, demo links. My documented plan includes blog-style features: tags for categorizing content, related articles based on topics, reading time estimates, table of contents (already implemented), and breadcrumbs for navigation depth. These features enable organizing content beyond simple project-article hierarchies.

Tags would categorize articles by topic (React, Hardware, AI, Design Systems) enabling cross-project content discovery. Related articles suggest similar content at article end. Reading time helps users decide what to read. Breadcrumbs show navigation depth (Projects → WhatNow → Article). Implementation requires data structure changes (adding tags to articles, calculating relationships) and UI components (tag displays, related article lists, breadcrumb navigation)."
        sectionTitle="Blog Integration"
      />

      <TextBlock
        text="Current projects have 5-7 articles each covering major topics. Future expansion includes project deep dives (detailed technical explorations of specific components), development stories (documenting the journey and decision-making process), and technical articles (focused explorations of technologies used). Some projects might expand to 10+ articles covering topics in greater depth.

The article-writing process continues evolving—experimenting with different structures, improving code example clarity, refining explanation approaches. Each project's articles build on lessons from previous projects. The challenge is balancing new feature development (new projects, new articles) against infrastructure improvements (better article components, new diorama shapes, blog features). Both directions add value; deciding which to prioritize depends on what's most useful at each stage."
        sectionTitle="Content Expansion"
      />

      <TextBlock
        text="This portfolio demonstrates my current capabilities—full-stack development, component architecture, design systems, hardware integration. As I take on new projects, the portfolio grows to reflect that experience. The goal isn't creating a perfect portfolio upfront, but building infrastructure that evolves with my work. The diorama system, article architecture, and routing patterns provide the foundation. Future projects and content build on that foundation without requiring architectural changes."
        sectionTitle="Continuous Evolution"
      />
    </Article>
  );
};

export default FutureVision;
