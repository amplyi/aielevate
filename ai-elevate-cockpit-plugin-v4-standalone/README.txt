AI Elevate Cockpit Standalone Plugin

Install
1. Plugins > Add New > Upload Plugin
2. Upload ai-elevate-cockpit-wordpress-plugin-v4-standalone.zip
3. Activate the plugin

Open
- After activation, open:
  /ai-elevate-cockpit/

If the route does not work
- Go to Settings > Permalinks
- Click Save Changes once

Why this version
- It bypasses the normal WordPress page wrapper
- It keeps the original cockpit layout much better
- Sticky header, overlays, and widths behave like the original site
- Better than iframe and better than inline shortcode for a dense cockpit UI


v4.1 asset fix:
- injects a base href for the standalone route so all card and modal images resolve correctly.


v4.2 mobile cases fix:
- cleans up Cases section on mobile
- stacks the domain strip above the journey panel
- removes overflow from flowchart on small screens
- improves topbar/button layout on mobile
